import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getDictionary } from "./dictionary";
import { normalizeStatusKey } from '@/lib/status'

/**
 * React hook to get a translated status or tracking event label from enums.
 * Usage: const tStatus = useStatusTranslation(); tStatus.status(statusEnum)
 */
export function useStatusTranslation() {
  const locale = useLocale();
  const [dict, setDict] = useState<any>(null);

  useEffect(() => {
    getDictionary(locale).then(setDict);
  }, [locale]);

  const normalizeKey = normalizeStatusKey

  return {
    status: (status: string) =>
      dict?.logistics?.status?.[normalizeKey(status)] || status,
    trackingEvent: (event: string) =>
      dict?.logistics?.trackingEvent?.[normalizeKey(event)] || event,
    driver: (status: string) =>
      dict?.logistics?.driverStatus?.[normalizeKey(status)] || status,
    client: (status: string) =>
      dict?.logistics?.clientStatus?.[normalizeKey(status)] || status,
  };
}
