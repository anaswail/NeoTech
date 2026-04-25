import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actClearWishlist } from "./act/actClearWishlist";

interface initialTypes {
  data: { message: string } | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null | any;
}

const initialState: initialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const clearWishlistSlice = createSlice({
  name: "clearWishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actClearWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actClearWishlist.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload;
      })
      .addCase(
        actClearWishlist.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        },
      );
  },
});

export default clearWishlistSlice.reducer;
