import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actUpdateVariations } from "./act/actUpdateVariations";

interface initialStateType {
  data: any;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null;
}

const initialState: initialStateType = {
  data: null,
  loading: "idle",
  error: null,
};

const updateProductVariations = createSlice({
  name: "updateProductVariations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actUpdateVariations.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actUpdateVariations.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(
        actUpdateVariations.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        }
      );
  },
});

export default updateProductVariations.reducer;
