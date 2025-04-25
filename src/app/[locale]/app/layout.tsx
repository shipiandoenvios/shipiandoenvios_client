import { ReactNode } from "react";
import { SidebarProvider } from "@/packages/design-system/components/ui/sidebar";
import { Providers } from "@/packages/design-system/providers/theme";

interface AppLayoutProps {
  children: ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <Providers>
      <SidebarProvider>{children}</SidebarProvider>
    </Providers>
  );
}
