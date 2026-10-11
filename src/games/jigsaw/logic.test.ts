import {expect,it} from 'vitest';import {GRID,IMAGES,jigsawScore,snaps} from './logic';
it('grids hold the advertised piece count with square pieces (board resizes the picture to fit)',()=>{for(const [k,[c,r]] of Object.entries(GRID)){expect(c*r).toBe(Number(k));expect(c/r).toBeGreaterThanOrEqual(4/3);expect(c/r).toBeLessThanOrEqual(1.5)}});
it('snaps only when close to the target slot',()=>{expect(snaps(100,100,110,95,50)).toBe(true);expect(snaps(100,100,160,100,50)).toBe(false)});
it('hints cost points, speed adds points',()=>{expect(jigsawScore(12,1,0,12)).toBeLessThan(jigsawScore(12,0,0,12));expect(jigsawScore(12,0,10,12)).toBeGreaterThan(jigsawScore(12,0,60,12))});
it('has three bundled pictures',()=>{expect(Object.keys(IMAGES)).toHaveLength(3)});
