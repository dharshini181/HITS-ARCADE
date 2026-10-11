import {expect,it} from 'vitest';import {finalScore,makeDeck,matchPoints} from './logic';
it('deck holds exactly two of each icon',()=>{const d=makeDeck(8);expect(d).toHaveLength(16);for(const e of new Set(d))expect(d.filter(x=>x===e)).toHaveLength(2)});
it('streak bonus grows',()=>{expect(matchPoints(1)).toBe(100);expect(matchPoints(3)).toBe(150)});
it('time bonus never negative',()=>{expect(finalScore(500,6,999)).toBe(500);expect(finalScore(500,6,8)).toBe(620)});
