import {expect,it} from 'vitest';import {BANK,multiplier,points} from './logic';
it('every question has 4 distinct options including the answer',()=>{for(const qs of Object.values(BANK))for(const q of qs){expect(new Set([q.a,...q.w]).size).toBe(4)}});
it('streaks raise the multiplier and points',()=>{expect(multiplier(0)).toBe(1);expect(multiplier(2)).toBe(1.5);expect(multiplier(4)).toBe(2);expect(points(10,10,4)).toBeGreaterThan(points(10,10,0))});
it('faster answers score more',()=>{expect(points(10,10,0)).toBeGreaterThan(points(1,10,0))});
