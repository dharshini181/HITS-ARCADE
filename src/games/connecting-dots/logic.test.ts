import {expect,it} from 'vitest';import {LEVELS,dotPoints,shape} from './logic';
it('each level has the right number of in-bounds dots',()=>{for(const l of LEVELS){const p=shape(l.name,l.n);expect(p).toHaveLength(l.n);for(const [x,y] of p){expect(x).toBeGreaterThan(0);expect(x).toBeLessThan(100);expect(y).toBeGreaterThan(0);expect(y).toBeLessThan(100)}}});
it('combo raises dot points up to a cap',()=>{expect(dotPoints(1)).toBe(50);expect(dotPoints(3)).toBe(75);expect(dotPoints(99)).toBe(100)});
