import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sopy",
  description:
    "Software de gestión de información tributaria contable que conecta despachos y clientes de manera fácil y eficiente, centralizando todos los datos fiscales en una única plataforma.",
  icons: {
    icon: "/logo_sopy.png",
    apple: "/logo_sopy.png",
    shortcut: "/logo_sopy.png",
  },
  manifest: "/manifest.json",
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Sopy" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
