import {createClient} from "@/lib/supabase/server";
import {DEFAULT_CMS,normalizeCms,type CmsData} from "@/lib/portfolio-cms";
export async function loadCms(): Promise<CmsData> {
 try {const db=await createClient(); if(!db) return DEFAULT_CMS;
 const {data,error}=await db.from('portfolio_settings').select('content').eq('id',1).maybeSingle();
 if(error || !data) return DEFAULT_CMS;
 return normalizeCms(data.content);
 } catch {return DEFAULT_CMS;}
}
