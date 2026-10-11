export type Q={q:string;a:string;w:[string,string,string]};
export const BANK:Record<string,Q[]>={
General:[{q:'Capital of France?',a:'Paris',w:['Rome','Madrid','Lisbon']},{q:'Days in a leap year?',a:'366',w:['365','364','367']},{q:'Which is a primary colour?',a:'Red',w:['Green','Pink','Orange']},{q:'Sides on a hexagon?',a:'6',w:['5','8','7']},{q:'Fastest land animal?',a:'Cheetah',w:['Lion','Horse','Tiger']},{q:'National bird of India?',a:'Peacock',w:['Eagle','Parrot','Sparrow']}],
Science:[{q:'H2O is…?',a:'Water',w:['Salt','Gold','Air']},{q:'Planet closest to the Sun?',a:'Mercury',w:['Venus','Mars','Earth']},{q:'Plants absorb which gas?',a:'Carbon dioxide',w:['Oxygen','Helium','Neon']},{q:'Legs on a spider?',a:'8',w:['6','10','4']},{q:'Force that pulls things down?',a:'Gravity',w:['Magnetism','Friction','Light']},{q:'Hardest natural substance?',a:'Diamond',w:['Gold','Iron','Quartz']}],
World:[{q:'Largest ocean?',a:'Pacific',w:['Atlantic','Indian','Arctic']},{q:'How many continents?',a:'7',w:['5','6','8']},{q:'Longest river in Africa?',a:'Nile',w:['Congo','Niger','Zambezi']},{q:'Capital of Japan?',a:'Tokyo',w:['Kyoto','Osaka','Seoul']},{q:'Largest mammal?',a:'Blue whale',w:['Elephant','Giraffe','Hippo']},{q:'Where is the Taj Mahal?',a:'India',w:['Egypt','Peru','Turkey']}]};
export const SECONDS:Record<string,number>={Easy:20,Medium:12,Hard:7};
export const multiplier=(streak:number)=>streak>=4?2:streak>=2?1.5:1;
export const points=(left:number,total:number,streak:number)=>Math.round((100+Math.round(50*left/total))*multiplier(streak));
