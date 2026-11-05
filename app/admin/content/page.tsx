import { redirect } from "next/navigation";
import { getAdminState } from "@/lib/admin/auth";
import { loadCms } from "@/lib/portfolio-cms-loader";
import { Editor } from "@/components/admin/portfolio-editor";
export const dynamic = "force-dynamic";
export default async function AdminContent(){
 const state=await getAdminState();
 if(state.status==='signed-out')redirect('/admin/login?next=%2Fadmin%2Fcontent');
 if(state.status!=='admin')return <main className="p-10 text-white"><h1 className="text-2xl">Admin access required</h1><p className="mt-4">Configure Supabase and an authorized admin account first. See ADMIN_SETUP.md.</p></main>;
 return <Editor initial={await loadCms()} email={state.user.email} />;
}
