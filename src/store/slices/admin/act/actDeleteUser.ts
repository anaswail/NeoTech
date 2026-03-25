import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actDeleteUser = createAsyncThunk(
  "admin/deleteUser",
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosApi.delete(`api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (err: any) {
      return rejectWithValue(
        err?.response?.data.message || "SomeThing went wrong",
      );
    }
  },
);
