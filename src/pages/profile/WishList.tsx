import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { actClearWishlist } from "@/store/slices/products/act/actClearWishlist";
import { actGetMyWishlist } from "@/store/slices/products/act/actGetMyWishlist";
import { type AppDispatch, type RootState } from "@/store/store";
import { Heart, XCircle } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const WishList = () => {
  const {
    data: getWishlist,
    loading: getWishlistLoad,
    error: getWishlistErr,
  } = useSelector((state: RootState) => state.getWishlist);

  const { loading: clearWishlistLoad, error: clearWishlistErr } = useSelector(
    (state: RootState) => state.clearWishlist,
  );

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(actGetMyWishlist());
  }, [dispatch]);

  const handleClearWishlist = async () => {
    const result = await dispatch(actClearWishlist());

    if (actClearWishlist.fulfilled.match(result)) {
      toast.success("Your wishlist has been cleared.");
      dispatch(actGetMyWishlist());
    } else if (actClearWishlist.rejected.match(result)) {
      toast.error(
        clearWishlistErr?.message ||
          "Failed to clear wishlist. Please try again.",
      );
    }
  };

  if (getWishlistLoad === "pending") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center animate-pulse">
          <Heart size={20} className="text-indigo-300" />
        </div>
        <p className="text-sm text-gray-400 font-medium">
          Loading your wishlist…
        </p>
      </div>
    );
  }

  if (getWishlistLoad === "rejected") {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
          <XCircle size={20} className="text-red-400" />
        </div>
        <p className="text-sm text-gray-500 font-medium">
          {getWishlistErr?.message || "Failed to load wishlist"}
        </p>
        <button
          onClick={() => dispatch(actGetMyWishlist())}
          className="text-xs text-indigo-500 hover:text-indigo-700 font-semibold transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24 sm:mt-32">
      <div className="head flex items-center justify-between mb-8">
        <h1>
          Wish List <span>({getWishlist?.products.length ?? 0})</span>
        </h1>
        <Button
          onClick={handleClearWishlist}
          disabled={
            clearWishlistLoad === "pending" || !getWishlist?.products.length
          }
        >
          {clearWishlistLoad === "pending" ? "Clearing…" : "Remove All"}
        </Button>
      </div>

      {getWishlist && getWishlist.products.length > 0 ? (
        <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
          {getWishlist.products.map((product, idx) => (
            <Card
              key={product._id ?? idx}
              img={product?.interfaceImages?.secure_url as string}
              title={product.title}
              price={product.minPrice}
              discount={product.maxPrice}
              id={product._id}
              wishAndCart={true}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-gray-400">
          <p className="text-lg font-medium">No products found in wishlist</p>
          <p className="text-sm mt-1">Products will appear here once added.</p>
        </div>
      )}
    </div>
  );
};

export default WishList;
