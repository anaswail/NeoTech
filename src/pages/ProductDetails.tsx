// =========================================
//                  Imports
// =========================================
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SyncLoader } from "react-spinners";

import type { AppDispatch, RootState } from "@/store/store";
import { actGetProductById } from "@/store/slices/products/act/actGetProductById";

const ProductDetails = () => {
  const [size, setSize] = useState("L");
  const [count, setCount] = useState(1);

  const addToWishlist = () => {
    // add logic
  };
  const addToCart = () => {
    // add logic
  };
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { data: product, loading } = useSelector(
    (state: RootState) => state.productId
  );
  useEffect(() => {
    if (id) {
      dispatch(actGetProductById({ id }));
    }
  }, [dispatch, id]);

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (product?.interfaceImages) {
      setImage(product.interfaceImages.secure_url);
    }
  }, [product]);

  if (loading !== "fulfilled") {
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 bg-white flex-col">
        <h1 className="text-txt-black text-2xl sm:text-3xl md:text-4xl font-bold mb-8 px-4 text-center">
          Neo
          <span className="text-txt-secondary2">Tech</span>
        </h1>
        <SyncLoader size={25} margin={5} />
        <h1 className="absolute bottom-10 text-sm sm:text-base md:text-xl font-bold opacity-80 px-4 text-center">
          Developed By <span className="text-txt-secondary2">Anas & Hagar</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="my-8 sm:my-12 md:my-16 lg:my-20 xl:my-30 px-4 sm:px-6 lg:px-8">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
        {product?.title}
      </h1>

      {/* Main Content - Stack on mobile, side-by-side on desktop */}
      <div className="content flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10">
        {/* Image Section */}
        <div className="img-section w-full lg:w-1/2 flex flex-col sm:flex-row justify-center gap-4">
          {/* Thumbnail Images - Horizontal scroll on mobile, vertical on desktop */}
          <div className="switchImages flex sm:flex-col gap-2 sm:gap-3 overflow-x-auto sm:overflow-x-visible pb-2 sm:pb-0 sm:w-1/4 md:w-1/5">
            {product?.images?.map((productImage, idx) => (
              <div
                key={idx}
                className={`image flex-shrink-0 ${
                  image === productImage.secure_url
                    ? "bg-txt-secondary2/85"
                    : "bg-txt-secondary hover:bg-gray-200"
                } w-16 h-16 sm:w-full sm:h-20 md:h-24 p-2 flex justify-center items-center rounded-lg cursor-pointer transition-colors duration-200`}
                onClick={() => setImage(productImage.secure_url)}
              >
                <img
                  src={productImage.secure_url}
                  alt={`product thumbnail ${idx + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="main-image w-full sm:w-3/4 md:w-4/5 p-6 sm:p-8 md:p-10 rounded-lg bg-txt-secondary aspect-square sm:aspect-auto sm:h-80 md:h-96 lg:h-[28rem] flex justify-center items-center">
            <img
              src={image || "null"}
              alt="main product image"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        {/* Text Section */}
        <div className="text-section w-full lg:w-1/2 flex flex-col gap-3 sm:gap-4">
          <h1 className="product-title text-xl sm:text-2xl md:text-3xl font-bold">
            {product?.title}
          </h1>

          {/* Rating and Stock */}
          <div className="rate flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
            <div className="rates flex gap-2 sm:border-r-1 sm:pr-5 border-gray-700 pb-3 sm:pb-0 border-b-1 sm:border-b-0 w-full sm:w-auto">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((_, idx) => (
                  <Star
                    key={idx}
                    size={16}
                    className={`sm:w-[18px] sm:h-[18px] ${
                      idx + 1 <= Math.floor(product?.ratings?.average ?? 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-gray-300 text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-500 text-sm sm:text-base">
                ({product?.ratings.count} Reviews)
              </p>
            </div>
            {product?.totalStock == 0 ? (
              <p className="product-condition text-red-500 text-sm sm:text-base">
                Out of stock
              </p>
            ) : (
              <p className="product-condition text-green-400 text-sm sm:text-base">
                ({product?.totalStock}) In stock
              </p>
            )}
          </div>

          {/* Price */}
          <div className="price flex gap-3 items-baseline">
            <p className="price text-xl sm:text-2xl font-semibold">
              ${product?.maxPrice}
            </p>
            {product?.maxPrice !== product?.minPrice && (
              <p className="price text-base sm:text-lg line-through text-gray-600">
                ${product?.minPrice}
              </p>
            )}
          </div>

          {/* Description */}
          <p className="description text-sm sm:text-base w-full lg:w-5/6 pb-1 leading-relaxed">
            {product?.description}
          </p>

          {/* Colors */}
          <div className="colors flex flex-wrap gap-2 items-center my-2 border-t-1 pt-4 sm:pt-5 border-black/60 border-solid">
            <h2 className="mr-1 sm:mr-3 text-sm sm:text-base font-medium">
              Colors:
            </h2>
            <span className="bg-txt-secondary2 w-6 h-6 sm:w-7 sm:h-7 rounded-full cursor-pointer hover:scale-110 transition-transform"></span>
            <span className="bg-blue-700 w-6 h-6 sm:w-7 sm:h-7 rounded-full cursor-pointer hover:scale-110 transition-transform"></span>
          </div>

          {/* Sizes */}
          <div className="sizes flex flex-wrap gap-2 items-center">
            <h2 className="mr-1 sm:mr-3 text-sm sm:text-base font-medium w-full sm:w-auto mb-2 sm:mb-0">
              Sizes:
            </h2>
            {["XS", "S", "M", "L", "XL"].map((sizeOption) => (
              <span
                key={sizeOption}
                className={`rounded-sm p-2 sm:p-2.5 flex justify-center border-solid border-1 items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm w-12 sm:w-14 h-9 sm:h-10 text-sm sm:text-base font-medium ${
                  size === sizeOption
                    ? "bg-txt-secondary2 text-white border-txt-secondary2"
                    : "bg-white border-black"
                }`}
                onClick={() => setSize(sizeOption)}
              >
                {sizeOption}
              </span>
            ))}
          </div>

          {/* Buy Section */}
          <div className="buyPro flex flex-col sm:flex-row gap-3 sm:gap-4 w-full mt-6 sm:mt-8 lg:mt-10">
            {/* Quantity Selector */}
            <div className="quantity flex justify-between items-center w-full sm:w-32 md:w-36 rounded-sm bg-gray-100 h-10 sm:h-11">
              <Button
                className="rounded-sm h-full px-4 sm:px-5 text-lg sm:text-xl"
                onClick={() => count >= 2 && setCount(count - 1)}
              >
                -
              </Button>
              <span className="flex-1 h-full flex justify-center items-center text-base sm:text-lg font-medium">
                {count}
              </span>
              <Button
                className="rounded-sm h-full px-4 sm:px-5 text-lg sm:text-xl"
                onClick={() => count <= 9 && setCount(count + 1)}
              >
                +
              </Button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 sm:gap-4 flex-1">
              <Button className="flex-1 sm:flex-none sm:min-w-32 rounded-sm text-sm sm:text-base h-10 sm:h-11">
                Buy Now
              </Button>

              <div className="icons flex items-center gap-2 sm:gap-3">
                <div
                  onClick={addToWishlist}
                  className="bg-white rounded-sm border-1 border-black border-solid p-2 sm:p-2.5 flex justify-center items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm"
                  aria-label="Add to wishlist"
                >
                  <Heart size={18} className="sm:w-5 sm:h-5" />
                </div>
                <div
                  onClick={addToCart}
                  className="bg-white rounded-sm border-1 border-black border-solid p-2 sm:p-2.5 flex justify-center items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm"
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={18} className="sm:w-5 sm:h-5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
