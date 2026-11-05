"use client";

import { type FC } from "react";
import { motion } from "motion/react";
import { type ServiceCardProps } from "@/types/services-types";
import { padIndex } from "@/helpers/format-helpers";

/** Compact, non-sticky glass card: replaces the original oversized stacking cards. */
export const ServiceCard: FC<ServiceCardProps> = ({ service, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.5, delay: (index % 2) * 0.09 }}
    className="kanil-service-card group"
  >
    <div className="kanil-service-card__top">
      <span className="kanil-service-card__number">{padIndex(index + 1)} / 04</span>
      <div className="kanil-service-card__icon" aria-hidden="true">
        <img src={service.icon} alt="" width={30} height={30} loading="lazy" />
      </div>
    </div>
    <h3 className="kanil-service-card__title">{service.title}</h3>
    <p className="kanil-service-card__description">{service.description}</p>
    <ul className="kanil-service-card__features">
      {service.bullets.map((bullet) => (
        <li key={bullet}><span aria-hidden="true" className="kanil-service-card__dot" />{bullet}</li>
      ))}
    </ul>
    <a href="#contact" className="kanil-service-card__link">
      Discuss a project <span aria-hidden="true">↗</span>
    </a>
  </motion.article>
);
