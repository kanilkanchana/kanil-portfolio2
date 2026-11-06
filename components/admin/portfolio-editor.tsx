"use client";
import {useState, useTransition, type ReactNode} from 'react';
import {type CmsData} from '@/lib/portfolio-cms';
import {savePortfolio,uploadPortfolioAsset} from '@/app/admin/content/actions';
import { signOut } from '@/app/admin/login/actions';

type Tab='Hero & Animation'|'Skills'|'Projects'|'Services'|'Experience & Education'|'Certificates'|'About & Contact'|'Media';
const TABS:Tab[]=['Hero & Animation','Skills','Projects','Services','Experience & Education','Certificates','About & Contact','Media'];
const freshId=()=>Math.random().toString(36).slice(2,10);
const Field=({label,children}:{label:string;children:ReactNode})=><label className="flex flex-col gap-1.5 text-sm text-slate-300"><span>{label}</span>{children}</label>;
const inp='w-full rounded-xl border border-white/15 bg-slate-950/70 px-3 py-2.5 text-white outline-none focus:border-cyan-400';
const btn='rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm hover:bg-white/10';
export const Editor=({initial,email}:{initial:CmsData;email:string})=>{
 const [d,setD]=useState<CmsData>(initial); const [tab,setTab]=useState<Tab>('Hero & Animation');
 const [pending,start]=useTransition(); const [status,setStatus]=useState(''); const [asset,setAsset]=useState('');
 const patch=(partial:Partial<CmsData>)=>setD(old=>({...old,...partial}));
 const field=(key:keyof Pick<CmsData,'name'|'role'|'prefix'|'subtitle'|'availability'|'about'>,title:string)=>
 <Field label={title}><input className={inp} value={d[key]} onChange={e=>patch({[key]:e.target.value})}/></Field>;
 const save=()=>start(async()=>{setStatus('Saving…');try{const r=await savePortfolio(d);setStatus(r.ok?'Saved to public portfolio ✓':`Save failed: ${r.error}`);}catch(e){setStatus('Save failed — check your network or Supabase setup.');}});
 const uploadCertificate=(file:File|null,id:string)=>{if(!file)return;start(async()=>{setStatus('Uploading certificate image…');const form=new FormData();form.set('file',file);try{const result=await uploadPortfolioAsset(form);if(!result.ok||!result.url){setStatus(`Upload failed: ${result.error}`);return;}setD(prev=>({...prev,certificates:prev.certificates.map(c=>c.id===id?{...c,imageUrl:result.url}:c)}));setStatus('Image uploaded. Click Save changes to publish the certificate.');}catch{setStatus('Certificate image upload failed');}})};
 const upload=(file:File|null)=>{if(!file)return; start(async()=>{setStatus('Uploading…');const f=new FormData();f.set('file',file);try{const r=await uploadPortfolioAsset(f);if(r.ok){setAsset(r.url||'');setStatus('Uploaded ✓ — copy the URL to the relevant field.');}else setStatus(`Upload failed: ${r.error}`);}catch{setStatus('Upload failed');}})};
 return <div className="min-h-screen bg-[#060e1c] text-white">
 <header className="sticky top-0 z-30 border-b border-white/10 bg-[#071426]/95 backdrop-blur-xl"><div className="mx-auto max-w-7xl flex flex-wrap items-center justify-between gap-4 px-5 py-4"><div><p className="text-[11px] uppercase tracking-[.3em] text-cyan-400">Kanil Studio / CMS</p><h1 className="text-2xl font-bold">Portfolio Admin</h1><p className="text-xs text-slate-400">Signed in as {email}</p></div><div className="flex flex-wrap items-center gap-3"><a href="/" target="_blank" rel="noreferrer" className={btn}>View Website ↗</a><a href="/admin" className={btn}>Contact Messages</a><button onClick={save} disabled={pending} className="rounded-xl bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 disabled:opacity-50">{pending?'Working…':'Save changes'}</button><form action={signOut}><button className={btn}>Sign out</button></form></div></div></header>
 <div className="mx-auto max-w-7xl grid gap-6 px-5 py-7 lg:grid-cols-[230px_minmax(0,1fr)]"><nav className="flex flex-wrap content-start gap-2 lg:flex-col">{TABS.map(t=><button key={t} onClick={()=>setTab(t)} className={`rounded-xl px-4 py-3 text-left text-sm transition ${tab===t?'bg-cyan-400 text-[#071426] font-semibold':'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10'}`}>{t}</button>)}<a href="/admin" className="rounded-xl border border-cyan-400/30 bg-cyan-300/10 px-4 py-3 text-sm font-semibold text-cyan-200 hover:bg-cyan-300/20">✉ Contact Messages ↗</a></nav><main className="min-w-0 rounded-2xl border border-white/10 bg-white/[.035] p-5 md:p-8"><h2 className="mb-6 text-2xl font-semibold">{tab}</h2>
 {tab==='Hero & Animation'&&<div className="space-y-6">
  <div className="grid gap-5 md:grid-cols-2">
    {field('name','Display name')}
    <Field label="Profile photo URL (or upload under Media)"><input className={inp} value={d.photoUrl} onChange={e=>patch({photoUrl:e.target.value})}/></Field>
    {field('role','Main job title')}
    {field('prefix','Connecting word (building)')}
    {field('subtitle','Hero subtitle')}
    {field('availability','Availability badge')}
  </div>

  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-300/5 p-5">
    <h3 className="mb-2 text-lg font-semibold">Direct word morph sequence</h3>
    <p className="mb-4 text-sm text-slate-400">This controls only the big Web Apps / Python / Laravel area. The animation keeps character slots in place and morphs letters left-to-right, based on your uploaded Loki typography engine.</p>
    <div className="space-y-2">{d.heroWords.map((w,i)=><div key={i} className="flex gap-2"><input className={inp} value={w} onChange={e=>patch({heroWords:d.heroWords.map((v,j)=>j===i?e.target.value:v)})}/><button className={btn} onClick={()=>{if(i===0)return;const a=[...d.heroWords];[a[i-1],a[i]]=[a[i],a[i-1]];patch({heroWords:a})}}>↑</button><button className={btn} onClick={()=>patch({heroWords:d.heroWords.filter((_,j)=>j!==i)})}>✕</button></div>)}</div>
    <button className={`${btn} mt-3`} onClick={()=>patch({heroWords:[...d.heroWords,'New Word']})}>+ Add word</button>
  </div>

  <div className="rounded-2xl border border-violet-400/20 bg-violet-300/5 p-5">
    <h3 className="mb-2 text-lg font-semibold">Meteor word labels</h3>
    <p className="mb-4 text-sm text-slate-400">Every visible meteor uses one word from this list. Add as many technology labels as you want; the list repeats automatically across the meteor field.</p>
    <div className="grid gap-2 md:grid-cols-2">
      {d.meteorWords.map((word,i)=><div key={i} className="flex gap-2">
        <input className={inp} value={word} onChange={e=>patch({meteorWords:d.meteorWords.map((v,j)=>j===i?e.target.value:v)})}/>
        <button className={btn} onClick={()=>patch({meteorWords:d.meteorWords.filter((_,j)=>j!==i)})}>✕</button>
      </div>)}
    </div>
    <button className={`${btn} mt-3`} onClick={()=>patch({meteorWords:[...d.meteorWords,'New Tech']})}>+ Add meteor word</button>
  </div>

  <div className="grid gap-4 md:grid-cols-2">
    <label className="flex items-center gap-3"><input type="checkbox" checked={d.animation.enabled} onChange={e=>patch({animation:{...d.animation,enabled:e.target.checked}})}/> Enable hero morph effect</label>
    <label className="flex items-center gap-3"><input type="checkbox" checked={d.animation.heroAutoFit} onChange={e=>patch({animation:{...d.animation,heroAutoFit:e.target.checked}})}/> Auto-fit long hero words inside the text column</label>
    <label className="flex items-center gap-3"><input type="checkbox" checked={d.animation.wordCycle} onChange={e=>patch({animation:{...d.animation,wordCycle:e.target.checked}})}/> Auto-change words</label>
    <label className="flex items-center gap-3"><input type="checkbox" checked={d.animation.fontLoop} onChange={e=>patch({animation:{...d.animation,fontLoop:e.target.checked}})}/> Shuffle font styles while morphing</label>
    <label className="flex items-center gap-3"><input type="checkbox" checked={d.animation.letterMorph} onChange={e=>patch({animation:{...d.animation,letterMorph:e.target.checked}})}/> Lock letters left-to-right</label>
    <label className="flex items-center gap-3"><input type="checkbox" checked={d.animation.nameEnabled} onChange={e=>patch({animation:{...d.animation,nameEnabled:e.target.checked}})}/> Enable separate Kanil Kanchana animation</label>
    <label className="flex items-center gap-3"><input type="checkbox" checked={d.animation.nameFontLoop} onChange={e=>patch({animation:{...d.animation,nameFontLoop:e.target.checked}})}/> Keep name letters changing fonts</label>

    <SpeedControl label="Morph duration" hint="How long the current word takes to become the next word" value={d.animation.duration} min={2} max={12} step={0.5} unit="s" onChange={v=>patch({animation:{...d.animation,duration:v}})} />
    <SpeedControl label="Resolved word hold time" hint="How long the completed word stays readable before the next morph" value={d.animation.holdDuration} min={0.5} max={8} step={0.5} unit="s" onChange={v=>patch({animation:{...d.animation,holdDuration:v}})} />
    <SpeedControl label="Shuffle rhythm" hint="Font shuffle speed during each letter morph" value={d.animation.rhythm} min={90} max={500} step={10} unit="ms" onChange={v=>patch({animation:{...d.animation,rhythm:v}})} />
    <SpeedControl label="Hero font weight" hint="Thickness of the large morphing word" value={d.animation.fontWeight} min={200} max={800} step={50} unit="" minLabel="Thin" maxLabel="Bold" onChange={v=>patch({animation:{...d.animation,fontWeight:v}})} />
    <SpeedControl label="Name font change speed" hint="Independent speed for Kanil Kanchana below your photo" value={d.animation.nameRhythm} min={260} max={1800} step={20} unit="ms" onChange={v=>patch({animation:{...d.animation,nameRhythm:v}})} />
  </div>
  <p className="text-sm text-slate-400">The name animation is separate. Turning hero morph OFF leaves the first word as plain text. Your role, “building” line and subtitle keep their original style.</p>
</div>}
 {tab==='Skills'&&<><p className="mb-5 text-slate-400">Add, rename, or remove each skill displayed in the scrolling skill strip.</p><div className="grid gap-3 md:grid-cols-2">{d.skills.map((s,i)=><div key={i} className="flex gap-2"><input className={inp} value={s} onChange={e=>patch({skills:d.skills.map((v,j)=>i===j?e.target.value:v)})}/><button className={btn} onClick={()=>patch({skills:d.skills.filter((_,j)=>j!==i)})}>✕</button></div>)}</div><button className={`${btn} mt-5`} onClick={()=>patch({skills:[...d.skills,'New Skill']})}>+ Add Skill</button></>}
 {tab==='Projects'&&<><p className="mb-5 text-sm text-slate-400">Edit public projects and links. New projects appear in the existing showcase.</p><div className="space-y-5">{d.projects.map((project,i)=><section key={project.id} className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="mb-4 flex justify-between"><h3 className="font-semibold">Project {i+1}</h3><button className="text-rose-300" onClick={()=>patch({projects:d.projects.filter((_,j)=>j!==i)})}>Remove</button></div><div className="grid gap-3 md:grid-cols-2">{(['title','category','href','image'] as const).map(k=><Field key={k} label={k}><input className={inp} value={project[k]} onChange={e=>patch({projects:d.projects.map((p,j)=>j===i?{...p,[k]:e.target.value}:p)})}/></Field>)}</div><Field label="Description"><textarea rows={3} className={`${inp} mt-3`} value={project.description} onChange={e=>patch({projects:d.projects.map((p,j)=>j===i?{...p,description:e.target.value}:p)})}/></Field><Field label="Details (one per line)"><textarea rows={3} className={`${inp} mt-3`} value={project.subDescription.join('\n')} onChange={e=>patch({projects:d.projects.map((p,j)=>j===i?{...p,subDescription:e.target.value.split('\n')}:p)})}/></Field></section>)}</div><button className={`${btn} mt-5`} onClick={()=>patch({projects:[...d.projects,{id:Date.now(),title:'New Project',category:'Web Development',description:'',subDescription:[],href:'',image:'',logo:'',accent:'from-aqua/30 to-royal/10',tags:[]}]})}>+ Add Project</button></>}
 {tab==='Services'&&<><div className="space-y-4">{d.services.map((s,i)=><section key={s.id} className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex justify-between"><b>Specialty {i+1}</b><button className="text-rose-300" onClick={()=>patch({services:d.services.filter((_,j)=>j!==i)})}>Remove</button></div>{(['title','description','icon'] as const).map(k=><Field key={k} label={k}><input className={inp} value={s[k]} onChange={e=>patch({services:d.services.map((v,j)=>j===i?{...v,[k]:e.target.value}:v)})}/></Field>)}<Field label="Bullets (one per line)"><textarea className={inp} value={s.bullets.join('\n')} onChange={e=>patch({services:d.services.map((v,j)=>j===i?{...v,bullets:e.target.value.split('\n')}:v)})}/></Field></section>)}</div><button className={`${btn} mt-5`} onClick={()=>patch({services:[...d.services,{id:Date.now(),title:'New Specialty',description:'',icon:'/assets/logos/javascript.svg',bullets:[]}]})}>+ Add Specialty</button></>}
 {tab==='Experience & Education'&&<><p className="mb-5 text-slate-400">Edit your education and experience timeline.</p><div className="space-y-4">{d.experiences.map((e,i)=><section key={i} className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex justify-between"><h3>Timeline entry {i+1}</h3><button className="text-rose-300" onClick={()=>patch({experiences:d.experiences.filter((_,j)=>j!==i)})}>Remove</button></div><div className="grid gap-3 md:grid-cols-2">{(['title','job','date'] as const).map(k=><Field key={k} label={k}><input className={inp} value={e[k]} onChange={ev=>patch({experiences:d.experiences.map((v,j)=>j===i?{...v,[k]:ev.target.value}:v)})}/></Field>)}</div><Field label="Description (one per line)"><textarea rows={3} className={inp} value={e.contents.join('\n')} onChange={ev=>patch({experiences:d.experiences.map((v,j)=>j===i?{...v,contents:ev.target.value.split('\n')}:v)})}/></Field></section>)}</div><button className={`${btn} mt-5`} onClick={()=>patch({experiences:[...d.experiences,{title:'New qualification',job:'',date:'',contents:[]}]})}>+ Add timeline entry</button></>}
 {tab==='Certificates'&&<><p className="mb-5 text-slate-400">Certificates display in a new public section. Add a credential link or upload a JPG/PNG/PDF under Media.</p><div className="space-y-4">{d.certificates.map((c,i)=><section key={c.id} className="rounded-2xl border border-white/10 bg-white/5 p-5"><div className="flex justify-between"><b>Certificate {i+1}</b><button className="text-rose-300" onClick={()=>patch({certificates:d.certificates.filter((_,j)=>j!==i)})}>Remove</button></div><div className="grid gap-3 md:grid-cols-2">{(['title','issuer','year','url'] as const).map(k=><Field key={k} label={k}><input className={inp} value={c[k]} onChange={e=>patch({certificates:d.certificates.map((v,j)=>j===i?{...v,[k]:e.target.value}:v)})}/></Field>)}</div><Field label="Description"><textarea className={inp} value={c.description} onChange={e=>patch({certificates:d.certificates.map((v,j)=>j===i?{...v,description:e.target.value}:v)})}/></Field><div className="mt-4 grid gap-4 md:grid-cols-2"><Field label="Certificate photo URL"><input className={inp} value={c.imageUrl||''} placeholder="Upload a photo or paste an image URL" onChange={e=>patch({certificates:d.certificates.map((v,j)=>j===i?{...v,imageUrl:e.target.value}:v)})}/></Field><Field label="Upload photo (JPG, PNG, WebP · max 5 MB)"><input className="rounded-lg border border-dashed border-cyan-400/30 p-3 text-xs" type="file" accept="image/jpeg,image/png,image/webp" onChange={e=>uploadCertificate(e.target.files?.[0]||null,c.id)}/></Field></div>{c.imageUrl&&<img src={c.imageUrl} alt={`Preview of ${c.title}`} className="mt-4 h-44 w-full rounded-xl border border-white/10 bg-black/20 object-contain" />}</section>)}</div><button className={`${btn} mt-5`} onClick={()=>patch({certificates:[...d.certificates,{id:freshId(),title:'New Certificate',issuer:'',year:'',url:'',imageUrl:'',description:''}]})}>+ Add Certificate</button></>}
 {tab==='About & Contact'&&<div className="space-y-6">
  <Field label="About biography"><textarea rows={5} className={inp} value={d.about} onChange={e=>patch({about:e.target.value})}/></Field>
  <Field label="Legacy public email (kept for compatibility)"><input className={inp} type="email" value={d.email} onChange={e=>patch({email:e.target.value})}/></Field>

  <div className="rounded-2xl border border-cyan-400/20 bg-cyan-300/5 p-5">
    <div className="mb-4"><h3 className="text-lg font-semibold">Contact Me icons & details</h3><p className="mt-1 text-sm text-slate-400">These appear in the public Contact section. Add Email, Phone, GitHub, LinkedIn, WhatsApp, Website or any other link. Disable an item to hide it without deleting it.</p></div>
    <div className="space-y-4">{d.contactMethods.map((m,i)=><section key={m.id} className="rounded-xl border border-white/10 bg-slate-950/40 p-4">
      <div className="mb-3 flex items-center justify-between gap-3"><label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={m.enabled} onChange={e=>patch({contactMethods:d.contactMethods.map((v,j)=>j===i?{...v,enabled:e.target.checked}:v)})}/> Show on website</label><button className="text-sm text-rose-300" onClick={()=>patch({contactMethods:d.contactMethods.filter((_,j)=>j!==i)})}>Remove</button></div>
      <div className="grid gap-3 md:grid-cols-2">
        <Field label="Icon type"><select className={inp} value={m.type} onChange={e=>patch({contactMethods:d.contactMethods.map((v,j)=>j===i?{...v,type:e.target.value as CmsData['contactMethods'][number]['type']}:v)})}>{['email','phone','github','linkedin','whatsapp','website','other'].map(type=><option key={type} value={type}>{type}</option>)}</select></Field>
        <Field label="Label"><input className={inp} value={m.label} onChange={e=>patch({contactMethods:d.contactMethods.map((v,j)=>j===i?{...v,label:e.target.value}:v)})}/></Field>
        <Field label="Displayed value"><input className={inp} placeholder="Email, phone number or username" value={m.value} onChange={e=>patch({contactMethods:d.contactMethods.map((v,j)=>j===i?{...v,value:e.target.value}:v)})}/></Field>
        <Field label="Link / URL (optional for email & phone)"><input className={inp} placeholder="https://... or leave blank for email/phone" value={m.href} onChange={e=>patch({contactMethods:d.contactMethods.map((v,j)=>j===i?{...v,href:e.target.value}:v)})}/></Field>
      </div>
    </section>)}</div>
    <button className={`${btn} mt-4`} onClick={()=>patch({contactMethods:[...d.contactMethods,{id:freshId(),type:'other',label:'New contact',value:'',href:'',enabled:true}]})}>+ Add contact item</button>
  </div>

  <div className="rounded-2xl border border-white/10 bg-white/[.03] p-5"><h3 className="mb-3 text-lg font-semibold">Footer / other links</h3>{d.socials.map((s,i)=><div key={i} className="mb-2 grid gap-2 md:grid-cols-[1fr_2fr_auto]"><input className={inp} value={s.label} onChange={e=>patch({socials:d.socials.map((v,j)=>i===j?{...v,label:e.target.value}:v)})}/><input className={inp} value={s.url} onChange={e=>patch({socials:d.socials.map((v,j)=>i===j?{...v,url:e.target.value}:v)})}/><button className={btn} onClick={()=>patch({socials:d.socials.filter((_,j)=>j!==i)})}>Remove</button></div>)}<button className={btn} onClick={()=>patch({socials:[...d.socials,{label:'New link',url:'https://'}]})}>+ Add link</button></div>
</div>}
 {tab==='Media'&&<div className="space-y-5"><p className="text-slate-300">Upload an image or certificate PDF (up to 5 MB). The Supabase <code>portfolio-media</code> bucket must be configured first. Your current portrait stays untouched.</p><input type="file" accept="image/png,image/jpeg,image/webp,application/pdf" onChange={e=>upload(e.target.files?.[0]||null)} className="block w-full rounded-xl border border-dashed border-cyan-300/30 p-6"/>{asset&&<div className="break-all rounded-xl bg-cyan-300/10 p-4"><p className="mb-2 text-sm">Uploaded URL — paste into a project image or certificate URL field:</p><input className={inp} value={asset} readOnly onFocus={e=>e.target.select()}/></div>}</div>}
 <div role="status" aria-live="polite" className="mt-8 text-sm text-cyan-200">{status||'Changes are only published after clicking Save changes.'}</div>
 <div className="mt-6 flex gap-3"><button disabled={pending} onClick={save} className="rounded-xl bg-cyan-400 px-6 py-3 font-semibold text-slate-950">Save changes</button><button className={btn} onClick={()=>{if(confirm('Discard unsaved edits?'))setD(initial)}}>Discard edits</button></div>
 </main></div></div>;
};

function SpeedControl({label,hint,value,min,max,step,unit,onChange,minLabel="Fast",maxLabel="Slow"}:{label:string;hint:string;value:number;min:number;max:number;step:number;unit:string;onChange:(v:number)=>void;minLabel?:string;maxLabel?:string}) {
 const update=(v:number)=>{if(Number.isFinite(v))onChange(Math.min(max,Math.max(min,Math.round(v/step)*step)));};
 return <div className="rounded-xl border border-white/10 bg-slate-950/40 p-4 space-y-3">
  <div><label className="block font-semibold text-sm text-slate-100">{label}</label><p className="text-xs text-slate-400 mt-1">{hint}</p></div>
  <div className="flex items-center gap-3"><input aria-label={label} className="min-w-0 flex-1 accent-cyan-400" type="range" min={min} max={max} step={step} value={value} onChange={e=>update(Number(e.target.value))}/><div className="flex items-center gap-1"><input aria-label={`${label} value`} className="w-16 rounded-md border border-white/20 bg-slate-900 px-2 py-1.5 text-right text-white" type="number" min={min} max={max} step={step} value={value} onChange={e=>{if(e.target.value!=='' )update(Number(e.target.value));}}/><span className="text-xs text-slate-300">{unit}</span></div></div>
  <div className="flex justify-between text-[11px] text-slate-400"><span>{minLabel} ({min}{unit})</span><span>{maxLabel} ({max}{unit})</span></div>
 </div>;
}
