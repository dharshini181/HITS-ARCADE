import {expect,it} from 'vitest';import {guessScore,judge,validate} from './logic';
it('validates input',()=>{expect(validate('',50,[]).ok).toBe(false);expect(validate('4.5',50,[]).ok).toBe(false);expect(validate('0',50,[]).ok).toBe(false);expect(validate('51',50,[]).ok).toBe(false);expect(validate('7',50,[7]).ok).toBe(false);expect(validate('7',50,[])).toEqual({ok:true,n:7})});
it('judges guesses',()=>{expect(judge(10,20)).toBe('high');expect(judge(10,3)).toBe('low');expect(judge(10,10)).toBe('correct')});
it('rewards fewer attempts',()=>{expect(guessScore(2,5,0)).toBeGreaterThan(guessScore(2,1,0))});
