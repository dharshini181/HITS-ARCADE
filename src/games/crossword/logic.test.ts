import {expect,it} from 'vitest';import {PUZZLES,buildEntries} from './logic';
for(const [name,p] of Object.entries(PUZZLES))it(`${name}: clues match entries and every answer is a real run in the grid`,()=>{const {entries}=buildEntries(p.rows,p.across,p.down);
expect(entries.filter(e=>e.dir==='a')).toHaveLength(p.across.length);expect(entries.filter(e=>e.dir==='d')).toHaveLength(p.down.length);
for(const e of entries){expect(e.ans.length).toBeGreaterThan(1);expect(e.clue).not.toBe('');expect(e.ans).toMatch(/^[A-Z]+$/)}
const g=p.rows.map(r=>[...r].map(()=>'?'));for(const e of entries)e.cells.forEach(([r,c],i)=>{expect(g[r][c]==='?'||g[r][c]===e.ans[i]).toBe(true);g[r][c]=e.ans[i]});
p.rows.forEach((row,r)=>[...row].forEach((ch,c)=>{if(ch!=='#')expect(g[r][c]).toBe(ch)}))});
