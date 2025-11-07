import Heading from "@/components/Heading";
import auth from "../../assets/auth.png";
import google from "../../assets/google.png";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect } from "react";
import { actLogin } from "@/store/slices/auth/act/actLogin";
import Swal from "sweetalert2";
import { SyncLoader } from "react-spinners";
import { actGoogleAuth } from "@/store/slices/auth/act/actGoogleAuth";

const Login = () => {
  const navigate = useNavigate();

  // Login Store
  const { loading, data, error } = useSelector(
    (state: RootState) => state.login
  );
  const dispatch = useDispatch<AppDispatch>();

  // React Hook Form & Zod Schema
  const LoginSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid Email address"),
    password: z.string().min(1, "Password is required"),
  });
  type LoginSchemaType = z.infer<typeof LoginSchema>;
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

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
  const loginSubmit = (data: LoginSchemaType) => {
    dispatch(actLogin(data)).unwrap();
  };

  const googleSignUpHandler = () => {
    dispatch(actGoogleAuth());
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
          <img src={auth} alt="Login" />
        </div>

        <div className="container mx-auto max-lg:w-3/4 form-content flex justify-center w-full lg:w-1/2  ">
          <div className="form-content w-full ">
            <Heading title="Login to your account" />
            <p className="mt-3 text-lg">Enter your details below</p>
            <form
              className="flex flex-col w-full mt-8"
              onSubmit={handleSubmit(loginSubmit)}
            >
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full  "
              />
              {errors.email && (
                <p className="text-red-500 mt-2 ">{errors.email?.message}</p>
              )}

              <input
                {...register("password")}
                type="password"
                placeholder="Password"
                className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full  mt-5"
              />

              {errors.password && (
                <p className="text-red-500 mt-2 ">{errors.password?.message}</p>
              )}

              <Link to="/forget-password" className="mt-5 text-sm  ">
                <p>Forget Password?</p>
              </Link>

              <div className="btns flex flex-col gap-4  mt-8 max-lg:w-full w-3/4">
                <Button className="py-6 " type="submit" disabled={isSubmitting}>
                  {isSubmitting ? <Loader /> : "Login"}
                </Button>
                <Button
                  type="button"
                  className="py-6  bg-transparent border-black border-solid border-1 text-black hover:bg-black hover:text-white flex gap-2"
                  onClick={googleSignUpHandler}
                >
                  <img src={google} alt="google" className="w-7" />
                  Sign in with Google
                </Button>
                <p className="text-center ">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="font-semibold border-b-1 border-solid border-black"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default Login;
