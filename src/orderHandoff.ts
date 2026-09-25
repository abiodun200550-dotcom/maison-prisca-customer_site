export type OrderHandoff={order:{orderNumber:string;subtotal:number};items:{name:string;size:string;quantity:number;price:number}[];message:string;saved:boolean;saveError?:string};
let lastOrder:OrderHandoff|null=null;
export function setOrderHandoff(value:OrderHandoff){lastOrder=value;try{if(typeof window!=='undefined')window.sessionStorage.setItem('maison-prisca-last-order',JSON.stringify(value));}catch{}}
export function getOrderHandoff(orderNumber:string):OrderHandoff|null{if(lastOrder?.order.orderNumber===orderNumber)return lastOrder;try{if(typeof window!=='undefined'){const value=window.sessionStorage.getItem('maison-prisca-last-order');if(value){const parsed=JSON.parse(value) as OrderHandoff;if(parsed.order?.orderNumber===orderNumber)return parsed;}}}catch{}return null;}
