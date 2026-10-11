import {AnimatePresence,motion,useAnimation} from 'framer-motion';import {useEffect,useRef,useState} from 'react';
import type {Api} from '../../types';import {Btn,pop} from '../../components/ui';import {sfx} from '../../lib/sound';import {IBackspace} from '../../components/Icons';import {RANGES,guessScore,judge,validate} from './logic';
type H={n:number;r:'high'|'low'};
export function NumberGuess({api}:{api:Api}){
const R=RANGES[api.cfg.level]??RANGES.Medium;const secret=useRef(1+Math.floor(Math.random()*R.max));
const [buf,setBuf]=useState('');const [hist,setHist]=useState<H[]>([]);const [msg,setMsg]=useState(`Guess a whole number from 1 to ${R.max}`);const [left,setLeft]=useState(R.tries);const fin=useRef(false);const shake=useAnimation();
const submit=()=>{if(fin.current||api.paused)return;const v=validate(buf,R.max,hist.map(h=>h.n));if(!v.ok){setMsg(v.msg);sfx('bad');shake.start({x:[0,-10,10,-6,6,0],transition:{duration:.35}});return}
api.touch();const l=left-1,j=judge(secret.current,v.n);setLeft(l);setBuf('');
if(j==='correct'){fin.current=true;setMsg('Correct!');sfx('win');pop('+'+guessScore(R.mult,l,0));const sc=guessScore(R.mult,l,0);api.setScore(sc);setTimeout(()=>api.finish({score:sc,win:true,detail:`Found in ${R.tries-l} tries`}),700);return}
setHist(h=>[{n:v.n,r:j},...h]);setMsg(j==='high'?'Too high ▼':'Too low ▲');sfx('good',j==='high'?-200:200);api.setScore(guessScore(R.mult,l,0));
if(l===0){fin.current=true;setMsg(`Out of tries! It was ${secret.current}`);setTimeout(()=>api.finish({score:0,win:false,detail:`The number was ${secret.current}`}),900)}};
const key=(k:string)=>{if(fin.current||api.paused)return;if(k==='⌫')setBuf(b=>b.slice(0,-1));else if(k==='OK')submit();else setBuf(b=>b.length<4?b+k:b)};
const kr=useRef(key);kr.current=key;
useEffect(()=>{const f=(e:KeyboardEvent)=>{if(/^\d$/.test(e.key))kr.current(e.key);else if(e.key==='Backspace')kr.current('⌫');else if(e.key==='Enter')kr.current('OK');else if(e.key==='.'||e.key===','){setMsg('Whole numbers only')}};window.addEventListener('keydown',f);return()=>window.removeEventListener('keydown',f)},[]);
return <div className="mx-auto max-w-sm">
<p className="text-center font-display text-sm text-snow/70">Range 1–{R.max} · <b>{left}</b> {left===1?'try':'tries'} left</p>
<motion.div animate={shake} className="lcd my-2 grid h-24 place-items-center !rounded-3xl text-4xl" aria-live="polite">{buf||'—'}</motion.div>
<p role="status" className="min-h-7 text-center font-display text-lg">{msg}</p>
<div className="no-pan my-2 grid grid-cols-3 gap-2">{['1','2','3','4','5','6','7','8','9','⌫','0','OK'].map(k=><Btn key={k} onClick={()=>key(k)} aria-label={k==='⌫'?'Backspace':k==='OK'?'Submit guess':k} className={`h-14 ${k==='OK'?'bg-deep':k==='⌫'?'bg-fire':'bg-snow'}`}>{k==='⌫'?<IBackspace className="mx-auto h-6 w-6"/>:k}</Btn>)}</div>
<ul className="mt-3 flex flex-wrap gap-2"><AnimatePresence>{hist.map(h=><motion.li key={h.n} layout initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} className={`rounded-full px-3 py-1 text-sm font-semibold ${h.r==='high'?'bg-fire/40 text-snow':'bg-hot/40 text-snow'}`}>{h.n} {h.r==='high'?'▼ high':'▲ low'}</motion.li>)}</AnimatePresence></ul></div>}
