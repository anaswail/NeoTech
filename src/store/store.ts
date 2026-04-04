import { configureStore } from "@reduxjs/toolkit";
import products from "./slices/products/productsSlice";
import productId from "./slices/products/getProductByIdSlice";
import home from "./slices/products/getHomeDataSlice";
import cart from "./slices/cartSlice";
import register from "./slices/auth/registerSlice";
import login from "./slices/auth/loginSlice";
import profile from "./slices/profile/getMyProfileSlice";
import editProfile from "./slices/profile/editProfileSlice";
import google from "./slices/auth/googleAuth";
import forgetPassword from "./slices/auth/forgetPasswordSlice";
import resetPassword from "./slices/auth/resetPassowrdSlice";
import resendEmail from "./slices/auth/resendEmailVerificationSlice";
import VerifyEmail from "./slices/auth/verifyEmailSlice";
import refreshToken from "./slices/auth/refreshTokenSlice";
import editEmail from "./slices/profile/editEmailSlice";
import category from "./slices/products/getCategoryBySlugSlice";
import newProduct from "./slices/products/addProductSlice";
import deleteProduct from "./slices/products/deleteProductSlice";
import upMainProductInfo from "./slices/products/updateMainProductInfoSlice";
import updateProductImg from "./slices/products/updateProductImgSlice";
import updateVariations from "./slices/products/updateProductVariations";
import analysis from "./slices/admin/getAnalysicsSlice";
import users from "./slices/admin/getUsersSlice";
import banUser from "./slices/admin/banUsersSlice";
import unBanUser from "./slices/admin/unBanUsersSlice";
import deleteUser from "./slices/admin/deleteUsersSlice";
import getOrders from "./slices/admin/getOrdersSlice";
import shipmentStatus from "./slices/admin/updateOrderStatusSlice";
import orderStatus from "./slices/admin/updateOrderStatusSlice";
import paymentStatus from "./slices/admin/updatePaymentStatusSlice";

export const store = configureStore({
  reducer: {
    home,
    products,
    productId,
    cart,
    register,
    login,
    profile,
    editProfile,
    google,
    forgetPassword,
    resetPassword,
    resendEmail,
    VerifyEmail,
    refreshToken,
    editEmail,
    category,
    newProduct,
    deleteProduct,
    upMainProductInfo,
    updateProductImg,
    updateVariations,
    analysis,
    users,
    banUser,
    unBanUser,
    deleteUser,
    getOrders,
    shipmentStatus,
    orderStatus,
    paymentStatus,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
