import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/productsSlice";
import cart from "./slices/cartSlice";
import register from "./slices/auth/registerSlice";
import login from "./slices/auth/loginSlice";

export const store = configureStore({
  reducer: { products, cart, register, login },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
