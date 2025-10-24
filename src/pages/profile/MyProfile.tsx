import { Button } from "@/components/ui/button";
import { logout } from "@/store/slices/auth/registerSlice";
import { actEditProfile } from "@/store/slices/profile/act/actEditProfile";
import type { AppDispatch } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader, Upload } from "lucide-react";
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
      text: "You want to log out from this device!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Log Out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Success!",
          text: "Your account logged out from this device successfully.",
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
      .min(3, "Characters must be more than 3")
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
    <div className="w-full md:max-md-4xl mx-auto px-4 sm:px-6 lg:px-0">
      <h1 className="text-lg sm:text-xl lg:text-2xl mt-4 lg:mt-6 text-txt-secondary2 font-semibold">
        Edit your profile
      </h1>

      <form
        className="flex flex-col mt-6 sm:mt-8"
        onSubmit={handleSubmit(handleEditProfile)}
      >
        {/* File Input */}
        <div className="mb-6">
          <label
            htmlFor="upload"
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 bg-blue-500 text-white text-sm sm:text-base rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Upload size={18} />
            <span>Choose Profile Picture</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            id="upload"
            className="hidden"
          />
          {file && (
            <p className="mt-2 text-sm text-gray-600 break-all">
              Selected: {file.name}
            </p>
          )}
        </div>

        {/* Name Input */}
        <div className="mb-5">
          <input
            {...register("name")}
            placeholder="Name"
            className="outline-none p-3 sm:p-4 lg:p-5 border-b border-txt-gray/80 pb-2 placeholder-txt-gray/80 w-full text-sm sm:text-base focus:border-txt-secondary2 transition-colors"
          />
          {errors.name && (
            <p className="text-red-500 text-xs sm:text-sm mt-2">
              {errors.name?.message}
            </p>
          )}
        </div>

        {/* Email Input */}
        <div className="mb-6">
          <input
            {...register("email")}
            placeholder="Email"
            className="outline-none p-3 sm:p-4 lg:p-5 border-b border-txt-gray/80 pb-2 placeholder-txt-gray/80 w-full text-sm sm:text-base focus:border-txt-secondary2 transition-colors"
          />
          {errors.email && (
            <p className="text-red-500 text-xs sm:text-sm mt-2">
              {errors.email?.message}
            </p>
          )}
        </div>

        {/* Save Button */}
        <Button
          className="py-5 sm:py-6 w-full sm:w-2/3 lg:w-1/2 my-6 sm:my-8 text-sm sm:text-base"
          type="submit"
          disabled={!isChanged || isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" size={18} />
              Saving...
            </span>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 pb-8">
        <Button
          className="w-full sm:w-auto text-sm sm:text-base py-4 sm:py-5 px-6"
          onClick={handleLogout}
        >
          Log out
        </Button>
        <Button
          className="w-full sm:w-auto text-sm sm:text-base py-4 sm:py-5 px-6 bg-blue-800 hover:bg-blue-600"
          onClick={refreshToken}
        >
          Refresh Token
        </Button>
      </div>
    </div>
  );
};

export default MyProfile;
