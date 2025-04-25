import { ReactNode } from "react";
import { Link } from "@/packages/internationalization";

interface CMSLayoutProps {
  children: ReactNode;
}

export default function CMSLayout({ children }: CMSLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-indigo-800 text-white p-4">
        <h2 className="text-xl font-bold mb-6">CMS Sistema</h2>
        <nav className="space-y-2">
          <div className="py-2">
            <Link
              href="/cms/dashboard"
              className="block px-4 py-2 rounded hover:bg-indigo-700"
            >
              Panel
            </Link>
          </div>
          <div className="py-2">
            <Link
              href="/"
              className="block px-4 py-2 rounded hover:bg-indigo-700"
            >
              Volver a inicio
            </Link>
          </div>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
}
