export const embedSnippet=`<div id="formfx-effect" style="width:100%; height:480px;"></div>
<script src="./formfx-effect.js" data-target="#formfx-effect" defer></script>`;

export function createJavaScriptExport(runtime,data){
 const safeJSON=JSON.stringify(data).replace(/</g,'\\u003c').replace(/\u2028/g,'\\u2028').replace(/\u2029/g,'\\u2029');
 return `/* FORM / FX — self-contained 3D effect.\n * Place this file beside your HTML and use:\n * ${embedSnippet.replace(/\n/g,'\n * ')}\n */\n(()=>{\nconst script=document.currentScript;\n${runtime}\nconst data=${safeJSON};\nconst start=()=>{try{FormFXRuntime.mount(script,data);}catch(error){console.error(error);}};\nif(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',start,{once:true});}else{start();}\n})();\n`;
}
