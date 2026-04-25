import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { useTokenRefreshManager } from "@/hooks/useTokenRefreshManager";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

const MainLayout = () => {
  // Fix #1: Read from Redux store — this is reactive and always up to date
  const isAuthenticated = useSelector(
    (state: RootState) => !!state.profile.data,
  );
  useTokenRefreshManager(isAuthenticated);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="container mx-auto my-5 flex-grow">
        <ScrollToTop />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
