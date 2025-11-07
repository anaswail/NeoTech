import { actGetMyProfile } from "@/store/slices/profile/act/actGetMyProfile";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router";
import profileImg from "../../assets/profile.png";
import {
  BadgeAlert,
  BadgeCheck,
  Menu,
  X,
  User,
  Settings,
  ShoppingBag,
  Heart,
  LogOut,
} from "lucide-react";
import { actResendEmailVerification } from "@/store/slices/auth/act/actResendEmailVerification";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";

const Profile = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state?.profile.data);
  const { error: err, loading } = useSelector(
    (state: RootState) => state.resendEmail
  );

  useEffect(() => {
    dispatch(actGetMyProfile());
  }, [dispatch]);

  useEffect(() => {
    if (loading === "fulfilled") {
      navigate("/login/email-message", { replace: true });
    } else if (loading === "rejected") {
      Swal.fire({
        title: "Error!",
        text: err?.message,
        icon: "error",
        position: "top",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [loading, err, navigate]);

  const handleResendVerification = () => {
    Swal.fire({
      title: "Resend verification email?",
      text: "A new verification link will be sent to your email address.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, send it",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(actResendEmailVerification());
      }
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  if (loading === "pending") {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center z-50 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="bg-white rounded-2xl shadow-2xl p-12 flex flex-col items-center">
          <h1 className="text-5xl font-bold mb-8 max-sm:text-3xl">
            Neo
            <span className="text-txt-secondary2">Tech</span>
          </h1>
          <SyncLoader size={20} margin={5} color="#3085d6" />
        </div>
        <p className="absolute bottom-10 text-sm font-medium text-gray-600 max-sm:text-xs px-4 text-center">
          Developed by{" "}
          <span className="font-bold text-txt-secondary2">Anas & Hagar</span>
        </p>
      </div>
    );
  }

  const menuItems = [
    {
      title: "Account",
      icon: Settings,
      items: [
        { label: "My Profile", path: "my-profile", icon: User },
        { label: "Admin Dashboard", path: "/dashboard", icon: Settings },
      ],
    },
    {
      title: "Shopping",
      icon: ShoppingBag,
      items: [
        { label: "Last Orders", path: "lastorders", icon: ShoppingBag },
        { label: "Wishlist", path: "/wishlist", icon: Heart },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="container mx-auto px-4 py-8 mt-20 sm:mt-24 mb-10">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed bottom-6 left-5 z-50 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-full shadow-2xl hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300"
          aria-label="Toggle menu"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={closeSidebar}
          />
        )}

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
          {/* Sidebar */}
          <aside
            className={`flex-shrink-0 fixed lg:static top-0 left-0 h-full lg:h-auto bg-white z-40 transition-all duration-300 ease-in-out lg:translate-x-0 lg:w-80 ${
              isSidebarOpen ? "translate-x-0 w-80" : "-translate-x-full w-80"
            } lg:shadow-xl shadow-2xl rounded-none lg:rounded-2xl overflow-y-auto`}
          >
            <div className="p-6 lg:p-8">
              {/* Close button for mobile */}
              <button
                onClick={closeSidebar}
                className="lg:hidden absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition-colors p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>

              {/* Sidebar Header */}
              <div className="mb-8 pb-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Menu</h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your account
                </p>
              </div>

              {/* Menu Sections */}
              <div className="space-y-8">
                {menuItems.map((section, idx) => (
                  <div key={idx}>
                    <div className="flex items-center gap-2 mb-4">
                      <section.icon className="w-5 h-5 text-txt-secondary2" />
                      <h3 className="font-bold text-lg text-gray-800">
                        {section.title}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {section.items.map((item, itemIdx) => (
                        <li key={itemIdx}>
                          <Link
                            to={item.path}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-100 hover:text-txt-secondary2 transition-all duration-200 group"
                            onClick={closeSidebar}
                          >
                            <item.icon className="w-4 h-4 text-gray-400 group-hover:text-txt-secondary2 transition-colors" />
                            <span className="font-medium">{item.label}</span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 w-full lg:w-auto">
            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10 mb-8 border border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8">
                <div className="flex-1 w-full sm:w-auto">
                  {/* Welcome Message */}
                  <div className="mb-6">
                    <p className="text-gray-500 text-sm font-medium mb-2">
                      Welcome back,
                    </p>
                    <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl break-words">
                      <span className="">{profile?.name ?? "User"}</span>
                    </h1>
                  </div>

                  {/* Email Section */}
                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border border-gray-200">
                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      Email Address
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                      <span className="text-gray-800 font-medium break-all">
                        {profile?.email}
                      </span>
                      {profile?.isEmailVerified ? (
                        <span className="group inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-700 rounded-full text-xs font-semibold w-fit relative">
                          <BadgeCheck className="w-4 h-4" />
                          <span>Verified</span>
                          <span className="absolute left-1/2 -translate-x-1/2 -top-10 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                            Your email is verified
                          </span>
                        </span>
                      ) : (
                        <button
                          onClick={handleResendVerification}
                          className="group inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-full text-xs font-semibold transition-all w-fit relative"
                          aria-label="Resend verification email"
                        >
                          <BadgeAlert className="w-4 h-4" />
                          <span>Not Verified</span>
                          <span className="absolute left-1/2 -translate-x-1/2 -top-10 text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                            Click to resend verification
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Profile Image */}
                <div className="relative group self-center sm:self-auto">
                  <div className="w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-blue-100 transition-all duration-300 group-hover:ring-blue-300 group-hover:scale-105">
                    <img
                      src={profile?.avatar?.secure_url || profileImg}
                      alt={profile?.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Online indicator */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg"></div>
                </div>
              </div>
            </div>

            {/* Outlet Content */}
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-gray-100">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Profile;
