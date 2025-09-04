import { Eye, Heart } from "lucide-react";
import { Link } from "react-router";
import { Button } from "./ui/button";

interface CardProps {
  id: number;
  img: string;
  title: string;
  price: number;
  discount?: number;
  percent?: number;
}

const addToCart = () => {
  // Logic to add the item to the cart
};

const addToWishlist = () => {
  // Logic to add the item to the wishlist
};

const Card = ({ img, title, price, discount, percent, id }: CardProps) => {
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
          onClick={addToCart}
          className="bg-black hover:bg-txt-secondary2 transition-all duration-400 w-full absolute -bottom-10 left-0 group-hover:bottom-0 text-xs sm:text-sm md:text-base py-2 sm:py-3"
        >
          Add To Cart
        </Button>

        {/* Action Icons */}
        <div className="icons absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col justify-center items-center gap-2 sm:gap-3">
          <div
            onClick={addToWishlist}
            className="bg-white rounded-full p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm"
          >
            <Heart size={16} className="sm:w-5 sm:h-5" />
          </div>
          <div className="bg-white rounded-full p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm">
            <Link to={`/product/${id}`}>
              <Eye size={16} className="sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>

        {/* Discount Badge */}
        {percent && (
          <Button className="rounded-sm absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5">
            -{percent}%
          </Button>
        )}
      </div>

      {/* Card Content */}
      <div className="text p-2 sm:p-3">
        <h2 className="my-2 sm:my-3 text-sm sm:text-base md:text-regular font-bold line-clamp-2 leading-tight">
          {title}
        </h2>
        <div className="price-container flex items-center gap-3 sm:gap-5">
          <span className="text-txt-secondary2 text-sm sm:text-base md:text-lg font-semibold">
            ${price}
          </span>
          {discount && (
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
