import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);

export const locales = routing.locales;
export type Locale = (typeof locales)[number];
export const defaultLocale = routing.defaultLocale;
