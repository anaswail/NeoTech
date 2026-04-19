// import axiosApi from "@/axios/axiosApi";
import axiosApi from "@/axios/axiosApi";
import type { IRegisterUser } from "@/types";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actCreateAdmin = createAsyncThunk(
  "superadmin/createAdmin",
  async (
    { name, email, password, confirmPassword }: IRegisterUser,
    { rejectWithValue },
  ) => {
    try {
      const response = await axiosApi.post(
        "api/superadmin/admins",
        {
          name,
          email,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        },
      );

      return { user: response.data as IRegisterUser };
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  },
);
