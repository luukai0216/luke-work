import { createEffect } from './effect.js';

export function mount(script,data){
 const selector=script?.getAttribute('data-target');
 let target=selector?document.querySelector(selector):null;
 if(selector&&!target)throw Error('FORM / FX: 找不到展示区域 '+selector);
 if(!target){target=document.createElement('div');target.style.cssText='width:100%;height:480px;';script?.parentNode?.insertBefore(target,script);}
 const host=document.createElement('div');host.setAttribute('aria-label','交互式 3D 效果');
 host.style.cssText='position:relative;display:block;box-sizing:border-box;width:100%;height:100%;min-width:0;overflow:hidden;isolation:isolate;';
 if(target.clientHeight===0)host.style.height='480px';target.append(host);
 let effect;try{effect=createEffect(host,data);}catch(error){host.remove();throw error;}
 const destroy=()=>{observer.disconnect();effect.destroy();host.remove();};
 const observer=new MutationObserver(()=>{if(!host.isConnected)destroy();});observer.observe(document.documentElement,{childList:true,subtree:true});
 // Instance belongs to its script tag; no shared global names or page-wide styles.
 if(script)script.formfx={pause:()=>effect.setPaused(true),play:()=>effect.setPaused(false),destroy};
 return script?.formfx;
}
