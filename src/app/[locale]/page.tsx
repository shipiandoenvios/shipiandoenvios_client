import { redirect } from "next/navigation";

interface PageProps {
  params: { locale: string } | Promise<{ locale: string }>;
}

export default async function LocaleRoot({ params }: PageProps) {
  // Redirect locale root to the web home route
  const { locale } = (await params) as { locale: string };
  redirect(`/${locale}/web`);
}