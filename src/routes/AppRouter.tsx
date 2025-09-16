import { createBrowserRouter } from "react-router-dom";

import ProductsPage from "@/pages/ProductsPage";
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
        path: "products",
        element: <ProductsPage />,
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
        element: <Login />,
      },
      {
        path: "signup",
        element: <SignUp />,
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
        path: "allProducts",
        element: <AllProducts />,
      },
    ],
  },
]);

export default router;
