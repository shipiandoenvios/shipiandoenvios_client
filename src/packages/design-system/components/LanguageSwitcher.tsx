"use client";

import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";

type LanguageSwitcherProps = {
  className?: string;
};

export default function LanguageSwitcher({
  className = "",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const pathname = usePathname();

  // Nombres de idiomas para mostrar
  // const localeNames = {
  //   es: "Español",
  //   en: "English",
  // };

  // Construir las rutas para cada idioma
  const getLocaleUrl = (targetLocale: string) => {
    const segments = pathname.split("/");

    // Si hay suficientes segmentos, reemplazar el segundo (que sería el locale)
    if (segments.length > 1) {
      segments[1] = targetLocale;
    }

    return segments.join("/");
  };

  return (
    <div className={`flex items-center space-x-2 text-sm ${className}`}>
      <Link
        href={getLocaleUrl("es")}
        className={`px-2 py-1 rounded ${
          locale === "es"
            ? "bg-foreground text-background"
            : "opacity-70 hover:opacity-100"
        }`}
      >
        ES
      </Link>
      <span className="text-gray-400">|</span>
      <Link
        href={getLocaleUrl("en")}
        className={`px-2 py-1 rounded ${
          locale === "en"
            ? "bg-foreground text-background"
            : "opacity-70 hover:opacity-100"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
