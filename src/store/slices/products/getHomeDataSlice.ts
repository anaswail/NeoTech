import { createSlice } from "@reduxjs/toolkit";
import { actGetHomeData } from "./act/actGetHomeData";
import { type HomeData } from "../../../types";

interface InitialTypes {
  data: HomeData | null;
  loading: "idle" | "pending" | "fulfilled" | "rejected";
  error: string | any | null;
}

const initialState: InitialTypes = {
  data: null,
  loading: "idle",
  error: null,
};

const getHomeDataSlice = createSlice({
  name: "getHomeData",
  initialState,
  reducers: {},
  extraReducers: (action) => {
    action
      .addCase(actGetHomeData.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetHomeData.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload.data;
      })
      .addCase(actGetHomeData.rejected, (state, action) => {
        state.loading = "rejected";
        state.error = action.payload;
      });
  },
});

export default getHomeDataSlice.reducer;
