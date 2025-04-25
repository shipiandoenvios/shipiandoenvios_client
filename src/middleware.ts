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

// Definir la interfaz para los roles y rutas
interface RoleRoutes {
  [key: string]: string[];
}

// Definir una estructura clara de rutas por rol
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

// Rutas públicas que no requieren autenticación
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

// Función para comprobar si una ruta requiere autenticación
const isProtectedRoute = (pathname: string) => {
  // Verificar si la ruta está en la lista de rutas públicas
  const isPublic = PUBLIC_ROUTES.some((route) => pathname.includes(route));
  if (isPublic) return false;

  // Verificar si es ruta estática o de API
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return false;
  }

  // Rutas protegidas específicas
  const protectedPaths = [
    "/app/",
    "/dashboard",
    "/accountant",
    "/client",
    "/admin/",
  ];
  return protectedPaths.some((path) => pathname.includes(path));
};

// Función para comprobar si el módulo está habilitado
const isModuleEnabled = (pathname: string) => {
  // Verificar acceso a /app/
  if (pathname.startsWith("/app") || pathname.includes("/app/")) {
    return ENABLED_MODULES.APP;
  }
  // Verificar acceso a /cms/
  if (pathname.startsWith("/cms") || pathname.includes("/cms/")) {
    return ENABLED_MODULES.CMS;
  }
  return true; // Las demás rutas siempre están habilitadas
};

// Función para verificar si el usuario está autenticado
const isAuthenticated = (request: NextRequest): boolean => {
  // Comprobar si existen las cookies de autenticación
  const authToken = request.cookies.get("sopy-auth-token");
  const userCookie = request.cookies.get("sopy-user");

  const cookieHasToken = !!authToken?.value;
  const cookieHasUser = !!userCookie?.value;

  console.log("Cookies:", { authToken: cookieHasToken, user: cookieHasUser });
  console.log("Verificando autenticación:");
  console.log("- ¿Tiene token de autenticación?", cookieHasToken);
  console.log("- ¿Tiene cookie de usuario?", cookieHasUser);

  // Solo requerimos que el token de autenticación esté presente
  const isAuth = cookieHasToken;
  console.log("¿Usuario autenticado?", isAuth);

  return isAuth;
};

// Función para verificar si el usuario tiene el rol necesario para acceder a la ruta
const hasRequiredRole = (request: NextRequest, path: string): boolean => {
  try {
    console.log("\n=== Verificando permisos de acceso ===");
    console.log("Ruta solicitada:", path);

    // Obtener la cookie del usuario
    const userCookie = request.cookies.get("sopy-user");
    if (!userCookie?.value) {
      console.log(
        "No se encontró cookie de usuario, pero podría tener token válido"
      );
      // Si no hay cookie de usuario pero hay token, permitimos acceso temporal
      // y dejamos que la página maneje la redirección si es necesario
      const authToken = request.cookies.get("sopy-auth-token");
      if (authToken?.value) {
        console.log(
          "Tiene token de autenticación - permitiendo acceso temporal"
        );
        return true;
      }
      return false;
    }

    // Parsear los datos del usuario
    const userData = JSON.parse(userCookie.value);
    const userRole = userData.role;
    console.log("Rol del usuario:", userRole);
    console.log("Datos de usuario completos:", userData);

    // Log adicional para depuración de permisos
    if (userData.permissions) {
      console.log(
        "Permisos del usuario:",
        userData.permissions
          .map((p: any) => `${p.permission}:${p.resource}`)
          .join(", ")
      );
    }

    // Super Admin tiene acceso a todo
    if (userRole === "SUPER_ADMIN") {
      console.log("Usuario es SUPER_ADMIN - acceso total");
      return true;
    }

    // Comprobamos si la ruta comienza con alguna de las rutas permitidas para este rol
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

// Función para determinar la ruta de redirección basada en el rol del usuario
const getRedirectPathForRole = (request: NextRequest): string => {
  try {
    const userCookie = request.cookies.get("sopy-user");
    // Si no hay cookie de usuario pero hay token, redirigimos a la ruta por defecto
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

    // Definir las rutas por defecto para cada rol
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

// Comprobar si la ruta es la raíz de un idioma (ejemplo: /es, /en)
const isLocaleRoot = (pathname: string) => {
  // Obtener el primer segmento de la ruta
  const segments = pathname.split("/").filter(Boolean);

  // Si solo hay un segmento y ese segmento es un idioma configurado
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

  // Verificar explícitamente si la ruta es una ruta de API
  if (pathname.startsWith("/api/")) {
    console.log("Ruta de API detectada, bypass del middleware");
    return NextResponse.next();
  }

  console.log("Headers:", Object.fromEntries(request.headers.entries()));
  console.log("Cookies:", {
    authToken: !!request.cookies.get("sopy-auth-token"),
    user: !!request.cookies.get("sopy-user"),
  });

  // Manejar solicitudes de preflight OPTIONS para CORS
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 204,
      headers: {
        // Permitir cualquier origen, lo que incluye tanto HTTP como HTTPS
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

  // Parsear usuario si existe
  let userData: any = null;
  const userCookie = request.cookies.get("sopy-user");
  if (userCookie?.value) {
    try {
      userData = JSON.parse(userCookie.value);
    } catch (e) {}
  }

  // Validación de acceso permitido
  if (userData && userData.accessAllowed === false) {
    if (!pathname.includes("/auth/access-denied")) {
      const locale = pathname.split("/")[1] || "es";
      const redirectUrl = new URL(`/${locale}/auth/access-denied`, request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Si es la ruta raíz o la ruta de un idioma, redirigir a /[locale]/web
  if (pathname === "/" || isLocaleRoot(pathname)) {
    // Obtener el idioma de la URL o usar el predeterminado
    const locale =
      pathname === "/" ? routing.defaultLocale : pathname.split("/")[1];

    // Redirigir a la ruta /web
    const redirectUrl = new URL(`/${locale}/web`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Extraer la parte de la ruta sin el segmento de locale
  const segments = pathname.split("/");
  const locale = segments[1];
  const pathWithoutLocale = "/" + segments.slice(2).join("/");
  console.log("Ruta sin locale:", pathWithoutLocale);
  console.log("Segmentos de ruta:", segments);

  // Verificamos si el módulo está habilitado para la ruta sin locale
  if (!isModuleEnabled(pathWithoutLocale)) {
    // El módulo está deshabilitado en este despliegue
    // Redirigir a la página web con mensaje de módulo no disponible
    const redirectUrl = new URL(`/${locale}/web`, request.url);
    redirectUrl.searchParams.set("error", "module_not_available");
    return NextResponse.redirect(redirectUrl);
  }

  // Primero aplicamos el middleware de internacionalización
  const intlResponse = await intlMiddleware(request);

  // Verificamos si la ruta requiere autenticación
  const requiresAuth = isProtectedRoute(pathWithoutLocale);
  console.log("¿La ruta requiere autenticación?", requiresAuth);

  // Verificamos si el usuario está autenticado
  const isUserAuthenticated = isAuthenticated(request);
  console.log("¿Usuario autenticado?", isUserAuthenticated);

  if (requiresAuth) {
    console.log("La ruta requiere autenticación:", pathWithoutLocale);

    // Si no está autenticado, redirigir al login
    if (!isUserAuthenticated) {
      console.log("Usuario no autenticado, redirigiendo a login...");

      // Construimos la URL de redirección con el idioma actual
      const redirectUrl = new URL(`/${locale}/auth/login`, request.url);
      redirectUrl.searchParams.set("from", pathWithoutLocale);

      // Redirigimos manteniendo el idioma
      return NextResponse.redirect(redirectUrl);
    }

    // Si está autenticado, verificar permisos
    const hasAccess = hasRequiredRole(request, pathWithoutLocale);
    console.log("¿Tiene el usuario los permisos necesarios?", hasAccess);

    if (!hasAccess) {
      console.log("Usuario sin permisos suficientes para acceder a esta ruta");

      // Obtener la ruta correcta basada en el rol del usuario
      const redirectPath = getRedirectPathForRole(request);
      console.log("Redirigiendo a:", redirectPath);

      // Construir la URL de redirección con el idioma actual
      const redirectUrl = new URL(`/${locale}${redirectPath}`, request.url);

      // Redirigir al usuario a su dashboard correspondiente
      return NextResponse.redirect(redirectUrl);
    }

    console.log("Usuario autenticado con rol válido, permitiendo acceso");
    // Usuario autenticado y con el rol adecuado, continuamos
    return intlResponse;
  } else {
    console.log("Ruta pública, permitiendo acceso:", pathname);
    return intlResponse;
  }
}

export const config = {
  // Match all pathnames except:
  // - Rutas de API (/api/*)
  // - Archivos estáticos (con punto)
  // - Rutas internas de Next.js (_next)
  matcher: ["/((?!api/|_next/|.*\\..*).*)", "/", "/:locale(es|en)"],
};
