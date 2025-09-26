import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products/productsSlice";
import cart from "./slices/cartSlice";
import register from "./slices/auth/registerSlice";
import login from "./slices/auth/loginSlice";
import profile from "./slices/profile/getMyProfileSlice";

export const store = configureStore({
  reducer: { products, cart, register, login, profile },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
