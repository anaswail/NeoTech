import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect } from "react";
import Swal from "sweetalert2";
import AuthFormSubmit from "@/components/AuthForm";
import type { IRegisterUser } from "@/types";
import { actCreateAdmin } from "@/store/slices/superAdmin/act/actCreateAdmin";
import { actGetAllAdmins } from "@/store/slices/superAdmin/act/actGetAllAdmins";
// import { actGoogleAuth } from "../../store/slices/auth/act/actGoogleAuth";

const CreateAdmin = () => {
  const navigate = useNavigate();

  // CreateAdmin store
  const {
    loading,
    data,
    error: registerError,
  } = useSelector((state: RootState) => state.createAdmin);
  const dispatch = useDispatch<AppDispatch>();

  // handle errors and success
  useEffect(() => {
    if (loading === "fulfilled") {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Admin created Successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/dashboard/admins", { replace: true });
        dispatch(actGetAllAdmins());
      }, 2000);
    } else if (loading === "rejected") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: registerError?.message,
        showConfirmButton: false,
        timer: 3000,
      });
    }
  }, [data.user, registerError, loading]);

  const createAdminSubmit = (data: IRegisterUser) => {
    dispatch(actCreateAdmin(data)).unwrap();
  };
  return (
    <AuthFormSubmit
      onSubmit={createAdminSubmit}
      authType="createAdmin"
      loading={loading}
    />
  );
};

export default CreateAdmin;
