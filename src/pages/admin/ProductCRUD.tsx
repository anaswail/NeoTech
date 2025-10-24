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

const ProductCRUD = () => {
  // Login Store
  // const { loading, data, error } = useSelector(
  //   (state: RootState) => state.login
  // );
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
  // useEffect(() => {
  //   if (loading === "fulfilled") {
  //     Swal.fire({
  //       position: "top",
  //       icon: "success",
  //       title: "Login Successfully",
  //       showConfirmButton: false,
  //       timer: 1500,
  //     });

  //     setTimeout(() => {
  //       navigate("/");
  //       window.location.reload();
  //     }, 1500);
  //   } else if (loading === "rejected") {
  //     Swal.fire({
  //       position: "top",
  //       icon: "error",
  //       title: "InCorrect email or password",
  //       showConfirmButton: false,
  //       timer: 2000,
  //     });
  //   }
  // }, [data.token, data.user, error, loading]);

  // submit handler
  const handleAddProduct = (data: LoginSchemaType) => {
    dispatch(actLogin(data)).unwrap();
  };

  return (
    <>
      <div className="container mx-auto max-lg:w-3/4 form-content flex justify-center w-full lg:w-1/2  ">
        <div className="form-content w-full ">
          <Heading title="Create an account" />
          <p className="mt-3 text-lg">Enter your details below</p>
          <form
            className="flex flex-col w-full mt-8"
            onSubmit={handleSubmit(handleAddProduct)}
          >
            <input
              {...register("email")}
              placeholder="Email"
              className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full  "
            />
            {errors.email && (
              <p className="text-red-500 mt-2 ">{errors.email?.message}</p>
            )}

            <input
              {...register("password")}
              placeholder="Password"
              className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-3/4 max-lg:w-full  mt-5"
            />

            {errors.password && (
              <p className="text-red-500 mt-2 ">{errors.password?.message}</p>
            )}

            <Link to="forget-password" className="mt-5 text-sm  ">
              <p>Forget Password?</p>
            </Link>

            <div className="btns flex flex-col gap-4  mt-8 max-lg:w-full w-3/4">
              <Button className="py-6 " type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader /> : "Login"}
              </Button>
              <Button className="py-6  bg-transparent border-black border-solid border-1 text-black hover:bg-black hover:text-white flex gap-2">
                <img src={google} alt="google" className="w-7" />
                Sign Up with Google
              </Button>
              <p className="text-center ">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold border-b-1 border-solid border-black"
                >
                  signup
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductCRUD;
