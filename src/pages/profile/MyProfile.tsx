import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/auth/registerSlice";
import { actEditProfile } from "@/store/slices/profile/act/actEditProfile";
import type { AppDispatch, RootState } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import z from "zod";

const MyProfile = () => {
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't to delete your account from this device!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success!",
          text: "Your account loggedOut from this device successfully.",
          icon: "success",
        });
        setTimeout(() => {
          dispatch(logout());
          window.location.reload();
        }, 1500);
      }
    });
  };

  // const { loading, data, error } = useSelector(
  //   (state: RootState) => state.editProfile
  // );
  const dispatch = useDispatch<AppDispatch>();
  const editProfileSchema = z.object({
    email: z
      .string()
      .email("Invalid Email address")
      .optional()
      .or(z.literal("")), // يقبل فاضي
    name: z
      .string()
      .min(3, "Characters must be more than 3 ")
      .optional()
      .or(z.literal("")), // يقبل فاضي
  });

  type editProfileSchemaType = z.infer<typeof editProfileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
  });

  const handleEditProfile = ({ name, email }: editProfileSchemaType) => {
    const payload: { name?: string; email?: string } = {};

    if (name) payload.name = name;
    if (email) payload.email = email;

    if (Object.keys(payload).length > 0) {
      dispatch(actEditProfile(payload)).unwrap();
    }
  };

  return (
    <div>
      <h1 className="text-xl lg:text-2xl  mt-4 lg:mt-6 text-txt-secondary2">
        Edit your profile
      </h1>
      <form
        className="flex flex-col  mt-8 "
        onSubmit={handleSubmit(handleEditProfile)}
      >
        <input
          {...register("name")}
          placeholder="Name"
          className=" outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-110 mt-5"
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

        <Button
          className="py-6 w-1/2 my-8 "
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? <Loader /> : "Save changes"}
        </Button>
      </form>
      <Button className="w-30 text-md py-5" onClick={handleLogout}>
        Log out
      </Button>
    </div>
  );
};

export default MyProfile;
