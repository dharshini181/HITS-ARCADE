import {useEffect,useLayoutEffect,useRef,useState} from 'react';
import type {Api} from '../../types';import {Btn,pop} from '../../components/ui';import {sfx} from '../../lib/sound';import {IBulb,IEye} from '../../components/Icons';import {GRID,IMAGES,jigsawScore,snaps} from './logic';
type Pc={x:number;y:number;placed:boolean};
export function Jigsaw({api}:{api:Api}){const [cols,rows]=GRID[api.cfg.pieces]??GRID['12'];const N=cols*rows,img=IMAGES[api.cfg.image]??Object.values(IMAGES)[0];
const wrap=useRef<HTMLDivElement>(null);const [W0,setW0]=useState(340);useLayoutEffect(()=>{setW0(Math.min(420,wrap.current?.clientWidth??340))},[]);
const cs=Math.floor(W0/cols),W=cs*cols,H=cs*rows,trayH=cs*(N>24?4:N>12?3:2.5)+16;
const [ps,setPs]=useState<Pc[]>(()=>[]);const [hints,setHints]=useState(0),[peek,setPeek]=useState(false);const drag=useRef<{i:number;dx:number;dy:number}|null>(null);const z=useRef(1);const [zs,setZs]=useState<number[]>([]);const fin=useRef(false);
useEffect(()=>{setPs(Array.from({length:N},()=>({x:Math.random()*(W-cs),y:H+10+Math.random()*(trayH-cs-12),placed:false})));setZs(Array(N).fill(0))},[N,W,H,cs,trayH]);
const tgt=(i:number)=>[(i%cols)*cs,Math.floor(i/cols)*cs] as const;
const placedN=ps.filter(p=>p.placed).length;
const live=Math.max(0,placedN*10-hints*25);
useEffect(()=>{api.setScore(live)},[live]); // eslint-disable-line react-hooks/exhaustive-deps
useEffect(()=>{if(N&&placedN===N&&!fin.current){fin.current=true;sfx('win');setTimeout(()=>api.finish({score:Math.max(0,jigsawScore(N,hints,api.elapsed(),N)),win:true,detail:`${N} pieces · ${hints} hint${hints===1?'':'s'}`}),900)}},[placedN]); // eslint-disable-line react-hooks/exhaustive-deps
const down=(e:React.PointerEvent,i:number)=>{if(api.paused||ps[i].placed)return;api.touch();(e.target as HTMLElement).setPointerCapture(e.pointerId);const r=(e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();drag.current={i,dx:e.clientX-r.left-ps[i].x,dy:e.clientY-r.top-ps[i].y};z.current++;setZs(a=>a.map((v,k)=>k===i?z.current:v));sfx('tap')};
const move=(e:React.PointerEvent)=>{const d=drag.current;if(!d)return;const r=(e.currentTarget.parentElement as HTMLElement).getBoundingClientRect();const x=Math.max(0,Math.min(W-cs,e.clientX-r.left-d.dx)),y=Math.max(0,Math.min(H+trayH-cs,e.clientY-r.top-d.dy));setPs(a=>a.map((p,k)=>k===d.i?{...p,x,y}:p))};
const up=()=>{const d=drag.current;drag.current=null;if(!d)return;setPs(a=>a.map((p,k)=>{if(k!==d.i)return p;const [tx,ty]=tgt(k);if(snaps(p.x,p.y,tx,ty,cs)){sfx('good');pop('+10');return{x:tx,y:ty,placed:true}}return p}))};
const hint=()=>{if(placedN===N||api.paused)return;api.touch();
const pick=ps.map((p,k)=>k).filter(k=>!ps[k].placed);const k=pick[Math.floor(Math.random()*pick.length)];const [x,y]=tgt(k);setHints(h=>h+1);pop('−25','#FF4500');sfx('good');setPs(a=>a.map((p,j)=>j===k?{x,y,placed:true}:p))};
const pct=Math.round(placedN/N*100);
return <div ref={wrap}><div className="mb-2 flex flex-wrap justify-center gap-2 font-display"><span className="chip text-hot">{placedN}/{N} placed</span><span className="chip text-gold">{pct}%</span></div>
<div className="mb-3 h-3 overflow-hidden rounded-full bg-night"><div className="h-full bg-gold shadow-[0_0_10px_#FFD700] transition-all" style={{width:`${pct}%`}}/></div>
<div className="no-pan relative mx-auto select-none" style={{width:W,height:H+trayH}}>
<div className="absolute left-0 top-0 overflow-hidden rounded-xl border-2 border-hot/60 bg-night" style={{width:W,height:H,backgroundImage:peek?img:'none',backgroundSize:'100% 100%'}}>{!peek&&Array.from({length:N},(_,i)=><div key={i} className="absolute border border-hot/20" style={{left:tgt(i)[0],top:tgt(i)[1],width:cs,height:cs}}/>)}</div>
<div className="absolute left-0 rounded-xl bg-mag/15" style={{top:H+4,width:W,height:trayH-4}} aria-hidden/>
{ps.map((p,i)=><div key={i} role="button" aria-label={`Puzzle piece ${i+1}${p.placed?', placed':''}`} onPointerDown={e=>down(e,i)} onPointerMove={move} onPointerUp={up} onPointerCancel={up} className={`absolute ${p.placed?'':'cursor-grab shadow-lg ring-2 ring-gold'}`} style={{left:p.x,top:p.y,width:cs,height:cs,zIndex:p.placed?1:10+zs[i],backgroundImage:img,backgroundSize:`${W}px ${H}px`,backgroundPosition:`-${(i%cols)*cs}px -${Math.floor(i/cols)*cs}px`,transition:p.placed?'left .15s,top .15s':'none',touchAction:'none',borderRadius:p.placed?0:6}}/>)}</div>
<div className="mt-3 flex justify-center gap-3"><Btn className="bg-fire" onClick={hint} disabled={placedN===N}><span className="flex items-center gap-2"><IBulb className="h-5 w-5"/>Hint −25</span></Btn><Btn className="bg-snow" onPointerDown={()=>setPeek(true)} onPointerUp={()=>setPeek(false)} onPointerLeave={()=>setPeek(false)} onClick={()=>{setPeek(p=>!p)}}><span className="flex items-center gap-2"><IEye className="h-5 w-5"/>Preview</span></Btn></div>
<p className="mt-2 text-center text-xs text-snow/70">Drag pieces onto the board. Hold Preview (or tap it) to see the picture.</p></div>}
