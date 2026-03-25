import type { ICreateOrder } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ICreateOrder = {
  items: null,
  shippingAddress: {
    name: null,
    companyName: null,
    streetAddress: null,
    city: null,
    phoneNumber: null,
    email: null,
  },
  paymentMethod: "credit_card",
  shippingCost: null,
};

const createOrderSlice = createSlice({
  name: "createOrder",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default createOrderSlice.reducer;
