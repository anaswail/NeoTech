import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { productsType } from "@/types";

export const actFetchProducts = createAsyncThunk<
  productsType[],
  void,
  { rejectValue: any }
>("products/fetchProducts", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<productsType[]>(
      "http://localhost:3000/products"
    );
    return response.data;
  } catch (err: any) {
    return rejectWithValue(err?.response?.data || "SomeThing went wrong");
  }
});
