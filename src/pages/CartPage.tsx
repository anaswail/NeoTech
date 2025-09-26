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
    dispatch(removeFromCart({ id } as CartItem));
    toast.success(`${title} has been deleted`);
  };

  return (
    <div className="container  mx-auto px-4 mt-24 sm:mt-32">
      <Heading title="My Cart" />

      <table className="w-full border border-gray-300 rounded-lg overflow-hidden mt-8 lg:mt-15">
        <thead className="bg-gray-50 ">
          <tr>
            <th className="text-left py-4 px-4 border-b border-gray-300">
              Product
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              Price
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              Quantity
            </th>
            <th className="text-center py-4 px-4 border-b border-gray-300">
              SubTotal
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.length > 0 ? (
            cartItems.map((product, id) => {
              const currentQuantity = quantity[id] ?? 1;
              return (
                <tr key={id} className="border-b border-gray-300">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={product.img}
                        alt={product.title}
                        className="w-12 h-12 rounded"
                      />
                      <span>{product.title}</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4">${product.price}</td>
                  <td className="text-center py-4 px-4">
                    <input
                      type="number"
                      value={currentQuantity.toString().padStart(2, "0")}
                      onChange={(e) => handleInputChange(e, id.toString())}
                      className="w-12 text-center text-gray-800 border border-gray-300 rounded"
                      min="1"
                      max="99"
                    />
                  </td>
                  <td className="text-center py-4 px-4">
                    ${(product.price * currentQuantity).toFixed(2)}
                  </td>
                  <td>
                    <Trash2Icon
                      className="cursor-pointer"
                      onClick={() =>
                        handleDeleteProduct(product.id, product.title)
                      }
                    />
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

export default CartPage;
