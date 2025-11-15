import { useEffect, useState } from "react";
import { useLocale } from "next-intl";
import { getDictionary } from "./dictionary";

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

  return {
    status: (status: string) =>
      dict?.logistics?.status?.[status] || status,
    trackingEvent: (event: string) =>
      dict?.logistics?.trackingEvent?.[event] || event,
  };
}
