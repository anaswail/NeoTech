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
import { actRegister } from "@/store/slices/auth/act/actRegister";
import { useEffect } from "react";
import Swal from "sweetalert2";

const SignUp = () => {
  const SignUpSchema = z
    .object({
      name: z
        .string()
        .min(1, "Name is required")
        .min(3, "Name must be at least contain 3 characters"),
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid Email address"),
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

  type SignUpSchemaType = z.infer<typeof SignUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });
  const {
    loading,
    data,
    error: registerError,
  } = useSelector((state: RootState) => state.register);
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  useEffect(() => {
    if (loading === "fulfilled") {
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Account created successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        navigate("/");
        window.location.reload();
      }, 2000);
    } else if (loading === "rejected") {
      Swal.fire({
        position: "top",
        icon: "error",
        title: registerError ? registerError : "Invalid email or password",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  }, [data.token, data.user, registerError, loading]);

  const registerSubmit = (data: SignUpSchemaType) => {
    dispatch(actRegister(data)).unwrap();
  };

  return (
    <div className="flex mt-25  ">
      <div className="img-sec mt-5 bg-[#CBE4E8] h-full w-1/2 flex justify-center items-center">
        <img src={auth} alt="SignUp" />
      </div>

      <div className="form-content flex justify-center w-1/2 ">
        <div className="form-content ">
          <Heading title="Create an account" />
          <p className="mt-3 text-lg">Enter your details below</p>
          <form
            className="flex flex-col  mt-8 "
            onSubmit={handleSubmit(registerSubmit)}
          >
            <input
              {...register("name")}
              placeholder="Name"
              className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-110"
            />
            {errors.name && (
              <p className="text-red-500 mt-2 ">{errors.name?.message}</p>
            )}

            <input
              {...register("email")}
              placeholder="Email"
              className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-110 mt-5"
            />
            {errors.email && (
              <p className="text-red-500 mt-2 ">{errors.email?.message}</p>
            )}

            <input
              {...register("password")}
              placeholder="Password"
              className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-110 mt-5"
            />
            {errors.password && (
              <p className="text-red-500 mt-2 ">{errors.password?.message}</p>
            )}

            <input
              {...register("confirmPassword")}
              placeholder="Confirm Password"
              className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-110 mt-5"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 mt-2 ">
                {errors.confirmPassword?.message}
              </p>
            )}

            <div className="btns flex flex-col gap-4 items-center mt-8">
              <Button
                className="py-6 w-full"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? <Loader /> : "Create Account"}
              </Button>
              <Button className="py-6 w-full bg-transparent border-black border-solid border-1 text-black hover:bg-black hover:text-white flex gap-2">
                <img src={google} alt="google" className="w-7" />
                Sign Up with Google
              </Button>
              <p>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold border-b-1 border-solid border-black"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
