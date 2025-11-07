import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actUpdateProductImg } from "./act/actUpdateProductImg";

interface initialTypes {
  data: null | FormData;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: null | string | any;
}

const initialState: initialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const updateProductImgSlice = createSlice({
  name: "updateProductImg",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actUpdateProductImg.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdateProductImg.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.data = action.payload;
      })
      .addCase(
        actUpdateProductImg.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "failed";
          state.error = action.payload;
        }
      );
  },
});

export default updateProductImgSlice.reducer;