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

// Unified role names and route prefixes
const ROLE_ROUTES: RoleRoutes = {
  ADMIN: ["/admin"],
  CLIENT: ["/user"],
  USER: ["/user"],
  WAREHOUSE: ["/warehouse"],
  CARRIER: ["/carrier"],
  STORE: ["/user"],
};

// Legacy-to-unified role alias mapping
const ROLE_ALIAS: { [key: string]: keyof typeof ROLE_ROUTES } = {
  SUPER_ADMIN: "ADMIN",
  ACCOUNTANT: "ADMIN",
  ENCARGADO: "ADMIN",
  ADMINISTRATIVO: "ADMIN",
  ANALISTA: "ADMIN",
  EMPRESA: "CLIENT",
  EMPLOYEE: "USER",
  ADMIN: "ADMIN",
  CLIENT: "CLIENT",
  USER: "USER",
  WAREHOUSE: "WAREHOUSE",
  CARRIER: "CARRIER",
  STORE: "STORE",
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
    "/admin",
    "/user",
    "/carrier",
    "/warehouse",
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

// Cookie names (server-side). Use env vars (AUTH_COOKIE_NAME, USER_COOKIE_NAME) to avoid hardcoded names.
const AUTH_COOKIE_NAME = process.env.AUTH_COOKIE_NAME || "sopy-auth-token";
const USER_COOKIE_NAME = process.env.USER_COOKIE_NAME || "sopy-user";

const isAuthenticated = (request: NextRequest): boolean => {
  const authToken = request.cookies.get(AUTH_COOKIE_NAME);
  const userCookie = request.cookies.get(USER_COOKIE_NAME);

  const cookieHasToken = !!authToken?.value;
  const cookieHasUser = !!userCookie?.value;

  /* console.log("Cookies:", { authToken: cookieHasToken, user: cookieHasUser });
  console.log("Verificando autenticación:");
  console.log("- ¿Tiene token de autenticación?", cookieHasToken);
  console.log("- ¿Tiene cookie de usuario?", cookieHasUser); */

  const isAuth = cookieHasToken;
/*   console.log("¿Usuario autenticado?", isAuth);
 */
  return isAuth;
};

const hasRequiredRole = (request: NextRequest, path: string): boolean => {
  try {
    console.log("\n=== Verificando permisos de acceso ===");
    console.log("Ruta solicitada:", path);

  const userCookie = request.cookies.get(USER_COOKIE_NAME);
    if (!userCookie?.value) {
      console.log(
        "No se encontró cookie de usuario, pero podría tener token válido"
      );
  const authToken = request.cookies.get(AUTH_COOKIE_NAME);
      if (authToken?.value) {
        console.log(
          "Tiene token de autenticación - permitiendo acceso temporal"
        );
        return true;
      }
      return false;
    }

    const userData = JSON.parse(userCookie.value);
    const rolesFromCookie: string[] = Array.isArray(userData.roles)
      ? userData.roles
      : userData.role
      ? [userData.role]
      : [];
/*     console.log("Rol del usuario:", userRole);
    console.log("Datos de usuario completos:", userData);
 */
    if (userData.permissions) {
     /*  console.log(
        "Permisos del usuario:",
        userData.permissions
          .map((p: any) => `${p.permission}:${p.resource}`)
          .join(", ")
      ); */
    }

    const normalizedRoles = rolesFromCookie
      .map((r: string) => ROLE_ALIAS[r] || (r as keyof typeof ROLE_ROUTES))
      .filter(Boolean) as (keyof typeof ROLE_ROUTES)[];
    const allowedRoutes = normalizedRoles.flatMap(
      (nr) => ROLE_ROUTES[nr] || []
    );
/*     console.log("Rutas permitidas para este rol:", allowedRoutes);
 */
    const hasAccess = allowedRoutes.some((route: string) =>
      path.startsWith(route)
    );
/*     console.log("¿Tiene acceso a la ruta solicitada?", hasAccess);
 */
    return hasAccess;
  } catch (error) {
    console.error("Error al verificar el rol:", error);
    return false;
  }
};

const getRedirectPathForRole = (request: NextRequest): string => {
  try {
  const userCookie = request.cookies.get(USER_COOKIE_NAME);
    if (!userCookie?.value) {
  const authToken = request.cookies.get(AUTH_COOKIE_NAME);
      if (authToken?.value) {
        console.log(
          "No hay cookie de usuario pero sí hay token - redirigiendo a dashboard por defecto"
        );
        return "/app/accountant/dashboard";
      }
      return "/auth/login";
    }

    const userData = JSON.parse(userCookie.value);
    const rolesFromCookie: string[] = Array.isArray(userData.roles)
      ? userData.roles
      : userData.role
      ? [userData.role]
      : [];
    const normalizedRoles = rolesFromCookie
      .map((r: string) => ROLE_ALIAS[r] || r)
      .filter(Boolean);
    const priority = ["ADMIN", "WAREHOUSE", "CARRIER", "CLIENT", "USER", "STORE"];
    const pick = priority.find((p) => normalizedRoles.includes(p));
    switch (pick) {
      case "ADMIN":
        return "/admin";
      case "WAREHOUSE":
        return "/warehouse";
      case "CARRIER":
        return "/carrier";
      case "CLIENT":
      case "USER":
      case "STORE":
        return "/user";
      default:
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

  /* console.log("\n--- MIDDLEWARE INICIADO ---");
  console.log("URL solicitada:", request.nextUrl.pathname);
  console.log("URL completa:", request.url);
  console.log("Método:", request.method); */

  if (pathname.startsWith("/api/")) {
/*     console.log("Ruta de API detectada, bypass del middleware");
 */    return NextResponse.next();
  }

  /* console.log("Headers:", Object.fromEntries(request.headers.entries()));
  console.log("Cookies:", {
  authToken: !!request.cookies.get(AUTH_COOKIE_NAME),
  user: !!request.cookies.get(USER_COOKIE_NAME),
  }); */

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
  const userCookie = request.cookies.get(USER_COOKIE_NAME);
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
  const userCookie = request.cookies.get(USER_COOKIE_NAME);
  if (userCookie?.value) {
    try {
      userData = JSON.parse(userCookie.value);
    } catch (e) {
      console.error("Error parsing user cookie:", e);
    }
  }

  const segments = pathname.split("/");
  const locale = segments[1];
  const pathWithoutLocale = "/" + segments.slice(2).join("/");
  /* console.log("Ruta sin locale:", pathWithoutLocale);
  console.log("Segmentos de ruta:", segments); */

  if (!isModuleEnabled(pathWithoutLocale)) {
    const redirectUrl = new URL(`/${locale}/web`, request.url);
    redirectUrl.searchParams.set("error", "module_not_available");
    return NextResponse.redirect(redirectUrl);
  }

  const intlResponse = await intlMiddleware(request);

  const requiresAuth = isProtectedRoute(pathWithoutLocale);
/*   console.log("¿La ruta requiere autenticación?", requiresAuth);
 */
  const isUserAuthenticated = isAuthenticated(request);
/*   console.log("¿Usuario autenticado?", isUserAuthenticated);
 */
  if (requiresAuth) {
/*     console.log("La ruta requiere autenticación:", pathWithoutLocale);
 */
    if (!isUserAuthenticated) {
/*       console.log("Usuario no autenticado, redirigiendo a login...");
 */
      const redirectUrl = new URL(`/${locale}/auth/login`, request.url);
      redirectUrl.searchParams.set("from", pathWithoutLocale);

      return NextResponse.redirect(redirectUrl);
    }

    const hasAccess = hasRequiredRole(request, pathWithoutLocale);
/*     console.log("¿Tiene el usuario los permisos necesarios?", hasAccess);
 */
    if (!hasAccess) {
/*       console.log("Usuario sin permisos suficientes para acceder a esta ruta");
 */
      const redirectPath = getRedirectPathForRole(request);
/*       console.log("Redirigiendo a:", redirectPath);
 */
      const redirectUrl = new URL(`/${locale}${redirectPath}`, request.url);

      return NextResponse.redirect(redirectUrl);
    }

/*     console.log("Usuario autenticado con rol válido, permitiendo acceso");
 */    return intlResponse;
  } else {
/*     console.log("Ruta pública, permitiendo acceso:", pathname);
 */    return intlResponse;
  }
}

export const config = {
  // - Rutas de API (/api/*)
  // - Archivos estáticos (con punto)
  // - Rutas internas de Next.js (_next)
  matcher: ["/((?!api/|_next/|.*\\..*).*)", "/", "/:locale(es|en)"],
};
