import {motion} from 'framer-motion';import {useEffect,useMemo,useRef,useState} from 'react';
import type {Api} from '../../types';import {Burst,pop} from '../../components/ui';import {sfx} from '../../lib/sound';import {Glyph,IFlame} from '../../components/Icons';import {PAIRS,finalScore,makeDeck,matchPoints} from './logic';
export function MatchingPairs({api}:{api:Api}){
const pairs=PAIRS[api.cfg.level]??8,deck=useMemo(()=>makeDeck(pairs),[pairs]);
const [open,setOpen]=useState<number[]>([]);const [done,setDone]=useState<number[]>([]);const [moves,setMoves]=useState(0);const [streak,setStreak]=useState(0);const [lock,setLock]=useState(false);const [base,setBase]=useState(0);const [burst,setBurst]=useState(0);
const timers=useRef<number[]>([]);useEffect(()=>()=>timers.current.forEach(clearTimeout),[]);
const later=(f:()=>void,ms:number)=>{timers.current.push(window.setTimeout(f,ms))};
const tap=(i:number)=>{if(lock||api.paused||open.includes(i)||done.includes(i))return;api.touch();sfx('tap');const n=[...open,i];setOpen(n);if(n.length<2)return;
setMoves(m=>m+1);const [a,c]=n;
if(deck[a]===deck[c]){const s=streak+1,nb=base+matchPoints(s),nd=[...done,a,c];setStreak(s);setBase(nb);api.setScore(nb);setLock(true);sfx('good');pop('+'+matchPoints(s));setBurst(x=>x+1);
later(()=>{setDone(nd);setOpen([]);setLock(false);if(nd.length===deck.length)api.finish({score:finalScore(nb,pairs,api.elapsed()),win:true,detail:`${moves+1} moves · ${pairs} pairs`})},450)}
else{setLock(true);setStreak(0);const nb=Math.max(0,base-10);setBase(nb);api.setScore(nb);sfx('bad');later(()=>{setOpen([]);setLock(false)},900)}};
const cols=deck.length>16?'grid-cols-5':'grid-cols-4';
return <div className="relative">
<div className="mb-3 flex justify-center gap-3 font-display"><span className="chip text-snow">Moves {moves}</span><span className="chip text-hot">Pairs {done.length/2}/{pairs}</span><span className="chip text-gold"><IFlame className="h-4 w-4"/>Streak {streak}</span></div>
<div className="mb-4 h-3 overflow-hidden rounded-full bg-night" role="progressbar" aria-valuenow={done.length/2} aria-valuemax={pairs}><motion.div className="h-full bg-gold shadow-[0_0_10px_#FFD700]" animate={{width:`${done.length/deck.length*100}%`}}/></div>
<div className={`no-pan mx-auto grid max-w-md gap-3 ${cols}`} style={{perspective:900}}>
{deck.map((e,i)=>{const up=open.includes(i)||done.includes(i),ok=done.includes(i);return <motion.button key={i} onClick={()=>tap(i)} aria-label={`Card ${i+1}, ${up?e+(ok?' matched':''):'face down'}`} className="relative aspect-square min-h-14" animate={{rotateY:up?180:0,scale:ok?[1,1.12,1]:1}} transition={{duration:.35}} style={{transformStyle:'preserve-3d'}}>
<span className="absolute inset-0 grid place-items-center rounded-2xl bg-gradient-to-br from-deep to-mag font-display text-3xl text-ink shadow-[0_4px_0_rgba(0,0,0,.6)]" style={{backfaceVisibility:'hidden'}}>?</span>
<span className={`absolute inset-0 grid place-items-center rounded-2xl border-2 border-hot/60 shadow-[0_4px_0_rgba(0,0,0,.6)] ${ok?'bg-gold/25 ring-4 ring-gold':'bg-night'}`} style={{backfaceVisibility:'hidden',transform:'rotateY(180deg)'}}><Glyph id={e} className="h-3/4 w-3/4"/>{ok&&<b className="absolute right-1 top-0 text-sm text-gold">✓</b>}</span></motion.button>})}
</div><Burst key={burst} show={burst>0}/></div>}
