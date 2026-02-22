import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "es"],
  defaultLocale: "es",
  pathnames: {
    "/": "/",
    "/web": "/web",
    "/web/about": {
      es: "/web/nosotros",
    },
    "/web/services": {
      es: "/web/servicios",
    },
    "/web/contact": {
      es: "/web/contacto",
    },
    "/about": {
      es: "/nosotros",
    },
    "/contact": {
      es: "/contacto",
    },
    "/auth/login": {
      es: "/auth/login",
    },
    "/auth/register": {
      es: "/auth/register",
    },
    "/app": "/app",
    "/app/dashboard": {
      es: "/app/panel",
    },
    "/cms": "/cms",
    "/cms/dashboard": {
      es: "/cms/panel",
    },
  },
});
