import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { Trash2Icon } from "lucide-react";
import { removeFromCart } from "@/store/slices/cartSlice";
import toast from "react-hot-toast";
import Heading from "@/components/Heading";
import type { CartItem } from "@/types";

const CartPage = () => {
  const [quantity, setQuantity] = useState<Record<string, number>>({});

  const updateQuantity = (value: number, id: string, min = 1, max = 99) => {
    const newValue = Math.max(min, Math.min(max, value));
    setQuantity((prev) => ({
      ...prev,
      [id]: newValue,
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    min = 1,
    max = 99
  ) => {
    const value = parseInt(e.target.value) || min;
    updateQuantity(value, id, min, max);
  };

  const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const handleDeleteProduct = (id: number, title: string) => {
    dispatch(removeFromCart({ id } as unknown as CartItem));
    toast.success(`${title} has been deleted`, {
      style: {
        border: "1px solid #713200",
        padding: "16px",
        color: "#00000",
      },
      iconTheme: {
        primary: "green",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 mt-16 sm:mt-20 md:mt-24 lg:mt-32 mb-8 sm:mb-12">
      <Heading title="My Cart" />

      {/* Desktop Table View - Hidden on Mobile */}
      <div className="hidden lg:block mt-8 xl:mt-12">
        <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-4 px-4 border-b border-gray-300 font-semibold text-gray-700">
                Product
              </th>
              <th className="text-center py-4 px-4 border-b border-gray-300 font-semibold text-gray-700">
                Price
              </th>
              <th className="text-center py-4 px-4 border-b border-gray-300 font-semibold text-gray-700">
                Quantity
              </th>
              <th className="text-center py-4 px-4 border-b border-gray-300 font-semibold text-gray-700">
                SubTotal
              </th>
              <th className="text-center py-4 px-4 border-b border-gray-300 font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {cartItems.length > 0 ? (
              cartItems.map((product, id) => {
                const currentQuantity = quantity[id] ?? 1;
                return (
                  <tr
                    key={id}
                    className="border-b border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.img}
                          alt={product.title}
                          className="w-14 h-14 rounded object-cover"
                        />
                        <span className="font-medium text-gray-800">
                          {product.title}
                        </span>
                      </div>
                    </td>
                    <td className="text-center py-4 px-4 font-semibold text-gray-700">
                      ${product.price}
                    </td>
                    <td className="text-center py-4 px-4">
                      <input
                        type="number"
                        value={currentQuantity.toString().padStart(2, "0")}
                        onChange={(e) => handleInputChange(e, id.toString())}
                        className="w-16 text-center text-gray-800 border border-gray-300 rounded py-1 focus:outline-none focus:border-blue-500"
                        min="1"
                        max="99"
                      />
                    </td>
                    <td className="text-center py-4 px-4 font-semibold text-gray-900">
                      ${(product.price * currentQuantity).toFixed(2)}
                    </td>
                    <td className="text-center py-4 px-4">
                      <Trash2Icon
                        className="cursor-pointer text-red-500 hover:text-red-700 transition-colors mx-auto"
                        size={20}
                        onClick={() =>
                          handleDeleteProduct(Number(product.id), product.title)
                        }
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12">
                  <h1 className="text-xl font-bold text-gray-500">
                    The Cart is empty
                  </h1>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View - Visible on Mobile/Tablet */}
      <div className="lg:hidden mt-6 sm:mt-8 space-y-4 sm:space-y-5">
        {cartItems.length > 0 ? (
          cartItems.map((product, id) => {
            const currentQuantity = quantity[id] ?? 1;
            return (
              <div
                key={id}
                className="bg-white border border-gray-300 rounded-lg p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Product Info */}
                <div className="flex gap-3 sm:gap-4 mb-4">
                  <img
                    src={product.img}
                    alt={product.title}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm sm:text-base text-gray-800 mb-2 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-lg sm:text-xl font-bold text-txt-secondary2">
                      ${product.price}
                    </p>
                  </div>
                  {/* Delete Icon - Top Right */}
                  <Trash2Icon
                    className="cursor-pointer text-red-500 hover:text-red-700 transition-colors flex-shrink-0"
                    size={20}
                    onClick={() =>
                      handleDeleteProduct(Number(product.id), product.title)
                    }
                  />
                </div>

                {/* Quantity and Subtotal */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <label className="text-sm sm:text-base font-medium text-gray-700">
                      Quantity:
                    </label>
                    <input
                      type="number"
                      value={currentQuantity.toString().padStart(2, "0")}
                      onChange={(e) => handleInputChange(e, id.toString())}
                      className="w-14 sm:w-16 text-center text-sm sm:text-base text-gray-800 border border-gray-300 rounded py-1.5 sm:py-2 focus:outline-none focus:border-blue-500"
                      min="1"
                      max="99"
                    />
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm text-gray-600 mb-1">
                      Subtotal
                    </p>
                    <p className="text-lg sm:text-xl font-bold text-gray-900">
                      ${(product.price * currentQuantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-16 sm:py-20">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-500">
              The Cart is empty
            </h1>
            <p className="text-sm sm:text-base text-gray-400 mt-2">
              Add some products to get started
            </p>
          </div>
        )}
      </div>

      {/* Cart Summary - Only show if items exist */}
      {cartItems.length > 0 && (
        <div className="mt-6 sm:mt-8 lg:mt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gray-50 rounded-lg border border-gray-200">
          <div className="w-full sm:w-auto">
            <p className="text-sm sm:text-base text-gray-600 mb-2">
              Total Items:{" "}
              <span className="font-semibold text-gray-800">
                {cartItems.length}
              </span>
            </p>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">
              Total: $
              {cartItems
                .reduce(
                  (total, product, id) =>
                    total + product.price * (quantity[id] ?? 1),
                  0
                )
                .toFixed(2)}
            </p>
          </div>
          <button className="w-full sm:w-auto bg-txt-secondary2 hover:bg-txt-secondary2/90 text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg font-semibold text-sm sm:text-base transition-colors duration-300 shadow-sm hover:shadow-md">
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;
