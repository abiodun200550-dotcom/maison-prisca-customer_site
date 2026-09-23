'use client';
import { Client, Account, TablesDB, Storage, ID, Query } from 'appwrite';
import type { Product } from './data';

const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://fra.cloud.appwrite.io/v1';
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '6ab3f77800235eff10da';
export const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID || '6ab3fc4100065a0c55ff';
export const tableId = process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_TABLE_ID || '6ab3fc590027440805cc';
export const storageBucketId = process.env.NEXT_PUBLIC_APPWRITE_STORAGE_BUCKET_ID || '6ab3ff81000d25bdfd2b';
export const appwriteReady = Boolean(endpoint && projectId && databaseId && tableId);
export const client = new Client().setEndpoint(endpoint || 'https://cloud.appwrite.io/v1').setProject(projectId || 'not-configured');
export const account = new Account(client);
export const tablesDB = new TablesDB(client);
export const storage = new Storage(client);
const requireConfig = () => { if (!appwriteReady) throw new Error('This portal is not connected yet. Add the new project environment keys before using catalogue management.'); };
export async function listProducts(): Promise<Product[]> { if (!appwriteReady) return []; try { const r = await tablesDB.listRows({ databaseId, tableId, queries: [Query.equal('status', 'Published'), Query.orderDesc('$createdAt')] }); return r.rows as unknown as Product[]; } catch { return []; } }
export async function listAllProducts(): Promise<Product[]> { requireConfig(); const r = await tablesDB.listRows({ databaseId, tableId, queries: [Query.orderDesc('$createdAt')] }); return r.rows as unknown as Product[]; }
export async function createProduct(product: Product): Promise<Product> { requireConfig(); return await tablesDB.createRow({ databaseId, tableId, rowId: ID.unique(), data: product }) as unknown as Product; }
export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> { requireConfig(); return await tablesDB.updateRow({ databaseId, tableId, rowId: id, data: product }) as unknown as Product; }
export async function deleteProduct(id: string) { requireConfig(); await tablesDB.deleteRow({ databaseId, tableId, rowId: id }); }
export async function uploadImage(file: File): Promise<string> { requireConfig(); if (!storageBucketId) throw new Error('Add the new project storage bucket ID before uploading images.'); const uploaded = await storage.createFile(storageBucketId, ID.unique(), file); return storage.getFileView(storageBucketId, uploaded.$id).toString(); }
