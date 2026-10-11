export const ICONS=['rocket','moon','bolt','star','heart','bell','diamond','crown','ghost','note'];
export const PAIRS:Record<string,number>={Easy:6,Medium:8,Hard:10};
export function shuffle<T>(a:T[],rnd=Math.random){const r=[...a];for(let i=r.length-1;i>0;i--){const j=Math.floor(rnd()*(i+1));[r[i],r[j]]=[r[j],r[i]]}return r}
export const makeDeck=(pairs:number)=>shuffle([...ICONS.slice(0,pairs),...ICONS.slice(0,pairs)]);
export const matchPoints=(streak:number)=>100+25*Math.max(0,streak-1);
export const finalScore=(base:number,pairs:number,secs:number)=>base+Math.max(0,pairs*8-secs)*3;
