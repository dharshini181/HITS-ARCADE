export const SEGS=[{l:'50',v:50,c:'#FF00FF'},{l:'10',v:10,c:'#FF69B4'},{l:'100',v:100,c:'#FF1493'},{l:'0',v:0,c:'#31093D'},{l:'25',v:25,c:'#FF00FF'},{l:'200',v:200,c:'#FF4500'},{l:'10',v:10,c:'#FF69B4'},{l:'JACKPOT',v:500,c:'#FFD700'}];
export const SEG_ANGLE=360/SEGS.length;const W=[3,4,2,3,3,1.5,4,.5];
/** Decides the outcome BEFORE animating; the animation then lands on it. */
export function pickIndex(rnd=Math.random){const t=W.reduce((a,b)=>a+b,0);let r=rnd()*t;for(let i=0;i<W.length;i++){r-=W[i];if(r<0)return i}return W.length-1}
/** Segment under the fixed top pointer for a wheel rotated `rot` degrees clockwise. */
export const segmentAt=(rot:number)=>Math.floor((((360-(rot%360))%360+360)%360)/SEG_ANGLE)%SEGS.length;
export function targetRotation(cur:number,idx:number,spins:number,jitter:number){const want=((360-(idx*SEG_ANGLE+SEG_ANGLE/2+jitter))%360+360)%360;const add=(((want-(cur%360))%360)+360)%360;return cur+spins*360+add}
