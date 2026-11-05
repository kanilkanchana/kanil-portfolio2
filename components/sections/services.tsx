"use client";

import { type FC } from "react";
import { ServiceCard } from "@/components/services/service-card";
import { ServicesCtaCard } from "@/components/services/services-cta-card";
import { SectionHeader } from "@/components/ui/section-header";
import { useCms } from "@/components/portfolio/cms-context";
import { SERVICES } from "@/constants/services-constants";
import { padIndex } from "@/helpers/format-helpers";

export const Services: FC = () => { const services=useCms().services; return (
  <section id="services" className="c-space section-spacing relative">
    <SectionHeader
      className="mb-10 md:mb-14"
      eyebrow={`Specialties · ${padIndex(services.length)}`}
      title={<>What I build, <span className="text-gradient">from UI to API.</span></>}
      hint={["Explore", "Services"]}
    />
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-7">
      {services.map((service, index) => (
        <ServiceCard key={service.id} service={service} index={index} total={services.length} />
      ))}
    </div>
    <ServicesCtaCard />
  </section>
); };
