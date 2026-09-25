export type Product={ $id?:string; name:string; slug:string; category:string; description:string; price:number; sizes:string[]; colours:string[]; fabric?:string; image:string; gallery?:string[]; status:'Published'|'Draft'|'Sold out'|'Coming soon'; featured?:boolean; hasDiscount?:boolean; originalPrice?:number; discountLabel?:string };
export type CartItem={product:Product;size:string;quantity:number};
export type OrderStatus='New'|'Confirmed'|'Processing'|'Ready'|'Completed';
export type OrderItem={productId:string;name:string;size:string;quantity:number;price:number};
export type StoreOrder={ $id?:string; orderNumber:string; customerName:string; customerPhone:string; customerEmail?:string; deliveryAddress:string; deliveryCity:string; deliveryState:string; deliveryNote?:string; items:string; subtotal:number; total:number; status:OrderStatus; ref?:string; $createdAt?:string };
export const money=(n:number)=>n>0?`₦${new Intl.NumberFormat('en-NG').format(n)}`:'Price on request';
export const whatsappNumber=(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER||'2348145000582').replace(/\D/g,'');
export const brandName='Maison Prisca Atelier';
export const cartStorageKey='maison-prisca-cart-v3';
export const slugify=(value:string)=>value.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export const formatOrderItems=(items:CartItem[]):OrderItem[]=>items.map(({product,size,quantity})=>({productId:product.$id||product.slug,name:product.name,size,quantity,price:product.price}));
export const newOrderNumber=()=>{const stamp=Date.now().toString(36).toUpperCase();const suffix=typeof crypto!=='undefined'&&'randomUUID'in crypto?crypto.randomUUID().replace(/-/g,'').slice(0,8).toUpperCase():Math.random().toString(36).slice(2,10).toUpperCase();return `MP-${stamp}-${suffix}`;};
export const getSubtotal=(items:CartItem[])=>items.reduce((sum,item)=>sum+item.product.price*item.quantity,0);
export const waLink=(text:string)=>`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
export function buildWhatsAppOrder(order:StoreOrder,items:OrderItem[]){const summary=items.map((item,index)=>`${index+1}. ${item.name}\n   Size: ${item.size}\n   Qty: ${item.quantity}\n   ${money(item.price*item.quantity)}`).join('\n\n');return `Hello Maison Prisca Atelier,\n\nI'd like to place an order through the online store.\n\n*ORDER ${order.orderNumber}*\n━━━━━━━━━━━━━━\n${summary}\n\n━━━━━━━━━━━━━━\n*Subtotal:* ${money(order.subtotal)}\n*Total:* ${money(order.total)}\n\n*CUSTOMER DETAILS*\nName: ${order.customerName}\nPhone: ${order.customerPhone}${order.customerEmail?`\nEmail: ${order.customerEmail}`:''}\n\n*DELIVERY*\nLocation: ${order.deliveryCity}, ${order.deliveryState}\nAddress: ${order.deliveryAddress}${order.deliveryNote?`\nNote: ${order.deliveryNote}`:''}\n\nPlease confirm availability, delivery cost and the next step.\n\nThank you.${order.ref?`\n\nReference: ${order.ref}`:''}`;}
