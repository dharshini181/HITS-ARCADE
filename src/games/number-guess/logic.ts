export const RANGES:Record<string,{max:number;tries:number;mult:number}>={Easy:{max:50,tries:10,mult:1},Medium:{max:100,tries:8,mult:2},Hard:{max:1000,tries:9,mult:3}};
export type Check={ok:true;n:number}|{ok:false;msg:string};
export function validate(raw:string,max:number,seen:number[]):Check{if(!raw.trim())return{ok:false,msg:'Enter a number first'};if(!/^\d+$/.test(raw.trim()))return{ok:false,msg:'Whole numbers only'};const n=Number(raw);
if(n<1||n>max)return{ok:false,msg:`Pick between 1 and ${max}`};if(seen.includes(n))return{ok:false,msg:'You already tried that'};return{ok:true,n}}
export const judge=(secret:number,g:number)=>g===secret?'correct':g>secret?'high':'low';
export const guessScore=(mult:number,left:number,secsLeftBonus:number)=>mult*(100+40*left)+secsLeftBonus;
