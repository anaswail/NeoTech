import Card from "@/components/Card";
import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { actFetchProducts } from "@/store/slices/products/act/actProducts";
import { setPage } from "@/store/slices/products/productsSlice";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";

const AllProducts = ({ heading = true }: { heading: boolean }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, currentPage, totalPages, loading } = useSelector(
    (state: RootState) => state?.products
  );
  useEffect(() => {
    dispatch(actFetchProducts({ page: currentPage, limit: 20 }));
  }, [currentPage, dispatch]);

  if (loading !== "fulfilled") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center bg-white z-50">
        <h1 className="text-txt-black text-4xl font-bold mb-8">
          Neo<span className="text-txt-secondary2">Tech</span>
        </h1>
        <SyncLoader size={25} margin={5} />
        <h1 className="absolute bottom-10 text-xl font-bold opacity-80 max-md:text-sm">
          Developed By <span className="text-txt-secondary2">Anas & Hagar</span>
        </h1>
      </div>
    );
  }

  return (
    <div className={`${heading ? "my-16 sm:my-20 lg:my-30" : "my-5"}`}>
      {heading && <Heading title="All products" />}
      <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
        {data?.map((product, idx) => (
          <Card
            key={idx}
            img={product?.interfaceImages.secure_url}
            title={product.title}
            price={product.maxPrice}
            discount={product.minPrice}
            wishAndCart={true}
            id={product.id}
          />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-3 mt-10">
        <Button
          onClick={() => dispatch(setPage((currentPage ?? 1) - 1))}
          disabled={(currentPage ?? 1) === 1}
          className=" disabled:opacity-50"
        >
          Prev
        </Button>

        <span className="font-semibold">
          Page {currentPage ?? 1} of {totalPages ?? 1}
        </span>

        <Button
          onClick={() => dispatch(setPage((currentPage ?? 1) + 1))}
          disabled={(currentPage ?? 1) === (totalPages ?? 1)}
          className="disabled:opacity-50 "
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default AllProducts;
