import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { actToggleWishlist } from "./act/actToggleWishlist";

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

const toggleWishlistSlice = createSlice({
  name: "toggleWishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actToggleWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actToggleWishlist.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload.data;
      })
      .addCase(
        actToggleWishlist.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = "rejected";
          state.error = action.payload;
        },
      );
  },
});

export default toggleWishlistSlice.reducer;
