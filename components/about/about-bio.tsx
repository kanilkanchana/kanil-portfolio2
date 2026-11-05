"use client";
import { useRef, type FC } from "react";
import { motion, useInView } from "motion/react";
import { fadeInUp } from "@/animations/scroll-animations";
import {useCms} from "@/components/portfolio/cms-context";
import { HERO_LOCATION, HERO_NAME } from "@/constants/hero-constants";
export const AboutBio:FC = () => {
 const cms=useCms(); const ref=useRef<HTMLDivElement>(null); const inView=useInView(ref,{once:true,margin:"-100px"});
 return <motion.div ref={ref} initial="hidden" animate={inView?"visible":"hidden"} variants={fadeInUp} transition={{duration:0.7}} className="glass gradient-border p-8 md:p-10 lg:col-span-7">
  <p className="mb-3 text-sm uppercase tracking-[0.25em] text-neutral-400">Who I Am</p>
  <h3 className="mb-5 text-2xl font-bold md:text-3xl">{cms.name} · {HERO_LOCATION}</h3>
  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-7">
   <div className="shrink-0 rounded-3xl overflow-hidden border border-aqua/35 bg-[#0a1427] w-[220px] h-[260px] sm:w-[190px] sm:h-[230px] lg:w-[220px] lg:h-[260px] shadow-xl shadow-aqua/10">
    <img src={cms.photoUrl || "/profile/kanil-profile.png"} alt="Kanil Kanchana" className="block w-full h-full object-contain object-center" width={220} height={260} />
   </div>
   <div className="min-w-0"><p className="text-base leading-relaxed text-neutral-300 md:text-lg">{cms.about}</p>
   <p className="mt-4 leading-relaxed text-neutral-400">I build and explore projects with <span className="text-white">Laravel, PHP, SQLite and Python</span>. My recent work includes a POS and repair management application and palm-line image processing in JupyterLab.</p>
   <p className="mt-4 text-aqua font-medium">Currently looking for a web development / backend / AI internship.</p></div>
  </div>
  <div className="mt-8 flex flex-wrap gap-3"><a href="#work" className="btn-primary">Explore projects →</a><a href="#contact" className="btn-ghost">Get in touch</a></div>
 </motion.div>;
};
