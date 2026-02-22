import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shipiando Envios",
  description:
    "Software de gestión de información tributaria contable que conecta despachos y clientes de manera fácil y eficiente, centralizando todos los datos fiscales en una única plataforma.",
  icons: {
    icon: "/shipiando_logo.jpeg",
    apple: "/shipiando_logo.jpeg",
    shortcut: "/shipiando_logo.jpeg",
  },
  manifest: "/manifest.json",
  robots: { index: true, follow: true },
  authors: [{ name: "Shipiando Envios" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className="light" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
