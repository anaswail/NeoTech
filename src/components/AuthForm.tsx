import Heading from "@/components/Heading";
import auth from "../assets/auth.png";
import google from "../assets/google.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SyncLoader } from "react-spinners";
import type { ILoadingTypes } from "@/types";
// import { actGoogleAuth } from "../../store/slices/auth/act/actGoogleAuth";

interface IAuthFormSubmit {
  onSubmit: (data: any) => void;
  authType: "signup" | "login" | "createAdmin";
  loading: ILoadingTypes;
  googleAuth?: (data: any) => void;
}

const AuthFormSubmit = ({
  onSubmit,
  authType,
  loading,
  googleAuth,
}: IAuthFormSubmit) => {
  // React Hook Form & Zod Schema
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
          "Password must contain at least one lowercase character",
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
    register: createAccountRegister,
    handleSubmit: handleCreateAccountSubmit,
    formState: { errors: createAccountErrors, isSubmitting: isCreatingAccount },
  } = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
  });

  const LoginSchema = z.object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid Email address"),
    password: z.string().min(1, "Password is required"),
  });
  type LoginSchemaType = z.infer<typeof LoginSchema>;
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors, isSubmitting: isLoggingIn },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });

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
          <img src={auth} alt={authType} />
        </div>

        <div className=" container mx-auto max-lg:w-3/4 form-content flex justify-center w-full lg:w-1/2  ">
          <div className="form-content w-full ">
            <Heading
              title={
                authType === "signup"
                  ? "Create an account"
                  : authType === "createAdmin"
                    ? "Create an Admin"
                    : "Login to your account"
              }
            />
            <p className="mt-3 text-lg">Enter your details below</p>
            <form
              className="flex flex-col w-full  mt-8 "
              onSubmit={
                authType === "signup" || authType === "createAdmin"
                  ? handleCreateAccountSubmit(onSubmit)
                  : handleLoginSubmit(onSubmit)
              }
            >
              {authType === "createAdmin" || authType === "signup" ? (
                <>
                  <input
                    {...createAccountRegister("name")}
                    placeholder="Name"
                    className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full "
                  />
                  {createAccountErrors.name && (
                    <p className="text-red-500 mt-2 ">
                      {createAccountErrors.name?.message}
                    </p>
                  )}
                </>
              ) : (
                ""
              )}

              {authType === "signup" || authType === "createAdmin" ? (
                <>
                  <input
                    {...createAccountRegister("email")}
                    placeholder="Email"
                    className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full  mt-5"
                  />
                  {createAccountErrors.email && (
                    <p className="text-red-500 mt-2 ">
                      {createAccountErrors.email?.message}
                    </p>
                  )}
                  <input
                    {...createAccountRegister("password")}
                    placeholder="Password"
                    className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full mt-5"
                  />
                  {createAccountErrors.password && (
                    <p className="text-red-500 mt-2 ">
                      {createAccountErrors.password?.message}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <input
                    {...loginRegister("email")}
                    placeholder="Email"
                    className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full  mt-5"
                  />
                  {loginErrors.email && (
                    <p className="text-red-500 mt-2 ">
                      {loginErrors.email?.message}
                    </p>
                  )}
                  <input
                    {...loginRegister("password")}
                    placeholder="Password"
                    className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full mt-5"
                  />
                  {loginErrors.password && (
                    <p className="text-red-500 mt-2 ">
                      {loginErrors.password?.message}
                    </p>
                  )}
                </>
              )}

              {authType === "createAdmin" || authType === "signup" ? (
                <>
                  <input
                    {...createAccountRegister("confirmPassword")}
                    placeholder="Confirm Password"
                    className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full mt-5"
                  />
                  {createAccountErrors.confirmPassword && (
                    <p className="text-red-500 mt-2 ">
                      {createAccountErrors.confirmPassword?.message}
                    </p>
                  )}
                </>
              ) : (
                ""
              )}

              <div className="btns flex flex-col gap-4  mt-8 max-lg:w-full w-3/4">
                <Button
                  className="py-6 "
                  type="submit"
                  disabled={isCreatingAccount || isLoggingIn}
                >
                  {authType === "createAdmin"
                    ? "Create Admin Account"
                    : authType === "signup"
                      ? "Create Account"
                      : "Login"}
                </Button>
                {authType !== "createAdmin" && (
                  <>
                    <Button
                      onClick={googleAuth}
                      type="button"
                      className="py-6  bg-transparent border-black border-solid border-1 text-black hover:bg-black hover:text-white flex gap-2"
                    >
                      <img src={google} alt="google" className="w-7" />
                      Sign Up with Google
                    </Button>
                    <p className="text-center ">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-semibold border-b-1 border-solid border-black "
                      >
                        Login
                      </Link>
                    </p>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
};

export default AuthFormSubmit;
