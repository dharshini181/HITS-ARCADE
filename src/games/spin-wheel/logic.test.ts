import {expect,it} from 'vitest';import {SEGS,SEG_ANGLE,pickIndex,segmentAt,targetRotation} from './logic';
it('pointer always lands on the chosen segment',()=>{for(let i=0;i<SEGS.length;i++)for(const cur of [0,17.5,359,1234.5])for(const j of [-18,0,18]){expect(segmentAt(targetRotation(cur,i,5,j))).toBe(i)}});
it('pickIndex stays in range',()=>{for(let k=0;k<200;k++){const i=pickIndex();expect(i).toBeGreaterThanOrEqual(0);expect(i).toBeLessThan(SEGS.length)}});
it('segments cover the circle',()=>{expect(SEG_ANGLE*SEGS.length).toBe(360)});
