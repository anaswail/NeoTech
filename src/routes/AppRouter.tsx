import { createBrowserRouter, Navigate } from "react-router-dom";
import { userToken } from "@/utils/Repeated";

import SignUp from "@/pages/auth/SignUp";
import Login from "@/pages/auth/Login";
import HomePage from "@/pages/HomePage";
import ProductDetails from "@/pages/ProductDetails";
import ContactUs from "@/pages/ContactUs";
import About from "@/pages/About";
import CartPage from "@/pages/CartPage";
import WishList from "@/pages/profile/WishList";
import ErrorPage from "@/pages/ErrorPage";
import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/pages/CategoryPage";
import AllProducts from "@/pages/AllProducts";
import Profile from "@/pages/profile/Profile";
import MyProfile from "@/pages/profile/MyProfile";
import LastOrders from "@/pages/profile/LastOrders";
import ResetPassword from "@/pages/auth/ResetPassword";
import ForgetPassword from "@/pages/auth/ForgetPassword";
import EmailMessage from "@/pages/auth/EmailMessage";
import VerifyEmail from "@/pages/auth/VerifyEmail";

const user = JSON.parse(localStorage.getItem("user") || "null");

const isEmailVerified = user?.isEmailVerified;

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,

    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "product/:id",
        element: <ProductDetails />,
      },
      {
        path: "category/:title",
        element: <CategoryPage />,
      },
      {
        path: "login",
        element:
          userToken && user !== "null" ? (
            <Navigate to="/" replace />
          ) : (
            <Login />
          ),
      },
      {
        path: "signup",
        element:
          userToken && user !== "null" ? (
            <Navigate to="/" replace />
          ) : (
            <SignUp />
          ),
      },
      {
        path: "contactUs",
        element: <ContactUs />,
      },
      {
        path: "aboutUs",
        element: <About />,
      },
      {
        path: "cart",
        element: userToken ? <CartPage /> : <Navigate to="/" replace />,
      },
      {
        path: "wishlist",
        element: userToken ? <WishList /> : <Navigate to="/" replace />,
      },
      {
        path: "profile",
        element: userToken ? <Profile /> : <Navigate to="/" replace />,
        children: [
          {
            index: true,
            element: <Navigate to="my-profile" replace />,
          },
          {
            path: "my-profile",
            element: <MyProfile />,
          },
          {
            path: "lastorders",
            element: <LastOrders />,
          },
        ],
      },
      {
        path: "products",
        element: <AllProducts />,
      },
      {
        path: "reset-password",
        element:
          userToken && user !== "null" ? (
            <Navigate to="/" replace />
          ) : (
            <ResetPassword />
          ),
      },
      {
        path: "login/forget-password",
        element:
          userToken && user !== "null" ? (
            <Navigate to="/" replace />
          ) : (
            <ForgetPassword />
          ),
      },
      {
        path: "login/email-message",
        element:
          userToken && user !== "null" && isEmailVerified ? (
            <Navigate to="/" replace />
          ) : (
            <EmailMessage />
          ),
      },
      {
        path: "verify-email",
        element: isEmailVerified ? (
          <Navigate to="/" replace />
        ) : (
          <VerifyEmail />
        ),
      },
    ],
  },
]);

export default router;
