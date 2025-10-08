import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
export type IEditProfile = FormData;

export const actEditProfile = createAsyncThunk(
  "profile/editProfile",

  async (formData: FormData, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/users/me",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
