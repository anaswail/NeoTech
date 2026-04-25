import { useDispatch, useSelector } from "react-redux";
import profileImg from "../../assets/profile.png";
import { type AppDispatch, type RootState } from "@/store/store";
import { useEffect } from "react";
import { actGetUsers } from "@/store/slices/admin/act/actGetUsers";
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
  User,
  XCircle,
} from "lucide-react";
import { actBanUsers } from "@/store/slices/admin/act/actBanUsers";
import { actUnBanUsers } from "@/store/slices/admin/act/actUnBanUsers";
import { actDeleteUser } from "@/store/slices/admin/act/actDeleteUser";
import Swal from "sweetalert2";

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

const Customers = () => {
  const { data, loading } = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();
  const { error: banUserError } = useSelector(
    (state: RootState) => state.banUser,
  );
  const { error: unBanUserError } = useSelector(
    (state: RootState) => state.unBanUser,
  );
  const { error: deleteUserError } = useSelector(
    (state: RootState) => state.deleteUser,
  );

  useEffect(() => {
    dispatch(actGetUsers());
  }, [dispatch]);

  type UserAction = "ban" | "unban" | "delete";

  const handleUserAction = async ({
    userId,
    action,
  }: {
    userId: string;
    action: UserAction;
  }) => {
    const dialogText =
      action === "ban"
        ? "You'll ban this user and they won't be able to access their account!"
        : action === "unban"
          ? "You'll unban this user and they will be able to access their account again!"
          : "You'll delete this user and they will lose all access permanently forever!";

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
        await dispatch(actBanUsers({ userId })).unwrap();
      } else if (action === "unban") {
        await dispatch(actUnBanUsers({ userId })).unwrap();
      } else {
        await dispatch(actDeleteUser({ userId })).unwrap();
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
            ? "The user has been deleted successfully."
            : action === "ban"
              ? "The user has been banned successfully."
              : "The user has been unbanned successfully.",
        icon: "success",
      });
      dispatch(actGetUsers());
    } catch (error: any) {
      const errMessage =
        action === "delete"
          ? deleteUserError?.message || error?.message
          : action === "ban"
            ? banUserError?.message || error?.message
            : unBanUserError?.message || error?.message;

      Swal.fire({
        title: "Error!",
        text: errMessage || "An error occurred while processing the request.",
        icon: "error",
      });
    }
  };

  if (loading === "pending") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center animate-pulse">
          <User size={20} className="text-indigo-300" />
        </div>
        <p className="text-sm text-gray-400 font-medium">Loading your users…</p>
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
          Failed to load Users
        </p>
        <button
          onClick={() => dispatch(actGetUsers())}
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
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {data?.users?.length ?? 0} total users
          </p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {data?.users?.map((user, index) => (
          <div
            key={user._id ?? index}
            className="group relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden"
          >
            {/* Status bar at top */}
            <div
              className={`h-1 w-full ${user.isActive ? "bg-green-400" : "bg-txt-secondary2"}`}
            />

            <div className="p-4">
              {/* Top row: avatar + actions */}
              <div className="flex items-start justify-between mb-3">
                {/* Avatar */}
                <div className="relative">
                  <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-gray-100">
                    <img
                      src={user?.avatar?.secure_url || profileImg}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Email verified badge */}
                  <span className="absolute -bottom-1 -right-1">
                    {user.isEmailVerified ? (
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
                    title="Delete user"
                    onClick={() =>
                      handleUserAction({ userId: user._id, action: "delete" })
                    }
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    className="cursor-pointer p-1.5 rounded-lg text-gray-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                    title={user.isActive ? "Ban user" : "Unban user"}
                    onClick={() =>
                      handleUserAction({
                        userId: user._id,
                        action: user.isActive ? "ban" : "unban",
                      })
                    }
                  >
                    {user.isActive ? (
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
                  {user.name}
                </h2>
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded-full capitalize ${getRoleBadgeStyle(user.role)}`}
                >
                  {user.role}
                </span>
              </div>

              {/* Email */}
              <p className="text-xs text-gray-500 truncate mb-3">
                {user.email}
              </p>

              {/* Divider */}
              <div className="border-t border-gray-50 my-3" />

              {/* Extra info */}
              <div className="space-y-1.5">
                {user.address && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                    <span className="truncate">{user.address}</span>
                  </div>
                )}

                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span className="capitalize">{user.provider}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <CalendarDays className="w-3.5 h-3.5 shrink-0 text-gray-400" />
                  <span>Joined {formatDate(user.createdAt)}</span>
                </div>
              </div>

              {/* Active / Inactive pill */}
              <div className="mt-3 flex items-center justify-between">
                <span
                  className={`inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-full ${
                    user.isActive
                      ? "bg-green-50 text-green-600"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {user.isActive ? (
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
                  {user.isEmailVerified ? "Verified" : "Unverified"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {(!data?.users || data.users.length === 0) && (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-lg font-medium">No customers found</p>
          <p className="text-sm mt-1">Users will appear here once loaded.</p>
        </div>
      )}
    </div>
  );
};

export default Customers;
