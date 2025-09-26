import { Button } from "@/components/ui/button";
import type { RootState } from "@/store/store";
import { Heart, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { SyncLoader } from "react-spinners";

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
  const { data, loading } = useSelector((state: RootState) => state.products);
  const productId = Number(id);
  const product = data.find((item) => Number(item.id) === productId);

  const [image, setImage] = useState(product?.img[0]);

  if (loading !== "fulfilled") {
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 bg-white flex-col ">
        <h1 className="text-txt-black text-4xl font-bold mb-8">
          Neo
          <span className="text-txt-secondary2">Tech</span>
        </h1>
        <SyncLoader size={25} margin={5} />
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
            {product?.img.map((productImage, idx) => (
              <div
                className={`image ${
                  image === productImage
                    ? "bg-txt-secondary2/85"
                    : "bg-txt-secondary hover:bg-gray-200"
                } my-3 w-3/4 p-2 flex justify-center items-center rounded-lg cursor-pointer `}
                key={idx}
                onClick={() => setImage(productImage)}
              >
                <img
                  src={productImage}
                  alt="product image"
                  className=" w-1/2  sm:h-20 md:h-24 lg:h-22 object-contain"
                />
              </div>
            ))}
          </div>
          <div className="main-image w-2/3 p-10 rounded-lg bg-txt-secondary h-3/4 flex justify-center items-center">
            <img src={image} alt="main-img" className="w-full h-3/4 " />
          </div>
        </div>

        <div className="text-section w-1/2 ml-10 flex flex-col gap-3">
          <h1 className="product-title text-3xl font-bold ">
            {product?.title}
          </h1>
          <p className="product-condition text-green-400 ">In stock</p>
          <p className="price text-2xl ">${product?.price}</p>

          {product?.description.slice(0, 2).map((desc) => (
            <p className="description w-5/6 pb-1">{desc}</p>
          ))}

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
