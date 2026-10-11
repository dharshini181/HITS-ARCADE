import {motion} from 'framer-motion';import {useEffect,useRef,useState} from 'react';
import type {Api} from '../../types';import {pop} from '../../components/ui';import {IFlame,IHeart} from '../../components/Icons';import {sfx} from '../../lib/sound';import {PADS,SETTINGS,isCorrect,nextStep,roundPoints} from './logic';
const wait=(ms:number)=>new Promise<void>(r=>setTimeout(r,ms));
export function Memory({api}:{api:Api}){
const S=SETTINGS[api.cfg.level]??SETTINGS.Medium;const [seq,setSeq]=useState<number[]>(()=>[nextStep()]);const [pos,setPos]=useState(0);const [phase,setPhase]=useState<'watch'|'you'>('watch');const [lit,setLit]=useState<number|null>(null);
const [lives,setLives]=useState(S.lives);const [score,setScore]=useState(0);const [streak,setStreak]=useState(0);const [replay,setReplay]=useState(0);const [msg,setMsg]=useState('Watch…');
const paused=useRef(api.paused);paused.current=api.paused;const done=useRef(false);
useEffect(()=>{let dead=false;(async()=>{setPhase('watch');setPos(0);setMsg('Watch…');await wait(700);for(const p of seq){while(paused.current&&!dead)await wait(100);if(dead)return;setLit(p);sfx('tap',p*120);await wait(S.speed*.6);setLit(null);await wait(S.speed*.4)}if(!dead){setPhase('you');setMsg('Your turn!')}})();return()=>{dead=true}},[seq.length,replay]); // eslint-disable-line react-hooks/exhaustive-deps
const tap=(p:number)=>{if(phase!=='you'||api.paused||done.current)return;api.touch();setLit(p);sfx('tap',p*120);setTimeout(()=>setLit(null),160);
if(isCorrect(seq,pos,p)){if(pos+1<seq.length){setPos(pos+1);return}const st=streak+1,sc=score+roundPoints(seq.length,st);setStreak(st);setScore(sc);api.setScore(sc);sfx('good');pop('+'+roundPoints(seq.length,st));
if(seq.length>=S.goal){done.current=true;setTimeout(()=>api.finish({score:sc+lives*50,win:true,detail:`${S.goal} rounds cleared`}),500);return}
setPhase('watch');setMsg('Nice!');setTimeout(()=>setSeq(s=>[...s,nextStep()]),700)}
else{sfx('bad');setStreak(0);const l=lives-1;setLives(l);if(l<=0){done.current=true;setMsg('Game over');setTimeout(()=>api.finish({score,win:false,detail:`Reached round ${seq.length}`}),600);return}setPhase('watch');setMsg('Oops — watch again');setTimeout(()=>setReplay(r=>r+1),900)}};
return <div className="mx-auto max-w-sm text-center">
<div className="mb-2 flex justify-center gap-3 font-display"><span className="chip text-hot">Round {seq.length}/{S.goal}</span><span className="chip text-deep" aria-label={`${lives} lives`}>{lives?Array.from({length:lives},(_,k)=><IHeart key={k} className="h-4 w-4"/>):'—'}</span><span className="chip text-gold"><IFlame className="h-4 w-4"/>{streak}</span></div>
<p role="status" className="my-3 min-h-7 font-display text-xl">{msg}</p>
<div className="no-pan grid grid-cols-2 gap-4">{PADS.map((p,i)=><motion.button key={i} onClick={()=>tap(i)} aria-label={`${p.n} pad`} disabled={phase!=='you'} animate={{scale:lit===i?1.08:1,opacity:lit===i?1:.8}} whileTap={{scale:.95}} transition={{duration:.1}} className="aspect-square min-h-24 rounded-[2rem] shadow-[0_6px_0_rgba(0,0,0,.6)]" style={{background:p.c,filter:lit===i?'brightness(1.1) saturate(1.3)':'none'}}/>)}</div></div>}
