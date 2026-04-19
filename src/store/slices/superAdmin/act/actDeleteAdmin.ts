import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actDeleteAdmin = createAsyncThunk(
  "admin/deleteAdmin",
  async ({ adminId }: { adminId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(
        `api/superadmin/admins/${adminId}`,
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        },
      );
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data.message || "SomeThing went wrong",
      );
    }
  },
);
