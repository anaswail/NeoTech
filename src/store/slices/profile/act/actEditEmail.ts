import { userToken } from "@/utils/Repeated";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actEditEmail = createAsyncThunk(
  "profile/editEmail",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        "http://localhost:8000/api/users/email",
        { email },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );

      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.message);
    }
  }
);
