import { createSlice } from "@reduxjs/toolkit";
import { actGetAnalysis } from "./act/actGetAnalysis";
import { type AnalysisData, type AsyncState } from "../../../types";

type GetAnalysisState = AsyncState<AnalysisData>;

const initialState: GetAnalysisState = {
  data: null,
  loading: "idle",
  error: null,
};

const getAnalysis = createSlice({
  name: "getAnalysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actGetAnalysis.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(actGetAnalysis.fulfilled, (state, action) => {
        state.loading = "fulfilled";
        state.data = action.payload?.data || null;
      })
      .addCase(actGetAnalysis.rejected, (state, action) => {
        state.loading = "rejected";
        state.error =
          action.payload || action.error.message || "Something went wrong";
      });
  },
});

export default getAnalysis.reducer;
