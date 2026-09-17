export const vertexShader=`
attribute vec3 surfaceNormal;
attribute float seed;
uniform float uTime,uSize,uDpr,uMotion,uAmplitude,uInteraction,uStrength,uRadius,uHover;
uniform vec2 uPointer;
uniform float uAspect;
varying float vSeed,vDepth,vFacing;
void main(){
 vec3 p=position;
 float a=uAmplitude;
 if(uMotion>0.5&&uMotion<1.5)p*=1.0+sin(uTime*1.8)*a*0.2;
 if(uMotion>1.5&&uMotion<2.5)p+=surfaceNormal*sin(p.y*4.5+p.x*2.0-uTime*2.0)*a*0.22;
 if(uMotion>2.5)p+=vec3(sin(uTime*.65+seed*12.0),cos(uTime*.7+seed*15.0),sin(uTime*.6+seed*10.0))*a*.18;
 vec4 viewPos=modelViewMatrix*vec4(p,1.0);
 vec4 clip=projectionMatrix*viewPos;
 vec2 ndc=clip.xy/clip.w;
 vec2 delta=(ndc-uPointer)*vec2(uAspect,1.0);
 float dist=length(delta);
 float force=pow(1.0-smoothstep(0.0,uRadius,dist),2.0)*uStrength*uHover;
 if(uInteraction>0.5&&uInteraction<2.5){
  vec2 direction=delta/max(dist,.001);
  float signDir=uInteraction<1.5?1.0:-1.0;
  viewPos.xy+=direction*force*.95*signDir;
  viewPos.z+=force*.14;
 }
 gl_Position=projectionMatrix*viewPos;
 gl_PointSize=clamp(uSize*uDpr*(5.2/max(-viewPos.z,1.0)),1.0,64.0);
 vSeed=seed;
 vDepth=clamp((viewPos.z+7.0)/4.0,.0,1.0);
 vFacing=abs(normalize(normalMatrix*surfaceNormal).z);
}`;
export const fragmentShader=`
uniform vec3 uColor;
uniform float uOpacity,uAscii,uChars;
uniform sampler2D uAtlas;
varying float vSeed,vDepth,vFacing;
void main(){
 float coverage;
 if(uAscii>.5){
  float tone=clamp(vFacing*.58+vDepth*.28+vSeed*.14,0.0,.999);
  float character=floor(tone*uChars);
  vec2 uv=vec2((character+gl_PointCoord.x)/uChars,1.0-gl_PointCoord.y);
  coverage=texture2D(uAtlas,uv).a;
 }else{float d=length(gl_PointCoord-.5);coverage=1.0-smoothstep(.31,.5,d);}
 if(coverage<.08)discard;
 float shade=.34+.66*vDepth;
 gl_FragColor=vec4(uColor*shade,uOpacity*coverage);
}`;
