import {animate,motion,useMotionValue} from 'framer-motion';import {useEffect,useRef,useState} from 'react';
import type {Api} from '../../types';import {Btn,Confetti,pop} from '../../components/ui';import {sfx} from '../../lib/sound';import {ISpin,ITarget} from '../../components/Icons';import {SEGS,SEG_ANGLE,pickIndex,segmentAt,targetRotation} from './logic';
const MAX=5;
export function SpinWheel({api}:{api:Api}){const goal=({Easy:150,Medium:250,Hard:350} as Record<string,number>)[api.cfg.level]??250;
const rot=useMotionValue(0);const [n,setN]=useState(0),[total,setTotal]=useState(0),[busy,setBusy]=useState(false),[res,setRes]=useState<number|null>(null);const alive=useRef(true);
useEffect(()=>{alive.current=true;return()=>{alive.current=false}},[]);
const spin=async()=>{if(busy||api.paused||n>=MAX)return;api.touch();setBusy(true);setRes(null);sfx('tap');
const idx=pickIndex(),to=targetRotation(rot.get(),idx,5+Math.floor(Math.random()*3),(Math.random()-.5)*(SEG_ANGLE-14));
await animate(rot,to,{duration:4.4,ease:[.35,.05,.1,1]});if(!alive.current)return;
const seg=segmentAt(rot.get()),v=SEGS[seg].v,nt=total+v;setRes(seg);setTotal(nt);api.setScore(nt);setN(n+1);setBusy(false);sfx(v>=100?'win':v>0?'good':'bad');pop(v?'+'+v:'0',v?'#FFD700':'#FF69B4');
if(n+1>=MAX)setTimeout(()=>api.finish({score:nt,win:nt>=goal,detail:`${nt} of ${goal} goal`}),1400)};
return <div className="relative text-center"><div className="mb-2 flex justify-center gap-3 font-display"><span className="chip text-hot">Spin {Math.min(n+1,MAX)}/{MAX}</span><span className="chip text-gold"><ITarget className="h-4 w-4"/>Goal {goal}</span></div>
<div className="relative mx-auto mt-3 aspect-square w-[min(84vw,340px)]"><svg viewBox="0 0 40 40" className="absolute -top-4 left-1/2 z-10 h-10 w-10 -translate-x-1/2" style={{filter:'drop-shadow(0 0 8px #FFD700)'}} aria-hidden><path d="M4 6h32L20 36z" fill="#FFD700" stroke="#12000F" strokeWidth="3" strokeLinejoin="round"/></svg>
<motion.svg viewBox="0 0 300 300" style={{rotate:rot}} className="h-full w-full drop-shadow-xl" role="img" aria-label="Prize wheel">{SEGS.map((s,i)=>{const a0=i*SEG_ANGLE,a1=a0+SEG_ANGLE,p=(a:number)=>[150+140*Math.sin(a*Math.PI/180),150-140*Math.cos(a*Math.PI/180)];const [x0,y0]=p(a0),[x1,y1]=p(a1);
return <g key={i}><path d={`M150 150L${x0} ${y0}A140 140 0 0 1 ${x1} ${y1}Z`} fill={s.c} stroke="#12000F" strokeWidth="3"/><text transform={`rotate(${a0+SEG_ANGLE/2} 150 150)`} x="150" y="46" textAnchor="middle" fontSize={s.l.length>3?14:24} fontWeight="700" fill={s.c==='#31093D'?'#FFF4FA':'#12000F'} style={{fontFamily:'Bungee,sans-serif'}}>{s.l}</text></g>})}
<circle cx="150" cy="150" r="143" fill="none" stroke="#FFD700" strokeWidth="8"/><circle cx="150" cy="150" r="22" fill="#12000F" stroke="#FFD700" strokeWidth="5"/></motion.svg></div>
<p role="status" className="mt-3 min-h-8 font-display text-2xl">{res!==null?(SEGS[res].v?`You won ${SEGS[res].l==='JACKPOT'?'the JACKPOT! 500':SEGS[res].v}!`:'Oh no — 0!'):busy?'Spinning…':'Tap SPIN!'}</p>
{res!==null&&SEGS[res].l==='JACKPOT'&&<Confetti count={120}/>}
<div className="mt-2 flex items-center justify-center gap-3"><span className="font-display text-xl">Total <b className="text-gold">{total}</b></span><Btn className="bg-deep px-8 py-3 text-2xl" disabled={busy||n>=MAX} onClick={spin}><span className="flex items-center gap-2"><ISpin className="h-6 w-6"/>SPIN</span></Btn></div></div>}
