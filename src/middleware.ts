import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./packages/internationalization/routing";

// Middleware para internacionalización
const intlMiddleware = createIntlMiddleware(routing);

// === CONFIGURACIÓN DE MÓDULOS HABILITADOS ===
// Cambia estos valores para habilitar o deshabilitar módulos en este despliegue
const ENABLED_MODULES = {
  APP: true, // Cambia a `false` para deshabilitar el módulo APP
  CMS: false, // Cambia a `false` para deshabilitar el módulo CMS
};

interface RoleRoutes {
  [key: string]: string[];
}

const ROLE_ROUTES: RoleRoutes = {
  SUPER_ADMIN: ["/app/dashboard"],
  ADMIN: [
    "/app/accountant/dashboard",
    "/app/accountant/human-resources",
    "/app/accountant/human-resources/new",
    "/app/accountant/clients",
    "/app/accountant/clients/new",
    "/app/accountant/rcv",
    "/app/accountant/rh",
    "/app/accountant/iusc",
    "/app/accountant/ppm",
    "/app/accountant/formularios-mensuales",
    "/app/accountant/retencion-iva",
    "/app/accountant/permissions",
    "/app/accountant/settings",
  ],
  EMPRESA: [
    "/app/accountant/dashboard",
    "/app/accountant/human-resources",
    "/app/accountant/human-resources/new",
    "/app/accountant/clients",
    "/app/accountant/clients/new",
    "/app/accountant/rcv",
    "/app/accountant/rh",
    "/app/accountant/iusc",
    "/app/accountant/ppm",
    "/app/accountant/formularios-mensuales",
    "/app/accountant/retencion-iva",
    "/app/accountant/permissions",
    "/app/accountant/settings",
  ],
  ACCOUNTANT: [
    "/app/accountant/dashboard",
    "/app/accountant/human-resources",
    "/app/accountant/human-resources/new",
    "/app/accountant/clients",
    "/app/accountant/clients/new",
    "/app/accountant/rcv",
    "/app/accountant/rh",
    "/app/accountant/iusc",
    "/app/accountant/ppm",
    "/app/accountant/formularios-mensuales",
    "/app/accountant/retencion-iva",
    "/app/accountant/permissions",
    "/app/accountant/settings",
  ],
  ENCARGADO: [
    "/app/accountant/dashboard",
    "/app/accountant/human-resources",
    "/app/accountant/human-resources/new",
    "/app/accountant/clients",
    "/app/accountant/clients/new",
    "/app/accountant/rcv",
    "/app/accountant/rh",
    "/app/accountant/iusc",
    "/app/accountant/ppm",
    "/app/accountant/formularios-mensuales",
    "/app/accountant/retencion-iva",
    "/app/accountant/permissions",
    "/app/accountant/settings",
  ],
  ADMINISTRATIVO: [
    "/app/accountant/dashboard",
    "/app/accountant/human-resources",
    "/app/accountant/human-resources/new",
    "/app/accountant/clients",
    "/app/accountant/clients/new",
    "/app/accountant/rcv",
    "/app/accountant/rh",
    "/app/accountant/iusc",
    "/app/accountant/ppm",
    "/app/accountant/formularios-mensuales",
    "/app/accountant/retencion-iva",
    "/app/accountant/permissions",
    "/app/accountant/settings",
  ],
  ANALISTA: [
    "/app/accountant/dashboard",
    "/app/accountant/human-resources",
    "/app/accountant/human-resources/new",
    "/app/accountant/clients",
    "/app/accountant/clients/new",
    "/app/accountant/rcv",
    "/app/accountant/rh",
    "/app/accountant/iusc",
    "/app/accountant/ppm",
    "/app/accountant/formularios-mensuales",
    "/app/accountant/retencion-iva",
    "/app/accountant/permissions",
    "/app/accountant/settings",
  ],
  EMPLOYEE: [
    "/app/accountant/dashboard",
    "/app/accountant/human-resources",
    "/app/accountant/human-resources/new",
    "/app/accountant/clients",
    "/app/accountant/clients/new",
    "/app/accountant/rcv",
    "/app/accountant/rh",
    "/app/accountant/iusc",
    "/app/accountant/ppm",
    "/app/accountant/formularios-mensuales",
    "/app/accountant/retencion-iva",
    "/app/accountant/permissions",
    "/app/accountant/settings",
  ],
  USER: [
    "/app/client/dashboard",
    "/app/client/rcv",
    "/app/client/rh",
    "/app/client/iusc",
    "/app/client/ppm",
    "/app/client/retencion-iva",
    "/app/client/change-password",
  ],
};

const PUBLIC_ROUTES = [
  "/web",
  "/auth/login",
  "/auth/access-denied",
  "/auth/register",
  "/pricing",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/me",
];

const isProtectedRoute = (pathname: string) => {
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.includes(route));
  if (isPublic) return false;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return false;
  }

  const protectedPaths = [
    "/app/",
    "/dashboard",
    "/accountant",
    "/client",
    "/admin/",
  ];
  return protectedPaths.some((path) => pathname.includes(path));
};

const isModuleEnabled = (pathname: string) => {
  if (pathname.startsWith("/app") || pathname.includes("/app/")) {
    return ENABLED_MODULES.APP;
  }
  if (pathname.startsWith("/cms") || pathname.includes("/cms/")) {
    return ENABLED_MODULES.CMS;
  }
  return true; // Las demás rutas siempre están habilitadas
};

const isAuthenticated = (request: NextRequest): boolean => {
  const authToken = request.cookies.get("sopy-auth-token");
  const userCookie = request.cookies.get("sopy-user");

  const cookieHasToken = !!authToken?.value;
  const cookieHasUser = !!userCookie?.value;

  console.log("Cookies:", { authToken: cookieHasToken, user: cookieHasUser });
  console.log("Verificando autenticación:");
  console.log("- ¿Tiene token de autenticación?", cookieHasToken);
  console.log("- ¿Tiene cookie de usuario?", cookieHasUser);

  const isAuth = cookieHasToken;
  console.log("¿Usuario autenticado?", isAuth);

  return isAuth;
};

const hasRequiredRole = (request: NextRequest, path: string): boolean => {
  try {
    console.log("\n=== Verificando permisos de acceso ===");
    console.log("Ruta solicitada:", path);

    const userCookie = request.cookies.get("sopy-user");
    if (!userCookie?.value) {
      console.log(
        "No se encontró cookie de usuario, pero podría tener token válido"
      );
      const authToken = request.cookies.get("sopy-auth-token");
      if (authToken?.value) {
        console.log(
          "Tiene token de autenticación - permitiendo acceso temporal"
        );
        return true;
      }
      return false;
    }

    const userData = JSON.parse(userCookie.value);
    const userRole = userData.role;
    console.log("Rol del usuario:", userRole);
    console.log("Datos de usuario completos:", userData);

    if (userData.permissions) {
      console.log(
        "Permisos del usuario:",
        userData.permissions
          .map((p: any) => `${p.permission}:${p.resource}`)
          .join(", ")
      );
    }

    if (userRole === "SUPER_ADMIN") {
      console.log("Usuario es SUPER_ADMIN - acceso total");
      return true;
    }

    const allowedRoutes =
      ROLE_ROUTES[userRole as keyof typeof ROLE_ROUTES] || [];
    console.log("Rutas permitidas para este rol:", allowedRoutes);

    const hasAccess = allowedRoutes.some((route: string) =>
      path.startsWith(route)
    );
    console.log("¿Tiene acceso a la ruta solicitada?", hasAccess);

    return hasAccess;
  } catch (error) {
    console.error("Error al verificar el rol:", error);
    return false;
  }
};

const getRedirectPathForRole = (request: NextRequest): string => {
  try {
    const userCookie = request.cookies.get("sopy-user");
    if (!userCookie?.value) {
      const authToken = request.cookies.get("sopy-auth-token");
      if (authToken?.value) {
        console.log(
          "No hay cookie de usuario pero sí hay token - redirigiendo a dashboard por defecto"
        );
        return "/app/accountant/dashboard";
      }
      return "/auth/login";
    }

    const userData = JSON.parse(userCookie.value);
    const userRole = userData.role;

    switch (userRole) {
      case "SUPER_ADMIN":
        return "/app/dashboard";
      case "ADMIN":
        return "/app/accountant/dashboard";
      case "EMPRESA":
        return "/app/accountant/dashboard";
      case "ACCOUNTANT":
        return "/app/accountant/dashboard";
      case "ENCARGADO":
        return "/app/accountant/dashboard";
      case "ADMINISTRATIVO":
        return "/app/accountant/dashboard";
      case "ANALISTA":
        return "/app/accountant/dashboard";
      case "EMPLOYEE":
        return "/app/accountant/dashboard";
      case "USER":
        return "/app/client/dashboard";
      default:
        console.log("Rol desconocido, redirigiendo a login");
        return "/auth/login";
    }
  } catch (error) {
    console.error("Error al determinar ruta de redirección:", error);
    return "/auth/login";
  }
};

const isLocaleRoot = (pathname: string) => {
  const segments = pathname.split("/").filter(Boolean);

  return (
    segments.length === 1 &&
    routing.locales.includes(segments[0] as (typeof routing.locales)[number])
  );
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  console.log("\n--- MIDDLEWARE INICIADO ---");
  console.log("URL solicitada:", request.nextUrl.pathname);
  console.log("URL completa:", request.url);
  console.log("Método:", request.method);

  if (pathname.startsWith("/api/")) {
    console.log("Ruta de API detectada, bypass del middleware");
    return NextResponse.next();
  }

  console.log("Headers:", Object.fromEntries(request.headers.entries()));
  console.log("Cookies:", {
    authToken: !!request.cookies.get("sopy-auth-token"),
    user: !!request.cookies.get("sopy-user"),
  });

  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  try {
    const userCookie = request.cookies.get("sopy-user");
    if (userCookie?.value) {
      const userData = JSON.parse(userCookie.value);
      console.log(
        "Usuario autenticado:",
        userData.email,
        "- Rol:",
        userData.role
      );
    }
  } catch (e) {
    console.error("Error al mostrar datos de usuario:", e);
  }

  let userData: any = null;
  const userCookie = request.cookies.get("sopy-user");
  if (userCookie?.value) {
    try {
      userData = JSON.parse(userCookie.value);
    } catch (e) { }
  }

  if (userData && userData.accessAllowed === false) {
    if (!pathname.includes("/auth/access-denied")) {
      const locale = pathname.split("/")[1] || "es";
      const redirectUrl = new URL(`/${locale}/auth/access-denied`, request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  if (pathname === "/" || isLocaleRoot(pathname)) {
    const locale =
      pathname === "/" ? routing.defaultLocale : pathname.split("/")[1];

    const redirectUrl = new URL(`/${locale}/web`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  const segments = pathname.split("/");
  const locale = segments[1];
  const pathWithoutLocale = "/" + segments.slice(2).join("/");
  console.log("Ruta sin locale:", pathWithoutLocale);
  console.log("Segmentos de ruta:", segments);

  if (!isModuleEnabled(pathWithoutLocale)) {
    const redirectUrl = new URL(`/${locale}/web`, request.url);
    redirectUrl.searchParams.set("error", "module_not_available");
    return NextResponse.redirect(redirectUrl);
  }

  const intlResponse = await intlMiddleware(request);

  const requiresAuth = isProtectedRoute(pathWithoutLocale);
  console.log("¿La ruta requiere autenticación?", requiresAuth);

  const isUserAuthenticated = isAuthenticated(request);
  console.log("¿Usuario autenticado?", isUserAuthenticated);

  if (requiresAuth) {
    console.log("La ruta requiere autenticación:", pathWithoutLocale);

    if (!isUserAuthenticated) {
      console.log("Usuario no autenticado, redirigiendo a login...");

      const redirectUrl = new URL(`/${locale}/auth/login`, request.url);
      redirectUrl.searchParams.set("from", pathWithoutLocale);

      return NextResponse.redirect(redirectUrl);
    }

    const hasAccess = hasRequiredRole(request, pathWithoutLocale);
    console.log("¿Tiene el usuario los permisos necesarios?", hasAccess);

    if (!hasAccess) {
      console.log("Usuario sin permisos suficientes para acceder a esta ruta");

      const redirectPath = getRedirectPathForRole(request);
      console.log("Redirigiendo a:", redirectPath);

      const redirectUrl = new URL(`/${locale}${redirectPath}`, request.url);

      return NextResponse.redirect(redirectUrl);
    }

    console.log("Usuario autenticado con rol válido, permitiendo acceso");
    return intlResponse;
  } else {
    console.log("Ruta pública, permitiendo acceso:", pathname);
    return intlResponse;
  }
}

export const config = {
  // - Rutas de API (/api/*)
  // - Archivos estáticos (con punto)
  // - Rutas internas de Next.js (_next)
  matcher: ["/((?!api/|_next/|.*\\..*).*)", "/", "/:locale(es|en)"],
};
