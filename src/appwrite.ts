'use client';
import { Client,Account,TablesDB,Storage,ID,Query } from 'appwrite';
import type { Product,StoreOrder } from './data';
const endpoint=process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT||'https://fra.cloud.appwrite.io/v1';
const projectId=process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID||'6ab3f77800235eff10da';
export const databaseId=process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID||'6ab3fc4100065a0c55ff';
export const tableId=process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_TABLE_ID||'6ab3fc590027440805cc';
export const ordersTableId=process.env.NEXT_PUBLIC_APPWRITE_ORDERS_TABLE_ID||'6ab506fe00248c9e19bf';
export const storageBucketId=process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID||'6ab3ff81000d25bdfd2b';
export const appwriteReady=Boolean(endpoint&&projectId&&databaseId&&tableId);
export const ordersReady=Boolean(appwriteReady&&ordersTableId);
export const client=new Client().setEndpoint(endpoint||'https://fra.cloud.appwrite.io/v1').setProject(projectId||'not-configured');
export const account=new Account(client);
export const tablesDB=new TablesDB(client);
export const storage=new Storage(client);
const requireConfig=()=>{if(!appwriteReady)throw new Error('Appwrite is not configured. Add the correct endpoint, project, database, Products table and storage bucket IDs to this deployment.');};
const requireOrders=()=>{requireConfig();if(!ordersTableId)throw new Error('Orders table is not configured. Set NEXT_PUBLIC_APPWRITE_ORDERS_TABLE_ID.');};
async function fetchAllRows(targetTableId:string,queries:string[]=[]){const rows:any[]=[];const pageSize=100;for(let offset=0;offset<5000;offset+=pageSize){const response=await tablesDB.listRows({databaseId,tableId:targetTableId,queries:[...queries,Query.limit(pageSize),Query.offset(offset)]});rows.push(...response.rows);if(response.rows.length<pageSize)break;}return rows;}
export async function listProducts():Promise<Product[]>{requireConfig();const rows=await fetchAllRows(tableId,[Query.orderDesc('$createdAt')]);return (rows as unknown as Product[]).filter(product=>['Published','Sold out','Coming soon'].includes(product.status));}
export async function listAllProducts():Promise<Product[]>{requireConfig();return await fetchAllRows(tableId,[Query.orderDesc('$createdAt')]) as unknown as Product[];}
const productFields=['name','slug','category','description','price','sizes','colours','fabric','image','gallery','status','featured','hasDiscount','originalPrice','discountLabel'] as const;
function productPayload(product:Partial<Product>){const payload:Record<string,unknown>={};for(const field of productFields){if(!(field in product))continue;const value=product[field];if(field==='price'||field==='originalPrice')payload[field]=Number(value)||0;else if(field==='sizes'||field==='colours'||field==='gallery')payload[field]=Array.isArray(value)?value:[];else if(field==='featured'||field==='hasDiscount')payload[field]=Boolean(value);else payload[field]=value??'';}return payload;}
export async function createProduct(product:Product):Promise<Product>{requireConfig();return await tablesDB.createRow({databaseId,tableId,rowId:ID.unique(),data:productPayload(product)}) as unknown as Product;}
export async function updateProduct(id:string,product:Partial<Product>):Promise<Product>{requireConfig();return await tablesDB.updateRow({databaseId,tableId,rowId:id,data:productPayload(product)}) as unknown as Product;}
export async function deleteProduct(id:string){requireConfig();await tablesDB.deleteRow({databaseId,tableId,rowId:id});}
export async function uploadImage(file:File):Promise<string>{requireConfig();if(!storageBucketId)throw new Error('Add the Appwrite storage bucket ID before uploading images.');if(!['image/jpeg','image/png'].includes(file.type))throw new Error('Upload a JPG or PNG image.');if(file.size>10*1024*1024)throw new Error('Images must be 10 MB or smaller.');const uploaded=await storage.createFile(storageBucketId,ID.unique(),file);return storage.getFileView({bucketId:storageBucketId,fileId:uploaded.$id}).toString();}
export async function createOrder(order:Omit<StoreOrder,'$id'|'$createdAt'>):Promise<StoreOrder>{requireOrders();if(order.items.length>16000)throw new Error('This order is too large to save. Please reduce the number of items or contact the atelier.');return await tablesDB.createRow({databaseId,tableId:ordersTableId,rowId:ID.unique(),data:order}) as unknown as StoreOrder;}
export async function listOrders():Promise<StoreOrder[]>{requireOrders();const rows=await fetchAllRows(ordersTableId,[Query.orderDesc('$createdAt')]);return rows as unknown as StoreOrder[];}
export async function updateOrderStatus(id:string,status:StoreOrder['status']):Promise<StoreOrder>{requireOrders();return await tablesDB.updateRow({databaseId,tableId:ordersTableId,rowId:id,data:{status}}) as unknown as StoreOrder;}
export function explainAppwriteError(error:unknown){const message=error instanceof Error?error.message:String(error);if(/index|attribute|query/i.test(message))return `${message} Check the Appwrite project/database/table IDs and the documented table attributes.`;return message;}
