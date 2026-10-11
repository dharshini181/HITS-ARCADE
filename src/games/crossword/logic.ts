export type Entry={dir:'a'|'d';n:number;cells:[number,number][];clue:string;ans:string};
export type Puzzle={rows:string[];across:string[];down:string[]};
export const PUZZLES:Record<string,Puzzle>={
Easy:{rows:['HEART','O###A','U###B','S###L','ELITE'],across:['Organ that pumps blood','Top tier group'],down:['A place to live','Furniture with legs']},
Medium:{rows:['FASTS','A#H#T','CRANE','T#R#E','SPELL'],across:['Skips meals on purpose','Tall bird or lifting machine','Magic words, or write letter by letter'],down:['Verified truths','Divide with others','Strong iron alloy']}};
export function buildEntries(rows:string[],across:string[],down:string[]){const n=rows.length,m=rows[0].length,entries:Entry[]=[],nums:Record<string,number>={};let k=0,ia=0,id=0;
const o=(r:number,c:number)=>r>=0&&c>=0&&r<n&&c<m&&rows[r][c]!=='#';
for(let r=0;r<n;r++)for(let c=0;c<m;c++){if(!o(r,c))continue;const a=!o(r,c-1)&&o(r,c+1),d=!o(r-1,c)&&o(r+1,c);if(a||d)nums[`${r},${c}`]=++k;
if(a){const cells:[number,number][]=[];for(let x=c;o(r,x);x++)cells.push([r,x]);entries.push({dir:'a',n:k,cells,clue:across[ia++]??'',ans:cells.map(([y,x])=>rows[y][x]).join('')})}
if(d){const cells:[number,number][]=[];for(let y=r;o(y,c);y++)cells.push([y,c]);entries.push({dir:'d',n:k,cells,clue:down[id++]??'',ans:cells.map(([y,x])=>rows[y][x]).join('')})}}
return{entries,nums}}
export const liveScore=(correct:number,hints:number)=>Math.max(0,correct*20-hints*40);
