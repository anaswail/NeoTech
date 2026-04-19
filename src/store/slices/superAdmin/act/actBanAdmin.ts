import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actBanAdmin = createAsyncThunk(
  "superadmin/banAdmin",
  async ({ adminId }: { adminId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch(
        `api/superadmin/admins/${adminId}/ban`,
        null,
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
