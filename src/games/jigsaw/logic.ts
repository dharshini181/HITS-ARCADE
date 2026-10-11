const svg=(b:string)=>`url("data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'>${b}</svg>`)}")`;
export const IMAGES:Record<string,string>={
'Sunset Sea':svg(`<rect width='400' height='300' fill='#FF4500'/><circle cx='280' cy='150' r='70' fill='#FFD700'/><rect y='150' width='400' height='150' fill='#FF1493'/><path d='M0 200Q100 170 200 200T400 200V300H0Z' fill='#FF69B4'/><path d='M30 150l40-70 40 70z' fill='#FF00FF'/><circle cx='90' cy='60' r='8' fill='#FFD700'/>`),
'Pink Hills':svg(`<rect width='400' height='300' fill='#FF00FF'/><circle cx='90' cy='70' r='40' fill='#FFD700'/><path d='M0 300V190Q100 100 200 190T400 170V300Z' fill='#FF69B4'/><path d='M0 300V240Q120 170 240 240T400 230V300Z' fill='#FF1493'/><path d='M300 90l30 30-30 30-30-30z' fill='#FFD700'/>`),
'Happy Fish':svg(`<rect width='400' height='300' fill='#FF00FF'/><ellipse cx='190' cy='150' rx='100' ry='60' fill='#FFD700'/><path d='M280 150l90-50v100z' fill='#FF4500'/><circle cx='130' cy='135' r='12' fill='#FFF4FA'/><circle cx='127' cy='135' r='5' fill='#12000F'/><path d='M120 175q25 20 50 0' stroke='#12000F' stroke-width='6' fill='none'/><circle cx='60' cy='60' r='14' fill='#FF69B4'/><circle cx='340' cy='240' r='20' fill='#FF69B4'/>`)};
export const GRID:Record<string,[number,number]>={'12':[4,3],'24':[6,4],'48':[8,6]};
export const snaps=(x:number,y:number,tx:number,ty:number,cs:number)=>Math.hypot(x-tx,y-ty)<cs*.6;
export const jigsawScore=(placed:number,hints:number,secs:number,total:number)=>placed*10-hints*25+Math.max(0,total*8-secs)*2;
