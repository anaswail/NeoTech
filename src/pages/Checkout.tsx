import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import Heading from "@/components/Heading";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const Checkout = () => {
  const CheckoutSchema = z.object({
    name: z
      .string()
      .min(1, "First Name is required")
      .min(3, "Please enter a valid name"),
    streetAddress: z
      .string()
      .min(1, "Street Address is required")
      .min(3, "Please enter a valid street address"),
    floor: z.string().optional(),
    city: z
      .string()
      .min(1, "City is required")
      .min(3, "Please enter a valid city"),
    phoneNumber: z
      .string()
      .min(1, "Phone Number is required")
      .min(10, "Please enter a valid phone number"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid Email address"),
    paymentMethod: z.string().min(1, "Please select a payment method"),
  });

  type CheckoutSchemaType = z.infer<typeof CheckoutSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutSchemaType>({
    resolver: zodResolver(CheckoutSchema),
  });

  const onSubmit = (data: CheckoutSchemaType) => {
    console.log(data);
    alert("Order placed successfully! Check console for details.");
  };

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const subtotal = cartItems.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-3 sm:px-4 md:px-6 mt-16 sm:mt-20 md:mt-24 lg:mt-32 mb-8 sm:mb-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <Heading title="Billing Details" />

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 mt-8">
          {/* Form Section */}
          <div className="flex-1 bg-white rounded-lg shadow-sm p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Customer Information
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  {...register("name")}
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Street Address *
                </label>
                <input
                  {...register("streetAddress")}
                  type="text"
                  placeholder="123 Main Street"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.streetAddress && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.streetAddress.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Apartment, Floor, etc. (Optional)
                </label>
                <input
                  {...register("floor")}
                  type="text"
                  placeholder="Apt 4B"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  {...register("city")}
                  type="text"
                  placeholder="New York"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  {...register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Method *
                </label>
                <select
                  {...register("paymentMethod")}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition bg-white"
                >
                  <option value="">Select payment method</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="cash">Cash on Delivery</option>
                  <option value="card">Credit/Debit Card</option>
                </select>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.paymentMethod.message}
                  </p>
                )}
              </div>
            </div>

            <button
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitting}
              className="w-full bg-txt-secondary2 text-white px-8 py-4 rounded-lg font-semibold hover:bg-txt-secondary2/70 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 mt-6"
            >
              {isSubmitting ? "Processing..." : "Place Order"}
            </button>
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-96 w-full">
            <div className="bg-white rounded-lg shadow-sm p-6 sm:p-8 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 pb-4 border-b border-gray-200"
                  >
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
