import { createBrowserRouter, Navigate } from "react-router-dom";

import SignUp from "@/pages/SignUp";
import Login from "@/pages/Login";
import HomePage from "@/pages/HomePage";
import ProductDetails from "@/pages/ProductDetails";
import ContactUs from "@/pages/ContactUs";
import About from "@/pages/About";
import CartPage from "@/pages/CartPage";
import WishList from "@/pages/WishList";
import ErrorPage from "@/pages/ErrorPage";
import MainLayout from "@/layouts/MainLayout";
import CategoryPage from "@/pages/CategoryPage";
import AllProducts from "@/pages/AllProducts";
import { userToken } from "@/utils/Repeated";

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
        element: userToken ? <Navigate to="/" replace /> : <Login />,
      },
      {
        path: "signup",
        element: userToken ? <Navigate to="/" replace /> : <SignUp />,
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
        element: <CartPage />,
      },
      {
        path: "wishlist",
        element: <WishList />,
      },
      {
        path: "products",
        element: <AllProducts />,
      },
    ],
  },
]);

export default router;
