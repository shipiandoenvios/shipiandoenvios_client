"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AccountantSidebar } from "./accountant-sidebar";
import { PeriodSelector } from "../../../../packages/design-system/components/PeriodSelector";
import { ClientSelector } from "../../../../packages/design-system/components/ClientSelector";

type AccountantLayoutProps = {
  readonly children: ReactNode;
};

export default function AccountantLayout({ children }: AccountantLayoutProps) {
  return (
    <div className="container mx-auto flex flex-col w-full min-h-screen">
      <header className="fixed top-0 left-0 right-0 border-b border-gray-100 z-50 h-auto lg:h-16 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="h-full flex flex-col lg:flex-row items-center justify-between px-4 py-2 lg:py-0">
          <div className="w-full flex justify-center lg:justify-start items-center order-1 lg:order-1 mb-2 lg:mb-0">
            <Link href="/web" className="flex items-center">
              <img
                src="/logo_sopy.png"
                alt="Logo"
                className="h-14 w-28 lg:h-20 lg:w-40"
              />
            </Link>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3 w-full lg:w-auto order-2 lg:order-2">
            <ClientSelector />
            <PeriodSelector />
          </div>
        </div>
      </header>

      <div className="w-full h-[180px] lg:h-16 flex-shrink-0"></div>

      <div className="flex flex-1 w-full">
        <AccountantSidebar />

        <main className="flex-1 w-full p-0 pt-4 md:p-6 md:pl-[300px] pb-20 md:pb-6 min-h-screen overflow-hidden bg-gradient-to-b from-white to-gray-50">
          <div className="container mx-auto px-4 relative z-10">{children}</div>
        </main>
      </div>
    </div>
  );
}
