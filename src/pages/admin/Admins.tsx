import profileImg from "../../assets/profile.png";
import { actGetAllAdmins } from "@/store/slices/superAdmin/act/actGetAllAdmins";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BadgeAlert,
  BadgeCheck,
  Ban,
  Trash2,
  MapPin,
  CalendarDays,
  ShieldCheck,
  WifiOff,
  CircleChevronDown,
  ShieldUser,
  XCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import { actBanAdmin } from "@/store/slices/superAdmin/act/actBanAdmin";
import { actUnBanAdmin } from "@/store/slices/superAdmin/act/actUnBanAdmin";
import { actDeleteAdmin } from "@/store/slices/superAdmin/act/actDeleteAdmin";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const formatDate = (dateStr: string) =>
  new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const getRoleBadgeStyle = (role: string) => {
  switch (role.toLowerCase()) {
    case "superadmin":
      return "bg-purple-100 text-purple-700 border border-purple-200";
    case "admin":
      return "bg-blue-100 text-blue-700 border border-blue-200";
    default:
      return "bg-gray-100 text-gray-600 border border-gray-200";
  }
};

const Admins = () => {
  const { data, loading } = useSelector(
    (state: RootState) => state.getAllAdmins,
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(actGetAllAdmins());
  }, [dispatch]);

  type AdminAction = "ban" | "unban" | "delete";

  const handleAdminAction = async ({
    adminId,
    action,
  }: {
    adminId: string;
    action: AdminAction;
  }) => {
    const dialogText =
      action === "ban"
        ? "You'll ban this admin and they won't be able to access their account!"
        : action === "unban"
          ? "You'll unban this admin and they will be able to access their account again!"
          : "You'll delete this admin and they will lose all access permanently forever!";

    const confirmButtonText =
      action === "ban"
        ? "Yes, ban it!"
        : action === "unban"
          ? "Yes, unban it!"
          : "Yes, delete it!";

    const result = await Swal.fire({
      title: "Are you sure?",
      text: dialogText,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText,
    });

    if (!result.isConfirmed) return;

    try {
      if (action === "ban") {
        await dispatch(actBanAdmin({ adminId })).unwrap();
      } else if (action === "unban") {
        await dispatch(actUnBanAdmin({ adminId })).unwrap();
      } else {
        await dispatch(actDeleteAdmin({ adminId })).unwrap();
      }

      Swal.fire({
        title:
          action === "delete"
            ? "Deleted!"
            : action === "ban"
              ? "Banned!"
              : "Unbanned!",
        text:
          action === "delete"
            ? "The admin has been deleted successfully."
            : action === "ban"
              ? "The admin has been banned successfully."
              : "The admin has been unbanned successfully.",
        icon: "success",
      });
      dispatch(actGetAllAdmins());
    } catch (error: any) {
      Swal.fire({
        title: "Error!",
        text:
          error?.message || "An error occurred while processing the request.",
        icon: "error",
      });
    }
  };

  const admins = data?.data?.admins;

  if (loading === "pending") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center animate-pulse">
          <ShieldUser size={20} className="text-indigo-300" />
        </div>
        <p className="text-sm text-gray-400 font-medium">
          Loading your orders…
        </p>
      </div>
    );
  }

  if (loading === "rejected") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
          <XCircle size={20} className="text-red-400" />
        </div>
        <p className="text-sm text-gray-500 font-medium">
          Failed to load orders
        </p>
        <button
          onClick={() => dispatch(actGetAllAdmins())}
          className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admins</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {data?.data?.admins.length ?? 0} total admins
          </p>
        </div>

        <Button className="rounded-sm">
          <Link to="/dashboard/create-admin"> + Add admin</Link>
        </Button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {admins?.map((admin, index) => (
          <div
            key={admin._id ?? index}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Status bar at top */}
            <div
              className={`h-1 w-full ${admin.isActive ? "bg-green-400" : "bg-txt-secondary2"}`}
            />

            <div className="p-4">
              {/* Top row: avatar + actions */}
              <div className="flex items-start justify-between mb-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-100">
                    <img
                      src={admin?.avatar?.secure_url || profileImg}
                      alt={admin.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Email verified badge */}
                  <span className="absolute -bottom-1 -right-1">
                    {admin.isEmailVerified ? (
                      <BadgeCheck className="w-5 h-5 text-green-500 bg-white rounded-full" />
                    ) : (
                      <BadgeAlert className="w-5 h-5 text-amber-500 bg-white rounded-full" />
                    )}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <button
                    className="cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete admin"
                    onClick={() =>
                      handleAdminAction({
                        adminId: admin._id,
                        action: "delete",
                      })
                    }
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    className="cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                    title={admin.isActive ? "Ban admin" : "Unban admin"}
                    onClick={() =>
                      handleAdminAction({
                        adminId: admin._id,
                        action: admin.isActive ? "ban" : "unban",
                      })
                    }
                  >
                    {admin.isActive ? (
                      <Ban className="w-5 h-5" />
                    ) : (
                      <CircleChevronDown className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Name + Role */}
              <div className="mb-1 flex items-center gap-2 flex-wrap">
                <h2 className="text-sm font-semibold text-gray-900 truncate max-w-[140px]">
                  {admin.name}
                </h2>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${getRoleBadgeStyle(admin.role)}`}
                >
                  {admin.role}
                </span>
              </div>

              {/* Email */}
              <p className="text-xs text-gray-500 truncate mb-3">
                {admin.email}
              </p>

              {/* Divider */}
              <div className="border-t border-gray-50 my-3" />

              {/* Extra info */}
              <div className="space-y-1.5">
                {admin.address && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                    <span className="truncate">{admin.address}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span className="capitalize">{admin.provider}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CalendarDays className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span>Joined {formatDate(admin.createdAt)}</span>
                </div>
              </div>

              {/* Active / Inactive pill */}
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    admin.isActive
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {admin.isActive ? (
                    <>
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      Active
                    </>
                  ) : (
                    <>
                      <WifiOff className="w-3 h-3" />
                      Inactive
                    </>
                  )}
                </span>

                <span className="text-[10px] text-gray-400">
                  {admin.isEmailVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {(!admins || admins.length === 0) && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-lg font-medium">No admins found</p>
          <p className="text-sm mt-1">Admins will appear here once loaded.</p>
        </div>
      )}
    </div>
  );
};

export default Admins;
