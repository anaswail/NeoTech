import { Eye, Heart, Trash } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";
import type { cardProps } from "@/types";
import { useDispatch } from "react-redux";
import { addToCart } from "@/store/slices/cartSlice";
import toast from "react-hot-toast";

const addToWishlist = () => {
  // Logic to add the item to the wishlist
};

const removeFromWishList = () => {
  // Logic to add the item to the wishlist
};

const Card = ({
  img,
  title,
  price,
  discount,
  id,
  deleteIcon = false,
  wishAndCart = false,
}: cardProps) => {
  const handleProductClick = () => {
    scrollTo({ top: 0, behavior: "smooth" });
  };

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ id, title, price, img, quantity: 1 }));
    toast.success(`${title} added to cart successfully`);
  };

  return (
    <div className="w-full max-w-[150px]  sm:max-w-[250px] md:max-w-[270px] group bg-txt-secondary/40 mx-auto">
      <div className="img-sec bg-txt-gray/10 flex justify-center items-center p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden aspect-square sm:aspect-[4/3] md:aspect-square">
        <img
          src={img}
          alt={title}
          className="w-full h-20 sm:h-24 md:h-28 lg:h-32 object-contain"
        />

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          className="bg-black hover:bg-txt-secondary2 transition-all duration-400 w-full absolute -bottom-10 left-0 group-hover:bottom-0 text-xs sm:text-sm md:text-base py-2 sm:py-3"
        >
          Add To Cart
        </Button>

        {/* Action Icons */}
        <div className="icons absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col justify-center items-center gap-2 sm:gap-3">
          {wishAndCart && (
            <>
              <div
                onClick={addToWishlist}
                className="bg-white rounded-full p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm"
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
          {deleteIcon && (
            <div
              onClick={removeFromWishList}
              className="bg-white rounded-full p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm"
            >
              <Trash size={16} className="sm:w-5 sm:h-5" />
            </div>
          )}
        </div>

        {/* Discount Badge */}
        {discount && discount !== price && (
          <Button className="rounded-sm absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5">
            -{discount && Math.round(100 - (price / discount) * 100)}%
          </Button>
        )}
      </div>
      {/* Card Content */}
      <div className="text p-2 sm:p-3">
        <h2 className=" truncate my-2 sm:my-3 text-sm sm:text-base md:text-regular font-bold line-clamp-2 leading-tight">
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
