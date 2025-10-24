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
import { useEffect, useState } from "react";
import { actEditEmail } from "@/store/slices/profile/act/actEditEmail";
import { actRefreshToken } from "@/store/slices/auth/act/actRefreshToken";

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
    watch,
    formState: { isDirty, errors, isSubmitting },
  } = useForm<editProfileSchemaType>({
    resolver: zodResolver(editProfileSchema),
  });
  const watchedValues = watch();
  const [isChanged, setIsChanged] = useState(false);

  // image upload
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const hasFormChanges = isDirty || file !== null;
    setIsChanged(hasFormChanges);
  }, [isDirty, file, watchedValues]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  // Handle form submission
  interface EditProfileSchemaType {
    name?: string;
    email?: string;
  }

  interface IApiResponse {
    message: string;
  }

  const handleEditProfile = async ({
    name,
    email,
  }: editProfileSchemaType): Promise<void> => {
    try {
      const promises: Promise<IApiResponse>[] = [];

      if (file || name) {
        const formData = new FormData();

        if (file) {
          if (!file.type.startsWith("image/")) {
            throw new Error("Only images allowed");
          }
          if (file.size > 2 * 1024 * 1024) {
            throw new Error("Max 2MB");
          }
          formData.append("avatar", file);
        }

        if (name) formData.append("name", name);

        promises.push(dispatch(actEditProfile(formData)).unwrap());
      }

      if (email) {
        promises.push(dispatch(actEditEmail(email)).unwrap());
      }

      if (promises.length === 0) {
        Swal.fire({
          icon: "info",
          title: "No changes made",
          showConfirmButton: false,
          timer: 2000,
        });
        return;
      }

      const results = await Promise.allSettled(promises);

      const successMessages: string[] = [];
      const errorMessages: string[] = [];

      results.forEach((res) => {
        if (res.status === "fulfilled") {
          successMessages.push(res.value.message || "Updated successfully");
        } else if (res.status === "rejected") {
          const reason =
            (res.reason as { message?: string })?.message ||
            "Something went wrong";
          errorMessages.push(reason);
        }
      });

      if (successMessages.length && !errorMessages.length) {
        Swal.fire({
          icon: "success",
          title: successMessages.join(" & "),
          showConfirmButton: false,
          timer: 2000,
        });
      } else if (errorMessages.length && !successMessages.length) {
        Swal.fire({
          icon: "error",
          title: errorMessages.join(" & "),
          showConfirmButton: false,
          timer: 3000,
        });
      } else if (successMessages.length && errorMessages.length) {
        Swal.fire({
          icon: "warning",
          title: "Some updates succeeded, some failed",
          html: `
          <p>✅ ${successMessages.join("<br>✅ ")}</p>
          <p>❌ ${errorMessages.join("<br>❌ ")}</p>
        `,
          showConfirmButton: true,
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: error.message || "Unexpected error occurred",
        showConfirmButton: false,
        timer: 3000,
      });
    }
  };

  const refreshToken = () => {
    dispatch(actRefreshToken());
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
          disabled={!isChanged || isSubmitting}
        >
          {isSubmitting ? <Loader /> : "Save changes"}
        </Button>
      </form>
      <Button className="w-30 text-md py-5" onClick={handleLogout}>
        Log out
      </Button>
      <Button
        className="w-30 text-md py-5 ml-10 bg-blue-800 hover:bg-blue-600"
        onClick={refreshToken}
      >
        refresh Token
      </Button>
    </div>
  );
};

export default MyProfile;
