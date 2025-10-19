import axiosApi from "@/axios/axiosApi";
import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actEditEmail = createAsyncThunk(
  "profile/editEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axiosApi.patch(
        "api/users/email",
        { email },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
