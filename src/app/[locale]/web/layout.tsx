import { ReactNode } from "react";
import Header from "./components/Header";
import { Footer } from "./components/Footer";

interface WebLayoutProps {
  children: ReactNode;
}

export default function WebLayout({ children }: WebLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
