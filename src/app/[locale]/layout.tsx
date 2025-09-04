import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { routing } from "@/packages/internationalization/routing";
import { NextIntlClientProvider } from "next-intl";
import { getDictionary } from "@/packages/internationalization/dictionary";
import { Providers } from "@/packages/design-system/providers/theme";

const inter = Inter({ subsets: ["latin"] });

interface RootLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }> | { locale: string };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: RootLayoutProps) {
  const resolvedParams = await params;
  const { locale } = resolvedParams;

  const messages = await getDictionary(locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <div className={inter.className}>{children}</div>
      </Providers>
    </NextIntlClientProvider>
  );
}
