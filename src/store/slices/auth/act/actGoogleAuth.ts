import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actGoogleAuth = createAsyncThunk(
  "auth/google",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/auth/social/google"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("SomeThing went wrong");
    }
  }
);
