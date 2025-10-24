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
    icon: <Package />,
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

  // Logout function
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete your account from this device!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success!",
          text: "Your account loggedOut from this device successfully.",
          icon: "success",
        });
        setTimeout(() => {
          dispatch(logout());
          window.location.reload();
        }, 1500);
      }
    });
  };

  const [closeMenu, setCloseMenu] = useState(false);
  return (
    <div className="absolute top-0 left-0 w-full bg-gray-100 z-50 flex">
      {closeMenu && (
        <div className="w-[5%]">
          <PanelLeftOpen
            className="m-10 cursor-pointer"
            onClick={() => {
              setCloseMenu(false);
            }}
          />
        </div>
      )}
      <div
        className={`sidebar h-screen bg-white w-1/4 py-10 px-5 relative ${
          closeMenu ? "hidden" : "block"
        }`}
      >
        {!closeMenu && (
          <PanelLeftClose
            className="absolute top-10 right-5 cursor-pointer"
            onClick={() => {
              setCloseMenu(true);
            }}
          />
        )}
        <h1 className="text-txt-black text-3xl font-bold mr-2 mb-10 px-5">
          <Link to="/">
            Neo
            <span className="text-txt-secondary2">Tech</span>
          </Link>
        </h1>
        <ul>
          {sidebarItems.map((item, idx) => (
            <li
              key={idx}
              className="hover:text-white px-5 py-3 rounded-sm cursor-pointer hover:bg-txt-secondary2 duration-200 mt-5"
            >
              <Link
                to={item.path}
                className="font-semibold flex gap-10 items-center text-lg"
              >
                {item.icon} {item.name}
              </Link>
            </li>
          ))}
          <Button
            onClick={handleLogout}
            className="cursor-pointer font-semibold flex gap-10 items-center text-xl w-3/4 rounded-sm p-5 absolute bottom-5"
          >
            <LogOut size={25} /> Log Out
          </Button>
        </ul>
      </div>
      <div className={`px-8 ${closeMenu ? "w-[95%]" : "w-3/4"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
