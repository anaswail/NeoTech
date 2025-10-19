import { actVerifyEmail } from "@/store/slices/auth/act/actVerifyEmail";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import { SyncLoader } from "react-spinners";
import Swal from "sweetalert2";

const VerifyEmail = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const { loading, error: err } = useSelector(
    (state: RootState) => state.VerifyEmail
  );

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (token) {
      dispatch(actVerifyEmail({ token }));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (loading === "fulfilled") {
      navigate("/profile", { replace: true });
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
  }, [navigate, err, loading]);

  if (loading === "fulfilled") {
    return <Navigate to="/profile" replace />;
  }

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
};

export default VerifyEmail;
