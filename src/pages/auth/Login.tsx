import { useNavigate } from "react-router";

import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect } from "react";
import { actLogin } from "@/store/slices/auth/act/actLogin";
import Swal from "sweetalert2";
import { actGoogleAuth } from "@/store/slices/auth/act/actGoogleAuth";
import AuthFormSubmit from "@/components/AuthForm";

const Login = () => {
  const navigate = useNavigate();

  // Login Store
  const { loading } = useSelector((state: RootState) => state.login);
  const dispatch = useDispatch<AppDispatch>();

  // handle errors and success
  useEffect(() => {
    if (loading === "fulfilled") {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Login Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 1500);
    } else if (loading === "rejected") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: "Incorrect email or password",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [loading, navigate]); // Fixed dependencies

  // submit handler
  const loginSubmit = (data: { password: string; email: string }) => {
    dispatch(actLogin(data)).unwrap();
  };

  const googleSignUpHandler = () => {
    dispatch(actGoogleAuth());
  };

  return (
    <AuthFormSubmit
      onSubmit={loginSubmit}
      authType="login"
      loading={loading}
      googleAuth={googleSignUpHandler}
    />
  );
};

export default Login;
