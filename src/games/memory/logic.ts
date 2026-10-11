export const SETTINGS:Record<string,{speed:number;lives:number;goal:number}>={Easy:{speed:700,lives:3,goal:6},Medium:{speed:520,lives:2,goal:8},Hard:{speed:380,lives:1,goal:10}};
export const PADS=[{c:'#FF1493',n:'Pink'},{c:'#FFD700',n:'Gold'},{c:'#FF00FF',n:'Magenta'},{c:'#FF4500',n:'Orange'}];
export const nextStep=(rnd=Math.random)=>Math.floor(rnd()*4);
export const roundPoints=(round:number,streak:number)=>100*round+25*Math.max(0,streak-1);
export const isCorrect=(seq:number[],pos:number,pad:number)=>seq[pos]===pad;
