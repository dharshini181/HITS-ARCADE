import {expect,it} from 'vitest';import {isCorrect,nextStep,roundPoints} from './logic';
it('steps are valid pad indices',()=>{for(let i=0;i<50;i++){const s=nextStep();expect(s).toBeGreaterThanOrEqual(0);expect(s).toBeLessThan(4)}});
it('checks taps against the sequence',()=>{expect(isCorrect([1,2,3],1,2)).toBe(true);expect(isCorrect([1,2,3],1,0)).toBe(false)});
it('later rounds and streaks score more',()=>{expect(roundPoints(3,1)).toBeGreaterThan(roundPoints(2,1));expect(roundPoints(2,4)).toBeGreaterThan(roundPoints(2,1))});
