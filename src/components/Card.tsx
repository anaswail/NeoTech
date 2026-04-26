import { useEffect, useState } from "react";
import type { cardProps, CartItem } from "@/types";
import { actDeleteProduct } from "@/store/slices/products/act/actDeleteProduct";
import type { AppDispatch, RootState } from "@/store/store";
import { Link } from "react-router";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/slices/cartSlice";
import { userToken } from "@/utils/Repeated";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Edit, Eye, Heart, Trash, ShoppingCart } from "lucide-react";
import { actGetProductById } from "@/store/slices/products/act/actGetProductById";
import { actToggleWishlist } from "@/store/slices/products/act/actToggleWishlist";
import { actGetMyWishlist } from "@/store/slices/products/act/actGetMyWishlist";

const Card = ({
  img,
  title,
  price,
  discount,
  id,
  deleteIcon = false,
  wishAndCart = false,
  deleteAndUpdate = false,
}: cardProps) => {
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);

  const handleProductClick = () => {
    scrollTo({ top: 0, behavior: "smooth" });
  };

  const dispatch = useDispatch<AppDispatch>();

  const updateProduct = () => {
    localStorage.setItem("productId", id);
  };

  const { data: getWishlist } = useSelector(
    (state: RootState) => state.getWishlist,
  );

  const { loading: toggleWishlistLoad, error: toggleWishlistErr } = useSelector(
    (state: RootState) => state.toggleWishlist,
  );

  const { error } = useSelector((state: RootState) => state.deleteProduct);

  const productId = id;

  useEffect(() => {
    const checkIfAddedToCart = localStorage.getItem("cart");
    if (checkIfAddedToCart && id) {
      const cartItems = JSON.parse(checkIfAddedToCart);
      const isInCart = cartItems.some((item: { id: string }) => item.id === id);
      setIsAddedToCart(isInCart);
    }
    const isInWishlist = getWishlist?.products.some(
      (product) => product._id === id || product.id === id,
    );
    setIsAddedToWishlist(isInWishlist ?? false);
  }, [id, getWishlist]);

  const toggleWishlist = async () => {
    if (!userToken) {
      toast.error("You must be logged in to manage your wishlist.");
      return;
    }

    const result = await dispatch(actToggleWishlist({ productId }));

    if (actToggleWishlist.fulfilled.match(result)) {
      toast.success(
        result.payload?.message || "Wishlist updated successfully.",
      );
      dispatch(actGetMyWishlist());
    } else if (actToggleWishlist.rejected.match(result)) {
      toast.error(
        result.payload?.message || "Something went wrong. Please try again.",
      );
    }
  };

  const deleteProduct = (productId: any) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const resultAction = await dispatch(actDeleteProduct(productId));

          if (actDeleteProduct.fulfilled.match(resultAction)) {
            Swal.fire({
              title: "Success!",
              text: "Product deleted successfully.",
              icon: "success",
            }).then(() => {
              window.location.reload();
            });
          } else if (actDeleteProduct.rejected.match(resultAction)) {
            Swal.fire({
              title: "Error!",
              text:
                error?.message ||
                resultAction.error.message ||
                "Failed to delete product.",
              icon: "error",
            });
          }
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "An unexpected error occurred.",
            icon: "error",
          });
        }
      }
    });
  };

  const handleAddToCart = async () => {
    if (!userToken) {
      toast.error(
        "You must be logged in. Please log in to add items to your cart.",
      );
      return;
    }

    if (isAddedToCart) {
      dispatch(removeFromCart({ id } as CartItem));
      setIsAddedToCart(false);
      toast.success(`${title} has been removed from your cart.`);
    } else {
      const result = await dispatch(actGetProductById({ id }));
      const variationSku = result.payload?.data?.variations?.[0]?.sku || "";
      dispatch(addToCart({ id, title, price, img, quantity: 1, variationSku }));
      setIsAddedToCart(true);
      toast.success(`${title} has been added to your cart.`);
    }
  };

  return (
    <div className="w-full max-w-[150px] sm:max-w-[250px] md:max-w-[270px] group bg-txt-secondary/40 mx-auto">
      <div className="img-sec bg-txt-gray/10 flex justify-center items-center p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden aspect-square sm:aspect-[4/3] md:aspect-square">
        <img
          src={img}
          alt={title}
          className="w-full h-20 sm:h-24 md:h-28 lg:h-32 object-contain"
        />

        {/* Add to Cart Button - Desktop */}
        {wishAndCart && (
          <Button
            onClick={handleAddToCart}
            disabled={isAddedToCart}
            className={`hidden sm:flex transition-all duration-400 w-full absolute -bottom-10 left-0 group-hover:bottom-0 text-xs sm:text-sm md:text-base py-2 sm:py-3 ${
              isAddedToCart
                ? "bg-txt-secondary2 hover:bg-txt-secondary2 cursor-not-allowed opacity-90"
                : "bg-black hover:bg-txt-secondary2"
            }`}
          >
            {isAddedToCart ? "In Cart" : "Add To Cart"}
          </Button>
        )}

        {/* Action Icons */}
        <div className="icons absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col justify-center items-center gap-2 sm:gap-3">
          {deleteAndUpdate && (
            <>
              <div
                onClick={() => deleteProduct(id)}
                className="bg-white rounded-full p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm"
              >
                <Trash size={16} className="sm:w-5 sm:h-5" />
              </div>
              <Link to="/dashboard/product-crud" onClick={updateProduct}>
                <div
                  onClick={updateProduct}
                  className="bg-white rounded-full p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm"
                >
                  <Edit size={16} className="sm:w-5 sm:h-5" />
                </div>
              </Link>
              <Link to={`/product/${id}`} onClick={handleProductClick}>
                <div className="bg-white rounded-full p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm">
                  <Eye size={16} className="sm:w-5 sm:h-5" />
                </div>
              </Link>
            </>
          )}
          {wishAndCart && (
            <>
              {/* Cart Icon - Mobile Only */}
              <div
                onClick={handleAddToCart}
                className={`sm:hidden rounded-full p-1.5 flex justify-center items-center transition-all cursor-pointer duration-300 shadow-sm ${
                  isAddedToCart
                    ? "bg-txt-secondary2 text-white"
                    : "bg-white hover:bg-txt-secondary2 hover:text-white"
                }`}
              >
                <ShoppingCart size={16} />
              </div>
              <div
                onClick={toggleWishlist}
                className={`rounded-full p-1.5 sm:p-2 flex justify-center items-center transition-all cursor-pointer duration-300 shadow-sm ${
                  toggleWishlistLoad === "pending"
                    ? "opacity-50 pointer-events-none"
                    : isAddedToWishlist
                      ? "bg-txt-secondary2 text-white"
                      : "bg-white hover:bg-txt-secondary2 hover:text-white"
                }`}
              >
                <Heart size={16} className="sm:w-5 sm:h-5" />
              </div>
              <Link to={`/product/${id}`} onClick={handleProductClick}>
                <div className="bg-white rounded-full p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm">
                  <Eye size={16} className="sm:w-5 sm:h-5" />
                </div>
              </Link>
            </>
          )}
        </div>

        {/* Discount Badge */}
        {discount && discount !== price && (
          <Button className="rounded-sm absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5">
            {discount && Math.round(100 - (price / discount) * 100)}%
          </Button>
        )}
      </div>

      {/* Card Content */}
      <div className="text p-2 sm:p-3">
        <h2 className="truncate my-2 sm:my-3 text-sm sm:text-base md:text-regular font-bold line-clamp-2 leading-tight">
          {title}
        </h2>
        <div className="price-container flex items-center gap-3 sm:gap-5">
          <span className="text-txt-secondary2 text-sm sm:text-base md:text-lg font-semibold">
            ${price}
          </span>
          {discount && discount !== price && (
            <span className="line-through text-txt-gray text-xs sm:text-sm md:text-base">
              ${discount}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
