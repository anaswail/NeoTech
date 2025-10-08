import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/auth/registerSlice";
import { actEditProfile } from "@/store/slices/profile/act/actEditProfile";
import type { AppDispatch } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import z from "zod";
import { useState } from "react";

const MyProfile = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Logout function
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

  // Form validation schema
  const editProfileSchema = z.object({
    name: z
      .string()
      .min(3, "Characters must be more than 3 ")
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .email("Invalid Email address")
      .optional()
      .or(z.literal("")),
  });

  type editProfileSchemaType = z.infer<typeof editProfileSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<editProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
  });

  // image upload
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleEditProfile = async ({ name, email }: editProfileSchemaType) => {
    try {
      const formData = new FormData();

      if (file) {
        if (!file.type.startsWith("image/"))
          throw new Error("Only images allowed");
        if (file.size > 2 * 1024 * 1024) throw new Error("Max 2MB");
        formData.append("avatar", file);
      }

      if (name) formData.append("name", name);
      if (email) {
      }

      const result = await dispatch(actEditProfile(formData)).unwrap();

      Swal.fire({
        position: "top",
        icon: "success",
        title: result.message || "Profile updated successfully",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error: any) {
      Swal.fire({
        position: "top",
        icon: "error",
        title: error.message || "Something went wrong, try again",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  return (
    <div>
      <h1 className="text-xl lg:text-2xl mt-4 lg:mt-6 text-txt-secondary2">
        Edit your profile
      </h1>
      <form
        className="flex flex-col mt-8"
        onSubmit={handleSubmit(handleEditProfile)}
      >
        {/* Avatar Preview */}

        {/* File Input */}
        <div className="mb-4">
          <label
            htmlFor="upload"
            className="cursor-pointer inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Choose Profile Picture
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="upload"
            className="hidden"
          />
          {file && <p className="mt-2 text-sm text-gray-600">{file.name}</p>}
        </div>

        <input
          {...register("name")}
          placeholder="Name"
          className="outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-110 mt-5"
        />
        {errors.name && (
          <p className="text-red-500 mt-2">{errors.name?.message}</p>
        )}

        <input
          {...register("email")}
          placeholder="Email"
          className="outline-none p-5 border-b-1 border-txt-gray/80 border-b-solid pb-2 placeholder-txt-gray/80 w-110 mt-5"
        />
        {errors.email && (
          <p className="text-red-500 mt-2">{errors.email?.message}</p>
        )}

        <Button
          className="py-6 w-1/2 my-8"
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
