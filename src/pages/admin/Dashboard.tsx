import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/auth/registerSlice";
import type { AppDispatch } from "@/store/store";
import {
  LogOut,
  Package,
  PanelLeftClose,
  PanelLeftOpen,
  ShoppingBag,
  ShoppingBasket,
  SquareChartGantt,
  UsersRound,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router";
import Swal from "sweetalert2";

const sidebarItems = [
  {
    name: "Overview",
    path: "overview",
    icon: <SquareChartGantt size={25} />,
  },
  {
    name: "Product CRUD",
    path: "product-crud",
    icon: <Package size={25} />,
  },
  {
    name: "All Products",
    path: "products-overview",
    icon: <ShoppingBasket size={25} />,
  },
  {
    name: "Customers",
    path: "customers",
    icon: <UsersRound size={25} />,
  },
  {
    name: "Orders",
    path: "orders",
    icon: <ShoppingBag size={25} />,
  },
];

const Dashboard = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [closeMenu, setCloseMenu] = useState(false);

  // Logout function
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to log out from this device!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success!",
          text: "Your account logged out from this device successfully.",
          icon: "success",
        });
        setTimeout(() => {
          dispatch(logout());
          window.location.reload();
        }, 1500);
      }
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen bg-gray-100 z-50 flex overflow-hidden">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 bg-txt-secondary2 text-white p-3 rounded-lg shadow-lg hover:bg-opacity-90 transition-all"
        aria-label="Toggle menu"
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/10 bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Desktop collapse toggle */}
      {closeMenu && (
        <div className="hidden lg:block w-16 flex-shrink-0">
          <PanelLeftOpen
            className="m-5 cursor-pointer text-gray-700 hover:text-txt-secondary2 transition-colors"
            size={28}
            onClick={() => setCloseMenu(false)}
          />
        </div>
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar h-full bg-white flex-shrink-0 py-6 sm:py-8 lg:py-10 px-4 sm:px-5 
          fixed lg:static top-0 left-0 z-40 transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0 w-64 " : "-translate-x-full"}
          lg:translate-x-0
          ${closeMenu ? "hidden lg:hidden" : "block"}
          sm:w-72 lg:w-80 xl:w-1/4
          shadow-xl lg:shadow-none overflow-y-auto`}
      >
        {/* Close button for mobile */}
        <button
          onClick={closeSidebar}
          className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        {/* Desktop collapse button */}
        {!closeMenu && (
          <PanelLeftClose
            className="hidden lg:block absolute top-8 right-5 cursor-pointer text-gray-700 hover:text-txt-secondary2 transition-colors"
            size={24}
            onClick={() => setCloseMenu(true)}
          />
        )}

        <h1 className="text-txt-black text-2xl sm:text-3xl font-bold mb-8 lg:mb-10 px-3 sm:px-5 mt-8 lg:mt-0">
          <Link to="/" onClick={closeSidebar}>
            Neo
            <span className="text-txt-secondary2">Tech</span>
          </Link>
        </h1>

        <nav>
          <ul className="space-y-2">
            {sidebarItems.map((item, idx) => (
              <li key={idx}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className="hover:text-white px-3 sm:px-5 py-3 rounded-sm cursor-pointer hover:bg-txt-secondary2 duration-200 font-semibold flex gap-4 sm:gap-6 lg:gap-10 items-center text-base sm:text-lg w-full"
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>

          <Button
            onClick={handleLogout}
            className="cursor-pointer font-semibold flex gap-4 sm:gap-6 lg:gap-10 items-center text-base sm:text-lg lg:text-xl w-full sm:w-5/6 lg:w-3/4 rounded-sm p-4 sm:p-5 mt-8 lg:absolute lg:bottom-5"
          >
            <LogOut size={22} />
            <span>Log Out</span>
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main
        className={`flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 transition-all duration-300
          ${closeMenu ? "lg:w-[calc(100%-4rem)]" : ""}
          w-full`}
      >
        <div className="pt-16 lg:pt-0">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
