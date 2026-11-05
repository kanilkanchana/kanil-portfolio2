"use client";

import { useState, type FC } from "react";
import { useMediaQuery } from "react-responsive";
import { ProjectDetails } from "@/components/portfolio/project-details";
import { PinnedShowcase } from "@/components/projects/pinned-showcase";
import { ProjectsHeader } from "@/components/projects/projects-header";
import { VerticalProjects } from "@/components/projects/vertical-projects";
import { useCms } from "@/components/portfolio/cms-context";
import { MY_PROJECTS } from "@/constants/portfolio-constants";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { type Project } from "@/types/portfolio-types";

export const Projects: FC = () => {
  const projects=useCms().projects;
  const isMobile = useMediaQuery({ maxWidth: 1023 });
  const mounted = useHasMounted();
  const [active, setActive] = useState<Project | null>(null);

  const pinned = mounted && !isMobile;

  return (
    <section id="work" className="relative">
      <ProjectsHeader total={projects.length} />

      {pinned ? (
        <PinnedShowcase projects={projects} onOpen={setActive} />
      ) : (
        <div className="c-space">
          <VerticalProjects projects={projects} onOpen={setActive} />
        </div>
      )}

      {active && (
        <ProjectDetails {...active} closeModal={() => setActive(null)} />
      )}
    </section>
  );
};
