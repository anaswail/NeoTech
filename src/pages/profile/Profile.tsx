import { actGetMyProfile } from "@/store/slices/profile/act/actGetMyProfile";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router";
import profileImg from "../../assets/profile.png";
import { BadgeAlert, BadgeCheck, SquarePen } from "lucide-react";
import { actResendEmailVerification } from "@/store/slices/auth/act/actResendEmailVerification";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";

const Profile = () => {
  const navigate = useNavigate();

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
  }, [loading]);

  const handleResendVerification = () => {
    Swal.fire({
      title: "Resend verification email?",
      text: "",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Send ",
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

  if (loading === "pending") {
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 bg-white flex-col ">
        <h1 className="text-txt-black text-4xl font-bold mb-8">
          Neo
          <span className="text-txt-secondary2">Tech</span>
        </h1>
        <SyncLoader size={25} margin={5} />
        <h1 className="absolute bottom-10 text-xl font-bold opacity-80 max-md:text-sm">
          Developed By <span className="text-txt-secondary2">Anas & Hagar</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24 sm:mt-32 flex gap-30">
      <div className="sidebar">
        <h2 className="font-bold text-xl mb-3">Manage My Account</h2>
        <ul>
          <li className=" hover:text-txt-secondary2 cursor-pointer ">
            <Link to="my-profile">My profile</Link>
          </li>
          <li className=" hover:text-txt-secondary2 cursor-pointer mt-2">
            <Link to="/dashboard">Admin Dashboard</Link>
          </li>
        </ul>
        <h2 className="font-bold text-xl mt-5 mb-3">My Orders</h2>
        <ul>
          <li className=" hover:text-txt-secondary2 cursor-pointer">
            <Link to="lastorders">Last orders</Link>
          </li>
          <li className="mt-2 hover:text-txt-secondary2 cursor-pointer">
            <Link to="/wishlist">WishList</Link>
          </li>
        </ul>
      </div>
      <div className="content w-2/3">
        <div className="info flex justify-between items-center w-full">
          <div className="text">
            <h1 className="font-bold text-5xl">
              Hi{"  "}
              <span className="text-txt-secondary2">
                {profile?.name ?? "user"}
              </span>
            </h1>
            <p className="text-txt-secondary2 font-bold text-lg mt-5 flex items-center gap-2">
              Email:{" "}
              <span className="text-black font-normal flex items-center gap-2">
                {profile?.email}{" "}
                {profile?.isEmailVerified ? (
                  <span className="group inline-block">
                    <BadgeCheck className=" relative text-green-500" />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 mt-2 
                   text-sm bg-black text-white px-2 py-1 rounded 
                   opacity-0 group-hover:opacity-100 transition"
                    >
                      Email is verified
                    </span>
                  </span>
                ) : (
                  <button
                    onClick={handleResendVerification}
                    className="group inline-block relative w-35"
                  >
                    <BadgeAlert className=" text-red-500 relative cursor-pointer" />
                    <span
                      className="absolute left-1/2 -translate-x-1/2 mt-2 w-full
                   text-xs bg-black text-white px-2 py-1 rounded text-center
                   opacity-0 group-hover:opacity-100 transition duration-500"
                    >
                      Email is not verified
                    </span>
                  </button>
                )}
              </span>
            </p>
          </div>
          <div className="img w-40 h-40 overflow-hidden rounded-full group relative">
            <img
              src={profile?.avatar?.secure_url || profileImg}
              alt={profile?.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;
