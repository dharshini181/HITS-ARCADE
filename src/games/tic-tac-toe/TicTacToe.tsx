import {motion} from 'framer-motion';import {useEffect,useRef,useState} from 'react';
import type {Api} from '../../types';import {Btn,Burst,pop} from '../../components/ui';import {sfx} from '../../lib/sound';
import {type Cell,type Level,type Mark,matchScore,pickMove,winner} from './logic';
const C=(i:number)=>[(i%3)*100+50,Math.floor(i/3)*100+50];
const Mark_=({m}:{m:Mark})=><svg viewBox="0 0 100 100" className="h-3/4 w-3/4" fill="none" strokeWidth="13" strokeLinecap="round">{m==='X'?<><motion.path d="M22 22L78 78" stroke="#FF1493" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.2}}/><motion.path d="M78 22L22 78" stroke="#FF1493" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.2,delay:.12}}/></>:<motion.circle cx="50" cy="50" r="28" stroke="#FFD700" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.3}}/>}</svg>;
export function TicTacToe({api}:{api:Api}){
const cpu=api.cfg.opponent!=='Friend',level=api.cfg.level as Level;
const [b,setB]=useState<Cell[]>(Array(9).fill(null));const [turn,setTurn]=useState<Mark>('X');const [t,setT]=useState({X:0,O:0,D:0});const counted=useRef(false);
const w=winner(b),over=!!w||b.every(Boolean),rounds=t.X+t.O+t.D;
const place=(i:number)=>{if(b[i]||over||api.paused)return;api.touch();const n=[...b];n[i]=turn;setB(n);setTurn(turn==='X'?'O':'X');sfx('tap',turn==='X'?0:-120)};
useEffect(()=>{if(!over||counted.current)return;counted.current=true;
setT(p=>{const n=w?{...p,[w.who]:p[w.who]+1}:{...p,D:p.D+1};api.setScore(matchScore(n.X,n.D,cpu&&level==='Hard'));return n});if(w?.who==='X')pop('+'+(cpu&&level==='Hard'?200:100));sfx(w?.who==='X'||!w?'win':'bad')},[over]); // eslint-disable-line react-hooks/exhaustive-deps
useEffect(()=>{if(!cpu||turn!=='O'||over||api.paused)return;const id=setTimeout(()=>{const m=pickMove(b,level);if(m>=0)place(m)},600);return()=>clearTimeout(id)},[turn,over,api.paused,b]); // eslint-disable-line react-hooks/exhaustive-deps
const next=()=>{counted.current=false;setB(Array(9).fill(null));setTurn('X')};
const msg=w?`${w.who==='X'?'You':cpu?'Computer':'O'} won this round!`:over?"It's a draw!":cpu&&turn==='O'?'Computer is thinking…':`${turn}'s turn`;
return <div className="relative flex flex-col items-center gap-4">
<div className="flex w-full justify-center gap-3 text-center font-display text-lg"><div className="rounded-2xl border-2 border-deep bg-deep/30 px-5 py-2">✕ You<br/><b className="text-3xl">{t.X}</b></div><div className="rounded-2xl border-2 border-hot/40 bg-panel2 px-5 py-2">Draws<br/><b className="text-3xl">{t.D}</b></div><div className="rounded-2xl border-2 border-gold bg-gold/20 px-5 py-2">◯ {cpu?'CPU':'Friend'}<br/><b className="text-3xl">{t.O}</b></div></div>
<p role="status" className="min-h-7 font-display text-xl">{msg}</p>
<div className="no-pan relative aspect-square w-[min(86vw,360px)]">
<svg viewBox="0 0 300 300" className="absolute inset-0" stroke="#FF00FF" strokeWidth="8" strokeLinecap="round"><path d="M100 10V290M200 10V290M10 100H290M10 200H290"/></svg>
<div className="absolute inset-0 grid grid-cols-3">{b.map((v,i)=><button key={i} disabled={!!v||over} onClick={()=>place(i)} aria-label={`Cell ${i+1}, ${v??'empty'}`} className="grid place-items-center rounded-xl active:bg-fire/30 disabled:cursor-default">{v&&<Mark_ m={v}/>}</button>)}</div>
{w&&<svg viewBox="0 0 300 300" className="pointer-events-none absolute inset-0"><motion.line x1={C(w.line[0])[0]} y1={C(w.line[0])[1]} x2={C(w.line[2])[0]} y2={C(w.line[2])[1]} stroke="#FF4500" strokeWidth="12" strokeLinecap="round" initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:.4}}/></svg>}
<Burst show={!!w&&w.who==='X'}/></div>
<div className="flex flex-wrap justify-center gap-3"><Btn className="bg-gold" onClick={next} disabled={!over}>Next round</Btn><Btn className="bg-fire" onClick={()=>api.finish({score:matchScore(t.X,t.D,cpu&&level==='Hard'),win:t.X>t.O,detail:`${t.X}W · ${t.D}D · ${t.O}L`})} disabled={rounds===0}>Finish match</Btn></div></div>}
