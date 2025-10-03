import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import auth from "../../assets/auth.png";
import { Navigate, useNavigate, useSearchParams } from "react-router";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Swal from "sweetalert2";
import { actResetPassword } from "@/store/slices/auth/act/actResetPassword";
import { SyncLoader } from "react-spinners";
import { type AppDispatch, type RootState } from "@/store/store";

const ResetPassword = () => {
  const navigate = useNavigate();

  // Reset Password store
  const { loading, error: err } = useSelector(
    (state: RootState) => state.resetPassword
  );
  const dispatch = useDispatch<AppDispatch>();

  // React Hook Form & Zod Schema
  const ResetPasswordSchema = z
    .object({
      password: z
        .string()
        .min(1, "Password is required")
        .min(6, "Password must be at least contain 8 characters")
        .regex(
          /[a-z]/,
          "Password must contain at least one lowercase character"
        )
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
      confirmPassword: z.string().min(1, "please confirm Your password"),
    })
    .refine((data) => data.password == data.confirmPassword, {
      message: "password don't match",
      path: ["confirmPassword"],
    });

  type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  // handle errors and success
  useEffect(() => {
    if (loading === "fulfilled") {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Account created successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } else if (loading === "rejected") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: err?.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [err, loading]);

  // get token from url
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // submit handler
  const resetPasswordSubmit = (data: {
    password: string;
    confirmPassword: string;
  }) => {
    dispatch(actResetPassword({ newPassword: data?.password, token })).unwrap();
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
  } else {
    return (
      <div className="flex mt-25 max-lg:mt-30 ">
        <div className="img-sec mt-5 bg-[#CBE4E8] h-full w-1/2 flex justify-center items-center max-lg:hidden mr-20">
          <img src={auth} alt="ResetPassword" />
        </div>

        <div className=" container mx-auto max-lg:w-3/4 form-content flex justify-center w-full lg:w-1/2  ">
          <div className="form-content w-full ">
            <Heading title="Reset Password" />
            <p className="mt-3 text-lg">Enter your new password below</p>
            <form
              className="flex flex-col w-full  mt-8 "
              onSubmit={handleSubmit(resetPasswordSubmit)}
            >
              <input
                {...register("password")}
                placeholder="Password"
                className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full mt-5"
              />
              {errors.password && (
                <p className="text-red-500 mt-2 ">{errors.password?.message}</p>
              )}

              <input
                {...register("confirmPassword")}
                placeholder="Confirm Password"
                className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full mt-5"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 mt-2 ">
                  {errors.confirmPassword?.message}
                </p>
              )}

              <div className="btns flex flex-col gap-4  mt-8 max-lg:w-full w-3/4">
                <Button className="py-6 " type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader /> : "Reset Password"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default ResetPassword;
