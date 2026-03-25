import axiosApi from "@/axios/axiosApi";
import type { ICreateOrder } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";


const actCreateOrder = createAsyncThunk("orders/createOrder", 
    async (orderData: ICreateOrder, {rejectWithValue})=>{
        try {
            const resposne = await axiosApi.post("")
        } catch (error: any) {
            
        }
})