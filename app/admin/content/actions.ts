"use server";
import { revalidatePath } from "next/cache";
import { getAdminUser } from "@/lib/admin/auth";
import { createClient } from "@/lib/supabase/server";
import { normalizeCms, type CmsData } from "@/lib/portfolio-cms";
export async function savePortfolio(payload: CmsData): Promise<{ok:boolean;error?:string}> {
 const admin=await getAdminUser(); if(!admin) return {ok:false,error:"Unauthorized: admin login required"};
 const db=await createClient(); if(!db) return {ok:false,error:"Supabase is not configured"};
 const serialized=JSON.stringify(payload); if(serialized.length>120000) return {ok:false,error:"Portfolio data is too large"};
 const content=normalizeCms(payload);
 if(!content.name.trim() || !content.role.trim()) return {ok:false,error:"Name and role are required"};
 if(content.projects.length>50||content.skills.length>100||content.certificates.length>100||content.experiences.length>100) return {ok:false,error:"Too many entries"};
 const {error}=await db.from('portfolio_settings').upsert({id:1,content,updated_by:admin.id,updated_at:new Date().toISOString()},{onConflict:'id'});
 if(error)return {ok:false,error:error.message};
 revalidatePath('/'); revalidatePath('/admin/content');return {ok:true};
}
export async function uploadPortfolioAsset(form:FormData):Promise<{ok:boolean;url?:string;error?:string}>{
 const admin=await getAdminUser();if(!admin)return {ok:false,error:'Unauthorized'};
 const db=await createClient();if(!db)return {ok:false,error:'Supabase is not configured'};
 const file=form.get('file');if(!(file instanceof File))return {ok:false,error:'Choose a file'};
 const allowed=['image/jpeg','image/png','image/webp','application/pdf'];
 if(!allowed.includes(file.type))return {ok:false,error:'Use JPG, PNG, WebP or PDF'};
 if(file.size>5*1024*1024)return {ok:false,error:'Maximum file size is 5 MB'};
 const ext=({"image/jpeg":"jpg","image/png":"png","image/webp":"webp","application/pdf":"pdf"} as Record<string,string>)[file.type];
 const path=`${admin.id}/${crypto.randomUUID()}.${ext}`;
 const {error}=await db.storage.from('portfolio-media').upload(path,file,{contentType:file.type,upsert:false});
 if(error)return {ok:false,error:error.message};
 return {ok:true,url:db.storage.from('portfolio-media').getPublicUrl(path).data.publicUrl};
}
