import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CookieConsent from "@/components/ui/CookieConsent";
import NotificationPermission from "@/components/ui/NotificationPermission";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-finance-bg">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <CookieConsent />
      <NotificationPermission />
    </div>
  );
};

export default Layout;
