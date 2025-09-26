// import axiosApi from "@/axios/axiosApi";
import type { IRegisterUser } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const actRegister = createAsyncThunk(
  "auth/register",
  async (
    { name, email, password, confirmPassword }: IRegisterUser,
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        {
          name,
          email,
          password,
          confirmPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const token = response.headers["authorization"];

      return { user: response.data as IRegisterUser, token };
    } catch (err: any) {
      return rejectWithValue(err?.response?.data || "SomeThing went wrong");
    }
  }
);
