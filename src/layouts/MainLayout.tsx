import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
// import { useTokenRefreshManager } from "@/hooks/useTokenRefreshManager";
import { userToken } from "@/utils/Repeated";
import { Outlet } from "react-router";

const MainLayout = () => {
  const isAuthenticated = localStorage.getItem("user") ? true : false;
  // useTokenRefreshManager(isAuthenticated);
  console.log(userToken);
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
