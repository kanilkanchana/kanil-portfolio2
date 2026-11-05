"use client";

import { type Project } from "@/types/portfolio-types";
import { type FC } from "react";
import { MY_PROJECTS } from "@/constants/portfolio-constants";
import { useInViewOnce } from "@/hooks/use-in-view-once";
import {
  type ProjectListProps,
  type ProjectPanelProps,
} from "@/types/project-types";
import { ProjectPanel } from "./project-panel";

const LazyPanel: FC<Omit<ProjectPanelProps, "showPreview">> = (props) => {
  const [ref, inView] = useInViewOnce<HTMLDivElement>();
  return (
    <div ref={ref}>
      <ProjectPanel {...props} showPreview={inView} />
    </div>
  );
};

export const VerticalProjects: FC<ProjectListProps & { projects: Project[] }> = ({ onOpen, projects }) => (
  <div className="mt-12 space-y-20">
    {projects.map((project, index) => (
      <LazyPanel
        key={project.id}
        project={project}
        index={index}
        total={projects.length}
        onOpen={() => onOpen(project)}
      />
    ))}
  </div>
);
