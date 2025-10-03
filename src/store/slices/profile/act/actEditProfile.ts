import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");
export interface IEditProfile {
  name?: string | null;
  email?: string | null;
  avatar?: string | null;
}

export const actEditProfile = createAsyncThunk(
  "profile/editProfile",

  async ({ name, avatar }: IEditProfile, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/users/me",
        {
          name,
          avatar,
        },
        {
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
