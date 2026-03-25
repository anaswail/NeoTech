import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actUnBanUsers = createAsyncThunk(
  "admin/unBanUsers",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch(
        `api/admin/users/${userId}/unban`,
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
