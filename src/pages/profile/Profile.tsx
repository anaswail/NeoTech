import { actGetMyProfile } from "@/store/slices/profile/act/actGetMyProfile";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router";
import profileImg from "../../assets/profile.png";
import { BadgeAlert, BadgeCheck, Menu, X } from "lucide-react";
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
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Sent!",
          text: "Verification email has been sent.",
          icon: "success",
        });
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
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 bg-white flex-col">
        <h1 className="text-txt-black text-4xl font-bold mb-8 max-sm:text-3xl">
          Neo
          <span className="text-txt-secondary2">Tech</span>
        </h1>
        <SyncLoader size={25} margin={5} />
        <h1 className="absolute bottom-10 text-xl font-bold opacity-80 max-md:text-sm max-sm:text-xs px-4 text-center">
          Developed By <span className="text-txt-secondary2">Anas & Hagar</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24 sm:mt-32 mb-10">
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden cursor-pointer fixed bottom-6 right-6 z-50 bg-txt-secondary2 text-white p-4 rounded-full shadow-lg hover:bg-opacity-90 transition-all"
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

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 relative">
        {/* Sidebar */}
        <aside
          className={`sidebar  flex-shrink-0 fixed lg:static top-0 left-0 h-full lg:h-auto bg-white z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
            isSidebarOpen ? "translate-x-0 w-full" : "-translate-x-full w-64"
          } lg:shadow-none shadow-xl overflow-y-auto`}
        >
          <div className="p-6 lg:p-0">
            {/* Close button for mobile */}
            <button
              onClick={closeSidebar}
              className="lg:hidden absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <h2 className="font-bold text-lg lg:text-xl mb-3 mt-8 lg:mt-0">
              Manage My Account
            </h2>
            <ul className="space-y-2">
              <li className="hover:text-txt-secondary2 cursor-pointer transition-colors">
                <Link
                  to="my-profile"
                  className="block py-1"
                  onClick={closeSidebar}
                >
                  My profile
                </Link>
              </li>
              <li className="hover:text-txt-secondary2 cursor-pointer transition-colors">
                <Link
                  to="/dashboard"
                  className="block py-1"
                  onClick={closeSidebar}
                >
                  Admin Dashboard
                </Link>
              </li>
            </ul>

            <h2 className="font-bold text-lg lg:text-xl mt-6 mb-3">
              My Orders
            </h2>
            <ul className="space-y-2">
              <li className="hover:text-txt-secondary2 cursor-pointer transition-colors">
                <Link
                  to="lastorders"
                  className="block py-1"
                  onClick={closeSidebar}
                >
                  Last orders
                </Link>
              </li>
              <li className="hover:text-txt-secondary2 cursor-pointer transition-colors">
                <Link
                  to="/wishlist"
                  className="block py-1"
                  onClick={closeSidebar}
                >
                  WishList
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Main Content */}
        <main className="content flex-1 w-full lg:w-auto">
          {/* Profile Header */}
          <div className="info flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 w-full mb-8">
            <div className="text flex-1 w-full sm:w-auto">
              <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl break-words">
                Hi{" "}
                <span className="text-txt-secondary2">
                  {profile?.name ?? "user"}
                </span>
              </h1>

              <div className="mt-4 lg:mt-5">
                <p className="text-txt-secondary2 font-bold text-base lg:text-lg flex flex-col sm:flex-row sm:items-center gap-2">
                  <span>Email:</span>
                  <span className="text-black font-normal flex items-center gap-2 break-all">
                    <span className="break-all">{profile?.email}</span>
                    {profile?.isEmailVerified ? (
                      <span className="group inline-block relative flex-shrink-0">
                        <BadgeCheck className="text-green-500" />
                        <span className="absolute left-1/2 -translate-x-1/2 mt-2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                          Email is verified
                        </span>
                      </span>
                    ) : (
                      <button
                        onClick={handleResendVerification}
                        className="group inline-block relative flex-shrink-0"
                        aria-label="Resend verification email"
                      >
                        <BadgeAlert className="text-red-500 cursor-pointer" />
                        <span className="absolute left-1/2 -translate-x-1/2 mt-2 w-max text-xs bg-black text-white px-2 py-1 rounded text-center opacity-0 group-hover:opacity-100 transition duration-500 z-10">
                          Email is not verified
                        </span>
                      </button>
                    )}
                  </span>
                </p>
              </div>
            </div>

            {/* Profile Image */}
            <div className="img w-32 h-32 sm:w-36 sm:h-36 lg:w-40 lg:h-40 overflow-hidden rounded-full flex-shrink-0 self-center sm:self-auto">
              <img
                src={profile?.avatar?.secure_url || profileImg}
                alt={profile?.name || "Profile"}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Outlet for nested routes */}
          <div className="outlet-content">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
