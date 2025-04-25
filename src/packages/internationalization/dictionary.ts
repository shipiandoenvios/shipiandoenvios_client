import "server-only";
import type en from "./dictionaries/en.json";
import languine from "./languine.json";

export const locales = [
  languine.locale.source,
  ...languine.locale.targets,
] as const;

export type Dictionary = typeof en;
type Dictionaries = Record<(typeof locales)[number], () => Promise<Dictionary>>;

const dictionaries = locales.reduce<Dictionaries>((acc, locale) => {
  acc[locale] = () =>
    import(`./dictionaries/${locale}.json`).then((mod) => mod.default);
  return acc;
}, {} as Dictionaries);

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  // Verifica si el idioma solicitado está en la lista de idiomas disponibles
  if (!locales.includes(locale as (typeof locales)[number])) {
    // Si no está disponible, usa el idioma por defecto
    locale = languine.locale.source;
  }

  const dictionary = await dictionaries[locale as (typeof locales)[number]]();
  return dictionary;
};
