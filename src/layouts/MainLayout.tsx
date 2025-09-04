import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="container mx-auto my-5 flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
