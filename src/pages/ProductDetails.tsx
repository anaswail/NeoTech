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
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 bg-white flex-col ">
        <h1 className="text-txt-black text-4xl font-bold mb-8">
          Neo
          <span className="text-txt-secondary2">Tech</span>
        </h1>
        <SyncLoader size={25} margin={5} />
        <h1 className="absolute bottom-10 text-xl font-bold opacity-80 max-md:text-sm">
          Developed By <span className="text-txt-secondary2">Anas & Hagar</span>
        </h1>
      </div>
    );
  }

  return (
    <div className="my-16 sm:my-20 lg:my-30">
      <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
        {product?.title}
      </h1>
      <div className="content flex mt-8 lg:mt-10">
        <div className="img-section w-1/2 flex  justify-center">
          <div className="switchImages w-1/3">
            {product?.images?.map((productImage, idx) => (
              <div
                key={idx}
                className={`image ${
                  image === productImage.secure_url
                    ? "bg-txt-secondary2/85"
                    : "bg-txt-secondary hover:bg-gray-200"
                } my-3 w-3/4 p-2 flex justify-center items-center rounded-lg cursor-pointer`}
                onClick={() => setImage(productImage.secure_url)}
              >
                <img
                  src={productImage.secure_url}
                  alt="product image"
                  className="w-1/2 sm:h-20 md:h-24 lg:h-22 object-contain"
                />
              </div>
            ))}
          </div>
          <div className="main-image w-2/3 p-10 rounded-lg bg-txt-secondary h-3/4 flex justify-center items-center">
            <img
              src={image || "null"}
              alt="main-img"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>

        <div className="text-section w-1/2 ml-10 flex flex-col gap-3">
          <h1 className="product-title text-3xl font-bold ">
            {product?.title}
          </h1>
          <div className="rate flex items-center gap-5">
            <div className="rates flex gap-2 border-r-1 pr-5 border-gray-700">
              {[1, 2, 3, 4, 5].map((_, idx) => (
                <Star
                  key={idx}
                  size={18}
                  className={
                    idx + 1 <= Math.floor(product?.ratings?.average ?? 0)
                      ? "fill-yellow-400 text-yellow-400"
                      : "fill-gray-300 text-gray-300"
                  }
                />
              ))}
              <p className="text-gray-500 ml-2">
                ({product?.ratings.count} Reviews)
              </p>
            </div>
            {product?.totalStock == 0 ? (
              <p className="product-condition text-red-500 ">Out of stock</p>
            ) : (
              <p className="product-condition text-green-400 ">
                ({product?.totalStock}) In stock
              </p>
            )}
          </div>
          <div className="price flex gap-3  ">
            <p className="price text-2xl ">${product?.maxPrice}</p>
            {product?.maxPrice === product?.minPrice ? (
              ""
            ) : (
              <p className="price text-lg line-through text-gray-600">
                ${product?.minPrice}
              </p>
            )}
          </div>
          <p className="description w-5/6 pb-1">{product?.description}</p>
          <div className="colors flex gap-2 items-center my-2 border-t-1 pt-5 border-black/60 border-solid">
            <h2 className="mr-3">Colors:</h2>
            <span className="bg-txt-secondary2 w-5 h-5 rounded-full"></span>
            <span className="bg-blue-700 w-5 h-5 rounded-full "></span>
          </div>
          <div className="sizes flex gap-2 items-center">
            <h2 className="mr-3">Sizes:</h2>
            <span
              className={` rounded-sm  p-1.5 sm:p-2 flex justify-center border-solid border-1 items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm w-10 ${
                size === "XS"
                  ? "bg-txt-secondary2 text-white border-txt-secondary2 "
                  : "bg-white  border-black "
              }`}
              onClick={() => setSize("XS")}
            >
              XS
            </span>
            <span
              className={` rounded-sm  p-1.5 sm:p-2 flex justify-center border-solid border-1 items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm w-10 ${
                size === "S"
                  ? "bg-txt-secondary2 text-white border-txt-secondary2 "
                  : "bg-white  border-black "
              }`}
              onClick={() => setSize("S")}
            >
              S
            </span>
            <span
              className={` rounded-sm  p-1.5 sm:p-2 flex justify-center border-solid border-1 items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm w-10 ${
                size === "M"
                  ? "bg-txt-secondary2 text-white border-txt-secondary2 "
                  : "bg-white  border-black "
              }`}
              onClick={() => setSize("M")}
            >
              M
            </span>
            <span
              className={` rounded-sm  p-1.5 sm:p-2 flex justify-center border-solid border-1 items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm w-10 ${
                size === "L"
                  ? "bg-txt-secondary2 text-white border-txt-secondary2 "
                  : "bg-white  border-black "
              }`}
              onClick={() => setSize("L")}
            >
              L
            </span>
            <span
              className={` rounded-sm  p-1.5 sm:p-2 flex justify-center border-solid border-1 items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm w-10 ${
                size === "XL"
                  ? "bg-txt-secondary2 text-white border-txt-secondary2 "
                  : "bg-white  border-black "
              }`}
              onClick={() => setSize("XL")}
            >
              XL
            </span>
          </div>
          <div className="buyPro flex gap-5 w-full mt-10">
            <div className="quantity  flex justify-between items-center w-[23%] rounded-sm bg-gray-100">
              <Button
                className="rounded-sm"
                onClick={() =>
                  count >= 2 ? setCount(count - 1) : setCount(count)
                }
              >
                -
              </Button>
              <span className="w-1/2 h-full flex justify-center  items-center">
                {count}
              </span>
              <Button
                className="rounded-sm"
                onClick={() =>
                  count <= 9 ? setCount(count + 1) : setCount(count)
                }
              >
                +
              </Button>
            </div>
            <Button className="w-1/3 rounded-sm text-md h-10">Buy Now</Button>

            <div className="icons flex items-center gap-2">
              <div
                onClick={addToWishlist}
                className="bg-white rounded-sm border-1 border-black border-solid p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm"
              >
                <Heart size={16} className="sm:w-5 sm:h-5" />
              </div>
              <div
                onClick={addToCart}
                className="bg-white rounded-sm border-1 border-black border-solid p-1.5 sm:p-2 flex justify-center items-center hover:bg-txt-secondary2 hover:border-txt-secondary2 hover:text-white transition-all cursor-pointer duration-300 shadow-sm"
              >
                <ShoppingCart size={16} className="sm:w-5 sm:h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
