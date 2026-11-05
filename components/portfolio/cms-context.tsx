"use client";
import { createContext, useContext, type ReactNode } from 'react';
import {DEFAULT_CMS, type CmsData} from '@/lib/portfolio-cms';
const CmsContext=createContext<CmsData>(DEFAULT_CMS);
export const CmsProvider=({data,children}:{data:CmsData;children:ReactNode})=><CmsContext.Provider value={data}>{children}</CmsContext.Provider>;
export const useCms=()=>useContext(CmsContext);
