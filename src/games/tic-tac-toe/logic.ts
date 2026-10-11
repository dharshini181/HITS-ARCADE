export type Mark='X'|'O';export type Cell=Mark|null;export type Level='Easy'|'Medium'|'Hard';
export const LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export const winner=(b:Cell[])=>{for(const l of LINES){const [a,c,d]=l;if(b[a]&&b[a]===b[c]&&b[a]===d_(b,d))return{who:b[a] as Mark,line:l}}return null};
const d_=(b:Cell[],i:number)=>b[i];
export const empties=(b:Cell[])=>b.flatMap((v,i)=>v?[]:[i]);
function mm(b:Cell[],turn:Mark,depth:number,a:number,beta:number):number{const w=winner(b);if(w)return w.who==='O'?10-depth:depth-10;const e=empties(b);if(!e.length)return 0;
if(turn==='O'){let best=-99;for(const i of e){b[i]='O';best=Math.max(best,mm(b,'X',depth+1,a,beta));b[i]=null;a=Math.max(a,best);if(a>=beta)break}return best}
let best=99;for(const i of e){b[i]='X';best=Math.min(best,mm(b,'O',depth+1,a,beta));b[i]=null;beta=Math.min(beta,best);if(a>=beta)break}return best}
/** Optimal move for O. */
export function bestMove(board:Cell[]){const b=[...board];let bi=-1,bv=-99;for(const i of empties(b)){b[i]='O';const v=mm(b,'X',1,-99,99);b[i]=null;if(v>bv){bv=v;bi=i}}return bi}
export function pickMove(b:Cell[],level:Level,rnd=Math.random){const e=empties(b);if(!e.length)return -1;const rand=()=>e[Math.floor(rnd()*e.length)];
if(level==='Easy')return rand();if(level==='Medium'&&rnd()<.4)return rand();return bestMove(b)}
export const matchScore=(wins:number,draws:number,hardCpu:boolean)=>wins*100*(hardCpu?2:1)+draws*40;
