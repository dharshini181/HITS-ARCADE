import {describe,expect,it} from 'vitest';import {bestMove,type Cell,empties,matchScore,pickMove,winner} from './logic';
const E=():Cell[]=>Array(9).fill(null);
describe('tic-tac-toe',()=>{
it('detects every line',()=>{for(const l of [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]){const b=E();l.forEach(i=>b[i]='X');expect(winner(b)?.who).toBe('X')}});
it('no winner on empty or draw board',()=>{expect(winner(E())).toBeNull();expect(winner(['X','O','X','X','O','O','O','X','X'])).toBeNull()});
it('picks legal moves at every level',()=>{const b=E();b[0]='X';b[4]='O';for(const l of ['Easy','Medium','Hard'] as const){const m=pickMove(b,l);expect(empties(b)).toContain(m)}});
it('takes the winning move and blocks',()=>{const b=E();b[0]=b[1]='O';b[3]=b[4]='X';expect(bestMove(b)).toBe(2);const c=E();c[0]=c[1]='X';c[4]='O';expect(bestMove(c)).toBe(2)});
it('Hard O never loses against every possible human line',()=>{let humanWins=0;
const walk=(b:Cell[],turn:'X'|'O')=>{const w=winner(b);if(w){if(w.who==='X')humanWins++;return}const e=empties(b);if(!e.length)return;
if(turn==='X'){for(const i of e){b[i]='X';walk(b,'O');b[i]=null}}else{const i=bestMove(b);b[i]='O';walk(b,'X');b[i]=null}};
walk(E(),'X');expect(humanWins).toBe(0)});
it('scores a match',()=>{expect(matchScore(2,1,false)).toBe(240);expect(matchScore(2,1,true)).toBe(440)});
});
