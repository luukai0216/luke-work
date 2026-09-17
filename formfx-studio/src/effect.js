import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { vertexShader, fragmentShader } from './shaders.js';

// Shared by the editor and the downloadable, self-contained web embed.
export function createEffect(stage, initial) {
 let state={...initial.settings},samples,points,atlas,paused=initial.paused??false,elapsed=initial.time??0,disposed=false,frame;
 const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'high-performance'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,2));renderer.setClearColor(0x000000,0);
 Object.assign(renderer.domElement.style,{display:'block',width:'100%',height:'100%',touchAction:'none'});stage.append(renderer.domElement);
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(42,1,.1,100);
 camera.position.set(0,0,5.8);
 const controls=new OrbitControls(camera,renderer.domElement);controls.enableDamping=true;controls.enablePan=false;controls.minDistance=2.5;controls.maxDistance=12;
 const orientation=new THREE.Group(),tilt=new THREE.Group();orientation.rotation.set(.18,-.3,-.12);scene.add(orientation);orientation.add(tilt);
 const pointer=new THREE.Vector2(9,9),hover={target:0,value:0};
 const material=new THREE.ShaderMaterial({vertexShader,fragmentShader,transparent:true,depthWrite:true,uniforms:{uTime:{value:elapsed},uSize:{value:2.2},uDpr:{value:renderer.getPixelRatio()},uMotion:{value:0},uAmplitude:{value:.25},uInteraction:{value:1},uStrength:{value:.45},uRadius:{value:.3},uHover:{value:0},uPointer:{value:pointer},uAspect:{value:1},uColor:{value:new THREE.Color()},uOpacity:{value:.85},uAscii:{value:0},uChars:{value:1},uAtlas:{value:null}}});
 function makeAtlas(){
  const chars=Array.from(state.characters||' .:-=+*#%@').slice(0,32),canvas=document.createElement('canvas');canvas.width=chars.length*64;canvas.height=64;
  const ctx=canvas.getContext('2d');ctx.font='bold 50px monospace';ctx.fillStyle='#fff';ctx.textAlign='center';ctx.textBaseline='middle';chars.forEach((char,i)=>ctx.fillText(char,i*64+32,34));
  atlas?.dispose();atlas=new THREE.CanvasTexture(canvas);atlas.minFilter=THREE.LinearFilter;atlas.magFilter=THREE.LinearFilter;material.uniforms.uAtlas.value=atlas;material.uniforms.uChars.value=chars.length;
 }
 function update(next){
  const changeChars=state.characters!==next.characters;state={...next};if(changeChars||!atlas)makeAtlas();
  const u=material.uniforms;u.uSize.value=state.size;u.uColor.value.set(state.color);u.uOpacity.value=state.opacity/100;u.uAscii.value=state.mode==='ascii'?1:0;u.uMotion.value=({none:0,breathe:1,wave:2,float:3})[state.motion];u.uAmplitude.value=state.amplitude/100;u.uInteraction.value=({none:0,repel:1,attract:2,follow:3})[state.interaction];u.uStrength.value=state.strength/100;u.uRadius.value=state.radius/100;
  points?.geometry.setDrawRange(0,Math.min(state.count,samples?.seeds.length||0));stage.style.backgroundColor=state.background;
 }
 function setSamples(next){
  samples=next;if(points){tilt.remove(points);points.geometry.dispose();}
  const geo=new THREE.BufferGeometry();geo.setAttribute('position',new THREE.BufferAttribute(new Float32Array(samples.positions),3));geo.setAttribute('surfaceNormal',new THREE.BufferAttribute(new Float32Array(samples.normals),3));geo.setAttribute('seed',new THREE.BufferAttribute(new Float32Array(samples.seeds),1));geo.setDrawRange(0,Math.min(state.count,samples.seeds.length));points=new THREE.Points(geo,material);points.frustumCulled=false;tilt.add(points);
 }
 function resetView(){camera.position.set(0,0,5.8);controls.target.set(0,0,0);controls.update();orientation.rotation.set(.18,-.3,-.12);tilt.rotation.set(0,0,0);}
 function resize(){const w=stage.clientWidth,h=stage.clientHeight;if(!w||!h)return;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();material.uniforms.uAspect.value=w/h;}
 const resizeObserver=new ResizeObserver(resize);resizeObserver.observe(stage);
 const events=new AbortController();const listen=(event,handler)=>stage.addEventListener(event,handler,{signal:events.signal});
 listen('pointermove',e=>{const r=stage.getBoundingClientRect();pointer.set((e.clientX-r.left)/r.width*2-1,-(e.clientY-r.top)/r.height*2+1);hover.target=e.buttons?0:1;});
 listen('pointerleave',()=>hover.target=0);listen('pointerdown',()=>hover.target=0);listen('pointerup',()=>hover.target=1);
 renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);},{signal:events.signal});
 renderer.domElement.addEventListener('webglcontextrestored',()=>{last=performance.now();frame=requestAnimationFrame(animate);},{signal:events.signal});
 if(initial.positions)setSamples(initial);
 if(initial.rotation)orientation.rotation.fromArray(initial.rotation);
 if(initial.camera)camera.position.fromArray(initial.camera);
 controls.update();update(state);resize();
 let last=performance.now(),fpsStart=last,frames=0;
 function animate(now){
  if(disposed)return;frame=requestAnimationFrame(animate);const dt=Math.min((now-last)/1000,.05);last=now;if(document.hidden)return;
  if(!paused){elapsed+=dt;if(state.rotate)orientation.rotation[state.axis]+=dt*state.speed*.6;}
  hover.value=THREE.MathUtils.lerp(hover.value,hover.target,1-Math.exp(-dt*8));const follow=state.interaction==='follow'?hover.value*state.strength/100:0;
  tilt.rotation.x=THREE.MathUtils.lerp(tilt.rotation.x,-pointer.y*.3*follow,1-Math.exp(-dt*5));tilt.rotation.y=THREE.MathUtils.lerp(tilt.rotation.y,pointer.x*.4*follow,1-Math.exp(-dt*5));
  material.uniforms.uTime.value=elapsed;material.uniforms.uHover.value=hover.value;controls.update();renderer.render(scene,camera);frames++;
  if(now-fpsStart>700){initial.onFrame?.({fps:Math.round(frames*1000/(now-fpsStart)),time:elapsed});fpsStart=now;frames=0;}
 }
 frame=requestAnimationFrame(animate);
 return {update,setSamples,resetView,setPaused(value){paused=!!value;},snapshot(){return {rotation:orientation.rotation.toArray(),camera:camera.position.toArray(),time:elapsed,paused};},destroy(){if(disposed)return;disposed=true;cancelAnimationFrame(frame);resizeObserver.disconnect();events.abort();controls.dispose();points?.geometry.dispose();atlas?.dispose();material.dispose();renderer.dispose();renderer.domElement.remove();}};
}
