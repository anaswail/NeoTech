import { Ellipsis } from "lucide-react";

const Orders = () => {
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
      title: "Acqua di Parma",
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
    {
      orderId: "#4678MN",
      title: "Adidas Ultraboost",
      orderDate: "Feb 20, 03:45 pm",
      price: "189.00",
      payment: "PayPal",
      Status: "Processing",
    },
    {
      orderId: "#4789OP",
      title: "Apple AirPods Pro",
      orderDate: "Mar 05, 11:22 am",
      price: "249.00",
      payment: "Credit Card",
      Status: "Completed",
    },
    {
      orderId: "#5890QR",
      title: "Puma Running Shoes",
      orderDate: "Apr 14, 07:10 pm",
      price: "175.00",
      payment: "Cash",
      Status: "Cancelled",
    },
    {
      orderId: "#6781ST",
      title: "Levi’s Denim Jacket",
      orderDate: "Jun 09, 10:02 am",
      price: "129.00",
      payment: "Transfer",
      Status: "Completed",
    },
    {
      orderId: "#7892UV",
      title: "Samsung Galaxy Watch",
      orderDate: "Jul 18, 05:30 pm",
      price: "349.00",
      payment: "PayPal",
      Status: "Processing",
    },
    {
      orderId: "#8903WX",
      title: "Gucci Perfume",
      orderDate: "Aug 02, 09:50 am",
      price: "420.00",
      payment: "Credit Card",
      Status: "Completed",
    },
    {
      orderId: "#9014YZ",
      title: "Ray-Ban Sunglasses",
      orderDate: "Aug 30, 01:40 pm",
      price: "199.00",
      payment: "Transfer",
      Status: "Processing",
    },
    {
      orderId: "#1025AB",
      title: "Sony WH-1000XM5",
      orderDate: "Sep 05, 04:55 pm",
      price: "399.00",
      payment: "Credit Card",
      Status: "Completed",
    },
    {
      orderId: "#1136CD",
      title: "Nike Air Jordan",
      orderDate: "Sep 22, 08:15 am",
      price: "299.00",
      payment: "PayPal",
      Status: "Completed",
    },
    {
      orderId: "#1247EF",
      title: "Fossil Smartwatch",
      orderDate: "Oct 01, 07:25 pm",
      price: "220.00",
      payment: "Cash",
      Status: "Cancelled",
    },
    {
      orderId: "#1358GH",
      title: "Apple MacBook Air",
      orderDate: "Oct 10, 06:40 pm",
      price: "1249.00",
      payment: "Credit Card",
      Status: "Processing",
    },
    {
      orderId: "#1469IJ",
      title: "Asus ROG Mouse",
      orderDate: "Oct 18, 02:10 pm",
      price: "79.00",
      payment: "Transfer",
      Status: "Completed",
    },
    {
      orderId: "#1570KL",
      title: "HP OfficeJet Printer",
      orderDate: "Oct 24, 09:00 am",
      price: "159.00",
      payment: "Credit Card",
      Status: "Processing",
    },
    {
      orderId: "#1681MN",
      title: "Beats Studio Pro",
      orderDate: "Oct 27, 03:33 pm",
      price: "349.00",
      payment: "PayPal",
      Status: "Completed",
    },
    {
      orderId: "#1792OP",
      title: "Logitech MX Keyboard",
      orderDate: "Oct 29, 12:45 pm",
      price: "99.00",
      payment: "Transfer",
      Status: "Completed",
    },
    {
      orderId: "#1803QR",
      title: "Apple Watch SE",
      orderDate: "Oct 30, 10:10 am",
      price: "279.00",
      payment: "Credit Card",
      Status: "Processing",
    },
    {
      orderId: "#1914ST",
      title: "Nike Dri-Fit T-Shirt",
      orderDate: "Oct 31, 09:25 pm",
      price: "59.00",
      payment: "Cash",
      Status: "Completed",
    },
  ];

  return (
    <div>
      <h1 className="text-lg sm:text-xl font-bold bg-white p-4 sm:p-5 w-full rounded-t-lg">
        Latest Orders
      </h1>
      <div className="overflow-x-auto rounded-b-lg shadow-sm">
        <table className="w-full border border-t-0 border-gray-300 rounded-b-lg overflow-hidden min-w-[768px]">
          <thead className="bg-white">
            <tr>
              <th className="text-left py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
                Order ID
              </th>
              <th className="text-center py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
                Product
              </th>
              <th className="text-center py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
                Order Date
              </th>
              <th className="text-center py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
                Price
              </th>
              <th className="text-center py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
                Payment
              </th>
              <th className="text-center py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-300 text-sm sm:text-base">
                Status
              </th>
              <th className="text-center py-3 sm:py-4 px-3 sm:px-4 border-b border-gray-300 text-sm sm:text-base"></th>
            </tr>
          </thead>
          <tbody>
            {latestOrders.length > 0 ? (
              latestOrders.map((product, id) => {
                return (
                  <tr
                    key={id}
                    className="border-b border-gray-300 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base font-medium">
                      {product.orderId}
                    </td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">
                      {product.title}
                    </td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-4 text-xs sm:text-sm text-gray-600">
                      {product.orderDate}
                    </td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base font-medium">
                      ${product.price}
                    </td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base">
                      {product.payment}
                    </td>
                    <td
                      className={`text-center py-3 sm:py-4 px-3 sm:px-4 text-sm sm:text-base font-medium ${
                        product.Status === "Completed"
                          ? "text-green-600"
                          : product.Status === "Cancelled"
                          ? "text-red-600"
                          : "text-blue-600"
                      }`}
                    >
                      {product.Status}
                    </td>
                    <td className="text-center py-3 sm:py-4 px-3 sm:px-4 cursor-pointer">
                      <Ellipsis
                        size={20}
                        className="mx-auto hover:text-txt-secondary2 transition-colors"
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={7} className="py-10 text-center">
                  <h1 className="text-lg sm:text-xl font-bold text-gray-500">
                    No orders yet
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
