import { type Transition } from "motion/react";
import { type Project } from "@/types/portfolio-types";
export const MY_PROJECTS: Project[] = [
  { id: 1, title: "CCS — POS & Repair System", category: "Laravel · Backend / Client Project", description: "A Laravel-based system for sales, inventory, repair jobs, customer credit, serial tracking and warranty workflows.", subDescription: ["Designed around real sales and repair workflows, including jobs and customer records.","Implemented and refined purchase, payment and credit tracking features.","Working on serial-number management, inventory linkage and warranty processing.","Tech focus: Laravel, PHP and SQLite."], href: "", logo: "", image: "", accent: "from-aqua/40 to-royal/10", tags: [{id:1,name:"Laravel",path:"/assets/logos/javascript.svg"},{id:2,name:"PHP",path:"/assets/logos/javascript.svg"},{id:3,name:"SQLite",path:"/assets/logos/javascript.svg"}] },
  { id: 2, title: "Palm-Line Detection", category: "Python · AI / Image Processing", description: "A Jupyter image-processing experiment to isolate palm regions, detect major lines and display annotated results.", subDescription: ["Exploring image-processing techniques for major palm-line detection.","Building line overlays, counting and filtering for left and right palm images.","Preparing notebook workflows for experimentation with different sample images.","Tech focus: Python, JupyterLab and image processing."], href: "", logo: "", image: "", accent: "from-royal/40 to-aqua/10", tags: [{id:1,name:"Python",path:"/assets/logos/javascript.svg"},{id:2,name:"JupyterLab",path:"/assets/logos/javascript.svg"},{id:3,name:"AI",path:"/assets/logos/javascript.svg"}] },
  { id: 3, title: "MovieStream", category: "Web Development · Personal Project", description: "A personal movie website built as part of my web development practice.", subDescription: ["Created and maintained a personal movie website.","Explored responsive interfaces and real-world web publishing.","Live website available at moviestream.my."], href: "https://moviestream.my", logo: "", image: "", accent: "from-aqua/30 to-indigo/20", tags: [{id:1,name:"Web Development",path:"/assets/logos/javascript.svg"},{id:2,name:"Website",path:"/assets/logos/react.svg"}] },
];
export const TILT_SPRING: Transition = { stiffness: 200, damping: 18 };

export const TILT_RANGE: { x: [number, number]; y: [number, number] } = {
  x: [10, -10],
  y: [-14, 14],
};

export const TRACK_SPRING: Transition = { stiffness: 60, damping: 20 };

export const PREVIEW_WINDOW = 1;
