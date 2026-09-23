export type Product={ $id?:string; name:string; slug:string; category:string; description:string; price:number; sizes:string[]; colours:string[]; fabric?:string; image:string; gallery?:string[]; status:'Published'|'Draft'|'Sold out'|'Coming soon'; featured?:boolean; hasDiscount?:boolean; originalPrice?:number; discountLabel?:string };
export const seedProducts:Product[]=[];
export const money=(n:number)=>n>0?`₦${new Intl.NumberFormat('en-NG').format(n)}`:'Price on request';
export const whatsappNumber=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'2348145000582').replace(/\D/g,'');
export const brandName='Maison Prisca Atelier';
