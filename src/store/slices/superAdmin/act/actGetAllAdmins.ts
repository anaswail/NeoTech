import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actGetAllAdmins = createAsyncThunk(
  "superadmin/GetAllAdmins",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosApi.get("api/superadmin/admins", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  },
);
