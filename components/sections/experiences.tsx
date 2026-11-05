"use client";

import { type FC } from "react";
import {useCms} from "@/components/portfolio/cms-context";
import { Timeline } from "@/components/portfolio/timeline";
import { EXPERIENCES } from "@/constants/portfolio-constants";

export const Experiences: FC = () => { const experiences=useCms().experiences; return (
  <div className="w-full">
    <Timeline data={experiences} />
  </div>
); };
