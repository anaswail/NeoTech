import { user } from "@/utils/Repeated";
import profileImg from "../../assets/profile.png";
import { Circle, Clipboard, Dot, Ellipsis, Percent, User } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { useState } from "react";
import productImg from "../../assets/product1.png";
import productImg2 from "../../assets/product2.png";
import productImg3 from "../../assets/product3.png";

const Overview = () => {
  const topProducts = [
    {
      id: 0,
      title: "ASUS Vivobook S16 laptops",
      img: productImg,
      sales: 1234,
      price: 124,
      orderCount: 110,
      remaining: 50,
    },
    {
      id: 1,
      title: "Fastrack FS1 Pro Smartwatch",
      img: productImg2,
      sales: 1530,
      price: 412,
      orderCount: 231,
      remaining: 23,
    },
    {
      id: 2,
      title: "Acer Chromebook Plus 515",
      img: productImg3,
      sales: 2530,
      price: 212,
      orderCount: 143,
      remaining: 43,
    },
  ];

  const latestOrders = [
    {
      orderId: "#2456JL",
      title: "Nike Sportswear",
      orderDate: "Jan 12, 12:23 pm",
      price: "134.00",
      payment: "Transfer",
      Status: "Processing",
    },
    {
      orderId: "#3456AC",
      title: "Acqua di parma",
      orderDate: "Jan 01, 09:13 pm",
      price: "234.00",
      payment: "Credit Card",
      Status: "Completed",
    },
    {
      orderId: "#3566L",
      title: "Nike Aqua",
      orderDate: "May 12, 12:23 am",
      price: "313.00",
      payment: "Transfer",
      Status: "Completed",
    },
  ];

  return (
    <div className="my-8">
      <div className="header flex justify-between ">
        <div className="left-side">
          <h1 className="text-3xl font-medium">
            Welcome Back,{" "}
            <span className="font-bold text-txt-secondary2">
              {user?.name} !
            </span>{" "}
          </h1>
          <p className="mt-3 text-gray-700">
            Here’s Your Current Sales Overview
          </p>
        </div>
        <div className="info flex gap-5 items-center">
          <div className="h-12 w-12 bg-txt-white rounded-full overflow-hidden  ">
            <img
              src={user?.avatar?.secure_url || profileImg}
              alt={user?.name}
              className="w-full"
            />
          </div>
          <div className="text">
            <p className="font-semibold text-xl">{user?.name}</p>
            <p>{user?.email}</p>
          </div>
        </div>
      </div>

      <div className="statistics flex  mt-10 gap-10">
        <div className="total-orders bg-txt-secondary2 text-white p-5 relative rounded-sm w-96 h-40 shadow-lg">
          <h1 className="text-xl font-semibold">
            Total Orders{" "}
            <span className="text-[10px] font-normal ">this month</span>
          </h1>
          <p className="mt-6 mb-2 text-2xl font-semibold">1,050</p>
          <p className="text-xs">
            <span className="text-green-300 font-semibold">+10%</span> From last
            month
          </p>
          <span className="bg-gray-100 absolute top-5 right-5 p-2 rounded-sm text-black duration-200 ">
            <Clipboard />
          </span>
        </div>

        <div className="total-sales group bg-white  p-5 relative rounded-sm w-96 h-40 shadow-lg ">
          <h1 className="text-xl font-semibold">
            Total sales{" "}
            <span className="text-[10px] font-normal ">this month</span>
          </h1>
          <p className="mt-6 mb-2 text-2xl font-semibold">$56,093</p>
          <p className="text-xs">
            <span className="text-green-700 font-semibold">+5%</span> From last
            month
          </p>
          <span className="bg-gray-100 absolute top-5 right-5 p-2 rounded-sm group-hover:text-black duration-200 ">
            <Percent />
          </span>
        </div>

        <div className="total-orders group bg-white  p-5 relative rounded-sm w-96 h-40 shadow-lg">
          <h1 className="text-xl font-semibold">
            Customers{" "}
            <span className="text-[10px] font-normal ">this month</span>
          </h1>
          <p className="mt-6 mb-2 text-2xl font-semibold">300</p>
          <p className="text-xs">
            <span className="text-green-700 font-semibold">+15%</span> From last
            month
          </p>
          <span className="bg-gray-100 absolute top-5 right-5 p-2 rounded-sm group-hover:text-black duration-200 ">
            <User />
          </span>
        </div>
      </div>
      <table className="topProducts w-full border border-gray-300 rounded-lg overflow-hidden mt-8 lg:mt-15">
        <thead className="bg-white ">
          <tr>
            <th className="text-left py-4 px-4 border-b border-gray-300">
              Top Selling Products
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              Price
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              Orders Count
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              SubTotal
            </th>
          </tr>
        </thead>
        <tbody>
          {topProducts.length > 0 &&
            topProducts.map((product, id) => {
              return (
                <tr key={id} className=" bg-white">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-12 h-12 rounded"
                      />
                      <h1>
                        <p>{product.title}</p>
                        <p className="text-gray-600 mt-1 text-sm">
                          {product.sales} sales
                        </p>
                      </h1>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">${product.price}</td>
                  <td className="text-center py-4 px-4">
                    {product.orderCount}
                  </td>
                  <td className="text-center py-4 px-4">
                    <p className="flex justify-center items-center text-green-600">
                      <Dot size={30} />
                      Available
                    </p>
                    <p className="text-gray-600 mt-1 text-xs">
                      {product.remaining} stocks remaining
                    </p>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <h1 className="lg:mt-15 mt-8 text-xl font-bold bg-white p-5 w-full rounded-t-lg">
        Latest Orders
      </h1>
      <table className="lastOrders w-full border border-t-0 border-gray-300 rounded-b-lg overflow-hidden ">
        <thead className="bg-white ">
          <tr>
            <th className="text-left py-4 px-4 border-b border-gray-300">
              Order ID
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              Product
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              Order Date
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              Price
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              Payment
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              Status
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300"></th>
          </tr>
        </thead>
        <tbody>
          {latestOrders.length > 0 ? (
            latestOrders.map((product, id) => {
              return (
                <tr
                  key={id}
                  className="border-b border- border-gray-300 bg-white"
                >
                  <td className="py-4 px-4">{product.orderId}</td>
                  <td className="text-center py-4 px-4">{product.title}</td>
                  <td className="text-center py-4 px-4">{product.orderDate}</td>
                  <td className="text-center py-4 px-4">${product.price}</td>
                  <td className="text-center py-4 px-4">{product.payment}</td>
                  <td
                    className={`"text-center py-4 px-4" ${
                      product.Status === "Completed"
                        ? "text-green-600"
                        : "text-blue-600"
                    }`}
                  >
                    {product.Status}
                  </td>
                  <td className="text-center py-4 px-4 cursor-pointer">
                    <Ellipsis />
                  </td>
                </tr>
              );
            })
          ) : (
            <h1 className="py-10 text-xl font-bold">The Cart is empty</h1>
          )}
          {}
        </tbody>
      </table>
    </div>
  );
};

export default Overview;
