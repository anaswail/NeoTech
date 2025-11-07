// import axiosApi from "@/axios/axiosApi";
import axiosApi from "@/axios/axiosApi";
import type { IRegisterUser } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const actRegister = createAsyncThunk(
  "auth/register",
  async (
    { name, email, password, confirmPassword }: IRegisterUser,
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosApi.post(
        "api/auth/register",
        {
          name,
          email,
          password,
          confirmPassword,
        },
        {
          withCredentials: true,
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
