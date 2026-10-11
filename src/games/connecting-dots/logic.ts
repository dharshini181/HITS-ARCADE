export const LEVELS=[{name:'Star',n:10},{name:'Heart',n:14},{name:'Flower',n:16}];
export const HINTS:Record<string,number>={Easy:3,Medium:2,Hard:1};
/** Points of a closed picture, in drawing order, inside a 0–100 box. */
export function shape(name:string,n:number):[number,number][]{const out:[number,number][]=[];
for(let i=0;i<n;i++){const a=i/n*2*Math.PI-Math.PI/2,t=i/n*2*Math.PI;
if(name==='Star'){const r=i%2?17:40;out.push([50+r*Math.cos(a),52+r*Math.sin(a)])}
else if(name==='Heart')out.push([50+38*Math.pow(Math.sin(t),3),46-2.4*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))]);
else{const r=30+11*Math.cos(5*a);out.push([50+r*Math.cos(a),50+r*Math.sin(a)])}}return out}
export const dotPoints=(combo:number)=>Math.round(50*(1+Math.min(combo-1,4)*.25));
