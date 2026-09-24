import * as THREE from 'three';
import { createEffect } from './effect.js';
import { createJavaScriptExport, embedSnippet } from './export.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

const defaults={mode:'particles',count:12000,size:2.2,opacity:85,color:'#111111',background:'#ffffff',characters:' .:-=+*#%@',rotate:true,speed:0.3,axis:'y',motion:'none',amplitude:25,interaction:'repel',strength:45,radius:30};
let state={...defaults}, samples=null, paused=false, modelName='扭结环 · 内置模型', loadingToken=0, effect;
const $=id=>document.getElementById(id);
const stage=$('stage');
let toastTimer;
function toast(message){const el=$('toast');el.textContent=message;el.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove('show'),4500);}
function setLoading(message){$('loading').textContent=message;$('loading').hidden=!message;}
function init(){
 try{effect=createEffect(stage,{settings:state,onFrame:({fps,time})=>{$('fps').textContent=fps+' FPS';$('time').textContent=String(Math.floor(time/60)).padStart(2,'0')+':'+String(Math.floor(time%60)).padStart(2,'0');}});}
 catch{setLoading('当前浏览器无法启动 3D 画布，请开启硬件加速后重试。');return;}
 loadDemo('knot');bindUI();sync();setLoading('');
}

// Surface-area weighting avoids denser dots on highly subdivided parts of a model.
function sampleObject(root){
 root.updateMatrixWorld(true);
 const triangles=[],areas=[];let total=0,triangleCount=0;
 const a=new THREE.Vector3(),b=new THREE.Vector3(),c=new THREE.Vector3(),ab=new THREE.Vector3(),ac=new THREE.Vector3(),n=new THREE.Vector3();
 const bounds=new THREE.Box3();
 root.traverse(mesh=>{if(!mesh.isMesh||!mesh.geometry?.attributes.position)return;
  const g=mesh.geometry,index=g.index,vertices=g.attributes.position;
  const count=index?index.count:vertices.count;triangleCount+=Math.floor(count/3);if(triangleCount>2000000)throw Error('模型面数超过 200 万，请先简化模型再导入。');
  for(let i=0;i+2<count;i+=3){
   mesh.getVertexPosition(index?index.getX(i):i,a).applyMatrix4(mesh.matrixWorld);
   mesh.getVertexPosition(index?index.getX(i+1):i+1,b).applyMatrix4(mesh.matrixWorld);
   mesh.getVertexPosition(index?index.getX(i+2):i+2,c).applyMatrix4(mesh.matrixWorld);
   if(![...a,...b,...c].every(Number.isFinite))continue;
   ab.subVectors(b,a);ac.subVectors(c,a);n.crossVectors(ab,ac);const area=n.length()/2;if(area<1e-12)continue;n.normalize();
   triangles.push(a.x,a.y,a.z,b.x,b.y,b.z,c.x,c.y,c.z,n.x,n.y,n.z);total+=area;areas.push(total);bounds.expandByPoint(a);bounds.expandByPoint(b);bounds.expandByPoint(c);
  }
 });
 if(total===0)throw Error('未找到可用的三角形表面，请导出网格模型后重试。');
 const center=bounds.getCenter(new THREE.Vector3()),scale=3/Math.max(...bounds.getSize(new THREE.Vector3()));
 const size=40000,positions=new Float32Array(size*3),normals=new Float32Array(size*3),seeds=new Float32Array(size);
 let seed=51231;const rand=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
 for(let i=0;i<size;i++){
  const target=rand()*total;let lo=0,hi=areas.length-1;while(lo<hi){const mid=(lo+hi)>>1;if(areas[mid]<target)lo=mid+1;else hi=mid;}
  const t=lo*12,r=Math.sqrt(rand()),v=rand(),w0=1-r,w1=r*(1-v),w2=r*v;
  for(let j=0;j<3;j++){positions[i*3+j]=(triangles[t+j]*w0+triangles[t+3+j]*w1+triangles[t+6+j]*w2-center.getComponent(j))*scale;normals[i*3+j]=triangles[t+9+j];}seeds[i]=rand();
 }return{positions,normals,seeds,triangleCount};
}
function installPoints(){effect.setSamples(samples);}
function disposeObject(root){root.traverse(o=>{o.geometry?.dispose();for(const m of(Array.isArray(o.material)?o.material:[o.material])){if(m){for(const v of Object.values(m))if(v?.isTexture)v.dispose();m.dispose();}}});}
function loadDemo(name){
 ++loadingToken;
 const geometry=name==='sphere'?new THREE.SphereGeometry(1,64,48):name==='torus'?new THREE.TorusGeometry(1,.34,48,144):name==='icosahedron'?new THREE.IcosahedronGeometry(1,0):new THREE.TorusKnotGeometry(.92,.29,240,32,2,3);
 const mesh=new THREE.Mesh(geometry,new THREE.MeshBasicMaterial());samples=sampleObject(mesh);disposeObject(mesh);installPoints();modelName=({sphere:'球体',torus:'圆环',icosahedron:'多面体',knot:'扭结环'})[name]+' · 内置模型';updateModelInfo();resetView();setLoading('');
}
function updateModelInfo(){$('model-name').textContent=modelName;$('model-detail').textContent=samples.triangleCount.toLocaleString()+' 个三角面';}
function resetView(){effect.resetView();}

// GLB geometry is retained; materials and image resources are deliberately ignored.
function geometryOnlyGLB(buffer){
 const view=new DataView(buffer);if(view.byteLength<20||view.getUint32(0,true)!==0x46546c67||view.getUint32(4,true)!==2)throw Error('GLB 文件无效，请重新导出 glTF 2.0 二进制格式。');
 const chunks=[];let json;
 for(let offset=12;offset+8<=buffer.byteLength;){const length=view.getUint32(offset,true),type=view.getUint32(offset+4,true);if(offset+8+length>buffer.byteLength)throw Error('GLB 文件不完整。');const data=new Uint8Array(buffer,offset+8,length);if(type===0x4e4f534a)json=JSON.parse(new TextDecoder().decode(data));else chunks.push({type,data});offset+=length+8;}
 if(!json)throw Error('GLB 缺少模型信息。');
 if(json.extensionsRequired?.some(e=>['KHR_draco_mesh_compression','EXT_meshopt_compression'].includes(e)))throw Error('此模型使用了网格压缩。请导出未压缩的 GLB，或转成 OBJ / STL。');
 if(json.buffers?.some(b=>b.uri&&!b.uri.startsWith('data:')))throw Error('请将模型资源打包为单个 GLB 文件。');
 delete json.materials;delete json.images;delete json.textures;delete json.samplers;
 for(const mesh of json.meshes||[])for(const p of mesh.primitives||[])delete p.material;
 json.extensionsRequired=(json.extensionsRequired||[]).filter(x=>!x.includes('material')&&!x.includes('texture'));
 const raw=new TextEncoder().encode(JSON.stringify(json)),padded=new Uint8Array(Math.ceil(raw.length/4)*4);padded.fill(32);padded.set(raw);chunks.unshift({type:0x4e4f534a,data:padded});
 const size=12+chunks.reduce((sum,c)=>sum+8+c.data.length,0),out=new ArrayBuffer(size),v=new DataView(out);v.setUint32(0,0x46546c67,true);v.setUint32(4,2,true);v.setUint32(8,size,true);let off=12;for(const chunk of chunks){v.setUint32(off,chunk.data.length,true);v.setUint32(off+4,chunk.type,true);new Uint8Array(out,off+8,chunk.data.length).set(chunk.data);off+=8+chunk.data.length;}return out;
}
async function importFile(file){
 if(!file)return;const ext=file.name.split('.').pop().toLowerCase();
 if(!['glb','obj','stl'].includes(ext)){toast('请选择 GLB、OBJ 或 STL 文件。');return;}
 if(file.size>50*1024*1024){toast('文件超过 50 MB，请先简化模型后重试。');return;}
 const token=++loadingToken;setLoading('正在读取模型形状…');let root;
 try{
  await new Promise(resolve=>requestAnimationFrame(()=>setTimeout(resolve,0)));
  if(ext==='obj'){root=new OBJLoader().parse(await file.text());}
  else if(ext==='stl'){root=new THREE.Mesh(new STLLoader().parse(await file.arrayBuffer()),new THREE.MeshBasicMaterial());}
  else{const loader=new GLTFLoader();root=(await loader.parseAsync(geometryOnlyGLB(await file.arrayBuffer()),'')).scene;}
  if(token!==loadingToken)return;
  const next=sampleObject(root);samples=next;installPoints();modelName=file.name;updateModelInfo();resetView();toast('模型已导入，当前效果已应用。');
 }catch(error){if(token===loadingToken){console.warn('Model import:',error.message);toast(error.message?.match(/模型|GLB|文件|网格|三角|压缩|资源/)?error.message:'无法读取这个模型，请检查文件或重新导出。');}}
 finally{if(root)disposeObject(root);if(token===loadingToken)setLoading('');$('file').value='';}
}
function sync(){
 effect.update(state);effect.setPaused(paused);
 for(const [key,value]of Object.entries(state)){const el=$(key);if(el){if(el.type==='checkbox')el.checked=value;else el.value=value;}}
 for(const key of ['count','size','opacity','speed','amplitude','strength','radius']){const suffix=key==='size'?' px':key==='speed'?'×':key==='count'?'':'%';$(key+'-value').textContent=(key==='count'?state[key].toLocaleString():state[key])+suffix;}
 for(const key of ['color','background'])$(key+'-value').textContent=state[key].slice(1).toUpperCase();
 document.querySelectorAll('[data-mode]').forEach(el=>{const active=el.dataset.mode===state.mode;el.classList.toggle('active',active);el.setAttribute('aria-pressed',String(active));});
 $('mode-label').textContent=state.mode.toUpperCase();$('ascii-options').hidden=state.mode!=='ascii';$('size-label').textContent=state.mode==='ascii'?'字符大小':'粒子大小';$('point-count').textContent=state.count.toLocaleString()+(state.mode==='ascii'?' 字符':' 点');
 $('play').textContent=paused?'▶':'Ⅱ';$('play').setAttribute('aria-label',paused?'播放动画':'暂停动画');$('play-state').textContent=paused?'已暂停':'正在播放';
 $('speed').disabled=!state.rotate;$('axis').disabled=!state.rotate;
}
function setMode(mode){state.mode=mode;if(mode==='ascii'){state.size=10;state.count=5500;}else{state.size=2.2;state.count=12000;}sync();}
function bindUI(){
 $('upload').onclick=()=>$('file').click();$('file').onchange=e=>importFile(e.target.files[0]);
 $('demo').onchange=e=>loadDemo(e.target.value);
 document.querySelectorAll('[data-mode]').forEach(el=>el.onclick=()=>setMode(el.dataset.mode));
 for(const key of Object.keys(defaults)){const el=$(key);if(!el)continue;el.addEventListener('input',()=>{state[key]=el.type==='checkbox'?el.checked:el.type==='range'?Number(el.value):el.value;sync();});}
 $('reset').onclick=()=>{state={...defaults};sync();toast('效果参数已重置，当前模型已保留。');};
 $('reset-view').onclick=resetView;$('play').onclick=()=>{paused=!paused;sync();};
 stage.addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();paused=!paused;sync();}});
 $('export').onclick=()=>{$('embed-code').value=embedSnippet;$('export-dialog').showModal();};
 $('close-export').onclick=()=>$('export-dialog').close();
 $('download-js').onclick=exportJS;
 $('copy-embed').onclick=async()=>{try{await navigator.clipboard.writeText(embedSnippet);toast('嵌入代码已复制。');}catch{$('embed-code').focus();$('embed-code').select();toast('请复制已选中的嵌入代码。');}};
 $('export-dialog').addEventListener('click',event=>{if(event.target===$('export-dialog')){const r=event.target.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)event.target.close();}});
 let depth=0;
 window.addEventListener('dragenter',e=>{if([...e.dataTransfer.types].includes('Files')){e.preventDefault();depth++;$('drop-overlay').hidden=false;}});
 window.addEventListener('dragleave',()=>{if(--depth<=0){depth=0;$('drop-overlay').hidden=true;}});
 window.addEventListener('dragover',e=>{if([...e.dataTransfer.types].includes('Files'))e.preventDefault();});
 window.addEventListener('drop',e=>{e.preventDefault();depth=0;$('drop-overlay').hidden=true;if(e.dataTransfer.files.length>1)toast('一次导入一个模型，已选择第一个文件。');importFile(e.dataTransfer.files[0]);});
 registerTools();
}
async function exportJS(){
 const button=$('download-js');button.disabled=true;button.textContent='正在打包…';
 try{
  const response=await fetch('./effect-runtime.js');if(!response.ok)throw Error('无法读取导出资源，请重试。');
  const count=Math.min(state.count,samples.seeds.length);
  const round=(array)=>Array.from(array,x=>Number(x.toFixed(6)));
  const data={...effect.snapshot(),settings:{...state},paused:false,positions:round(samples.positions.subarray(0,count*3)),normals:round(samples.normals.subarray(0,count*3)),seeds:round(samples.seeds.subarray(0,count))};
  const script=createJavaScriptExport(await response.text(),data);
  const url=URL.createObjectURL(new Blob([script],{type:'text/javascript;charset=utf-8'})),link=document.createElement('a');link.href=url;link.download='formfx-effect.js';link.click();setTimeout(()=>URL.revokeObjectURL(url),30000);toast('JS 文件已导出，复制下方代码即可嵌入网页。');
 }catch(error){toast(error.message||'导出失败，请重试。');}finally{button.disabled=false;button.textContent='下载 JS 文件';}
}
function registerTools(){
 const context=document.modelContext;if(!context?.registerTool)return;
 const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
 const tools=[{name:'read_effect_settings',title:'读取 3D 特效设置',description:'Read the current model name and visual effect settings without changing them.',inputSchema:{type:'object',properties:{},additionalProperties:false},annotations:{readOnlyHint:true,untrustedContentHint:true},execute:()=>({model:modelName,settings:{...state},paused})},{name:'set_effect_mode',title:'切换粒子与 ASCII',description:'Switch the current model between particle and ASCII effects using the editor controls.',inputSchema:{type:'object',properties:{mode:{type:'string',enum:['particles','ascii']}},required:['mode'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute:input=>{if(!input||!['particles','ascii'].includes(input.mode))throw Error('Invalid effect mode');setMode(input.mode);return{settings:{...state}};}}];
 for(const tool of tools){try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}}
}
init();
