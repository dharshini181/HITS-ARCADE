import {motion} from 'framer-motion';import {useEffect,useMemo,useRef,useState} from 'react';
import type {Api} from '../../types';import {pop} from '../../components/ui';import {sfx} from '../../lib/sound';import {IFlame} from '../../components/Icons';import {BANK,SECONDS,multiplier,points} from './logic';
const sh=<T,>(a:T[])=>[...a].sort(()=>Math.random()-.5);
export function Quiz({api}:{api:Api}){const T=SECONDS[api.cfg.level]??12;const qs=useMemo(()=>sh(BANK[api.cfg.category]??BANK.General).map(q=>({...q,o:sh([q.a,...q.w])})),[api.cfg.category]);
const [i,setI]=useState(0),[pick,setPick]=useState<number|null>(null),[left,setLeft]=useState(T),[streak,setStreak]=useState(0),[score,setScore]=useState(0),[ok,setOk]=useState(0);const tm=useRef<number[]>([]);useEffect(()=>()=>tm.current.forEach(clearTimeout),[]);
const q=qs[i];
const answer=(j:number)=>{if(pick!==null)return;api.touch();const good=j>=0&&q.o[j]===q.a;setPick(j);let ns=score;
if(good){const p=points(left,T,streak);ns=score+p;setStreak(streak+1);setScore(ns);api.setScore(ns);setOk(o=>o+1);sfx('good');pop(`+${p}${multiplier(streak)>1?' ×'+multiplier(streak):''}`)}else{setStreak(0);sfx('bad')}
const fo=ok+(good?1:0);
tm.current.push(window.setTimeout(()=>{if(i+1>=qs.length)api.finish({score:ns,win:fo>=Math.ceil(qs.length*.6),detail:`${fo}/${qs.length} correct`});else{setI(i+1);setPick(null);setLeft(T)}},1100))};
useEffect(()=>{if(pick!==null||api.paused)return;const id=setInterval(()=>setLeft(l=>Math.max(0,l-.1)),100);return()=>clearInterval(id)},[pick,api.paused,i]);
useEffect(()=>{if(left<=0&&pick===null)answer(-1)},[left]); // eslint-disable-line react-hooks/exhaustive-deps
const low=left/T<.3;
return <div><div className="mb-2 flex items-center justify-between font-display"><span>Question {i+1}/{qs.length}</span><span className="chip text-gold"><IFlame className="h-4 w-4"/>×{multiplier(streak)} · streak {streak}</span></div>
<div className="mb-4 h-4 overflow-hidden rounded-full bg-night" role="progressbar" aria-label="Time left"><div className={`h-full ${low?'bg-fire':'bg-gold'}`} style={{width:`${left/T*100}%`}}/></div>
<motion.h2 key={i} initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} className="mb-4 min-h-16 text-center font-display text-2xl">{q.q}</motion.h2>
<div className="grid gap-3 sm:grid-cols-2">{q.o.map((t,j)=>{const isA=t===q.a,show=pick!==null;const st=show?(isA?'bg-gold text-ink':j===pick?'bg-fire text-ink':'bg-night text-snow opacity-60'):'bg-panel2 text-snow';
return <motion.button key={t} onClick={()=>answer(j)} disabled={show} animate={show&&isA?{scale:[1,1.08,1]}:show&&j===pick?{x:[0,-8,8,-5,5,0]}:{}} whileTap={{scale:.96}} className={`min-h-16 rounded-2xl border-2 border-hot/50 px-4 font-display text-xl shadow-[0_4px_0_rgba(0,0,0,.6)] ${st}`}>{show&&isA?'✓ ':show&&j===pick?'✕ ':''}{t}</motion.button>})}</div></div>}
