import Heading from "@/components/Heading";
import { actGetMyProfile } from "@/store/slices/profile/act/actGetMyProfile";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet } from "react-router";

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector((state: RootState) => state?.profile);
  useEffect(() => {
    dispatch(actGetMyProfile());
  }, []);
  console.log(profile.data);
  return (
    <div className="container mx-auto px-4 mt-24 sm:mt-32">
      <Heading title="My Account" />
      <div className="content">
        <div className="navigation">
          <Link to="my-profile">My profile</Link>
          <Link to="lastorders">Last orders</Link>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
