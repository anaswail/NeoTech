import Heading from "@/components/Heading";
import auth from "../../assets/auth.png";
import { Button } from "@/components/ui/button";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect } from "react";
import { actForgetPassword } from "@/store/slices/auth/act/actForgetPassword";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { SyncLoader } from "react-spinners";

const ForgetPassword = () => {
  const navigate = useNavigate();

  // Forget Password store
  const dispatch = useDispatch<AppDispatch>();
  const {
    loading,
    error: err,
    data,
  } = useSelector((state: RootState) => state.forgetPassword);

  // React Hook Form & Zod Schema
  const ForgetPasswordSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid Email address"),
  });
  type ForgetPasswordSchemaType = z.infer<typeof ForgetPasswordSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgetPasswordSchemaType>({
    resolver: zodResolver(ForgetPasswordSchema),
  });

  // handle errors and success
  useEffect(() => {
    if (loading === "fulfilled") {
      navigate("/login/email-message", { replace: true });
    } else if (loading === "rejected") {
      Swal.fire({
        title: "Error!",
        text: err.message,
        icon: "error",
        position: "top",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [data, err, loading]);

  // submit handler
  const ForgetPasswordSubmit = (data: { email: string }) => {
    dispatch(actForgetPassword(data.email)).unwrap();
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
      <div className="flex mt-25 max-lg:mt-30">
        <div className="img-sec mt-5 bg-[#CBE4E8] h-full w-1/2 flex justify-center items-center max-lg:hidden mr-20">
          <img src={auth} alt="SignUp" />
        </div>

        <div className="container mx-auto max-lg:w-3/4 form-content flex justify-center w-full lg:w-1/2  ">
          <div className="form-content w-full ">
            <Heading title="Reset password" />
            <p className="mt-3 text-lg">Enter your details below</p>
            <form
              className="flex flex-col w-full mt-8"
              onSubmit={handleSubmit(ForgetPasswordSubmit)}
            >
              <input
                {...register("email")}
                placeholder="Email"
                className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full  "
              />
              {errors.email && (
                <p className="text-red-500 mt-2 ">{errors.email?.message}</p>
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

export default ForgetPassword;
