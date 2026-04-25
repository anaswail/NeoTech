import { createSlice } from "@reduxjs/toolkit";
import type { WishlistData } from "@/types";
import { actGetMyWishlist } from "./act/actGetMyWishlist";

interface initialTypes {
  data: WishlistData | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | null | any;
}

const initialState: initialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const getWishlistSlice = createSlice({
  name: "myWishlist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetMyWishlist.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetMyWishlist.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload.data;
      })
      .addCase(actGetMyWishlist.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload as string;
      });
  },
});

export default getWishlistSlice.reducer;
