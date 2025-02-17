export function generateDate(date, advance, skipweekend) {
   let d = new Date(date);
   d = new Date(d.setDate(d.getDate() + advance));
   let day = d.getDay();

   if (!skipweekend) {
      if (day === 6) {
         d = new Date(d.setDate(d.getDate() + 2));
      }
      if (day === 0) {
         d = new Date(d.setDate(d.getDate() + 1));
      }
   }

   return d;
}
