import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, Plus, SearchIcon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { actGetHomeData } from "@/store/slices/products/act/actGetHomeData";
import { actGetCategoryBySlug } from "@/store/slices/products/act/actGetCategoryBySlug";
import Card from "@/components/Card";
import { actFetchProducts } from "@/store/slices/products/act/actProducts";
import { SyncLoader } from "react-spinners";
import { setPage } from "@/store/slices/products/productsSlice";

const ProductsOverview = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: homeData } = useSelector((state: RootState) => state.home);
  const { data: categoryData, loading } = useSelector(
    (state: RootState) => state.category
  );
  const {
    data: productsData,
    loading: productsLoading,
    currentPage,
    totalPages,
    totalProducts,
  } = useSelector((state: RootState) => state?.products);

  const [selectedCat, setSelectedCat] = useState("all");

  // Fetch data from API
  useEffect(() => {
    dispatch(actGetHomeData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(actFetchProducts({ page: currentPage, limit: 15 }));
  }, [dispatch, currentPage]);

  const handleActCategory = (slug: string) => {
    setSelectedCat(slug);
    dispatch(actGetCategoryBySlug({ slug }));
  };

  if (
    loading === "pending" ||
    productsLoading === "pending" ||
    !productsData ||
    !homeData
  ) {
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
    <div className="product bg-white w-full h-full p-5 rounded-md  ">
      <Heading title="Products" />{" "}
      <div className="header flex justify-between mt-5">
        <div className="search relative w-1/2  ml-2 border-gray-500 border-1 rounded-md">
          <Input placeholder="What are you looking for?" className="p-5  " />
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
        </div>
        <div className="btns ">
          <Button className="rounded-sm mr-5 bg-transparent text-black border-1 border-gray-500 hover:bg-gray-50  ">
            Filter <Filter />
          </Button>
          <Button className="rounded-sm">
            New Product <Plus size={25} />{" "}
          </Button>
        </div>
      </div>
      <div className=" my-8">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          <Button
            onClick={() => setSelectedCat("all")}
            className={`"flex-shrink-0  rounded-lg px-4 py-3 border transition-colors whitespace-nowrap text-sm" ${
              selectedCat === "all"
                ? "bg-txt-secondary2 text-white "
                : "bg-white text-black   border-gray-200 hover:bg-gray-50"
            }`}
          >
            All ({totalProducts})
          </Button>
          {homeData?.categories.map((category, index) => (
            <Button
              key={index}
              onClick={() => handleActCategory(category.slug)}
              className={`"flex-shrink-0  rounded-lg px-4 py-3 border transition-colors whitespace-nowrap text-sm" ${
                selectedCat === category.slug
                  ? "bg-txt-secondary2 text-white "
                  : "bg-white text-black   border-gray-200 hover:bg-gray-50"
              }`}
            >
              {category.name} ({homeData.categories.length})
            </Button>
          ))}
        </div>
      </div>
      <div className="products">
        {selectedCat === "all" ? (
          <>
            <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
              {productsData?.map((product, idx) => (
                <Card
                  key={idx}
                  img={product?.interfaceImages.secure_url}
                  title={product.title}
                  price={product.maxPrice}
                  discount={product.minPrice}
                  wishAndCart={false}
                  deleteAndUpdate={true}
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
          </>
        ) : (
          <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
            {categoryData?.products?.products?.map((product, idx) => (
              <Card
                key={idx}
                img={product?.interfaceImages.secure_url}
                title={product.title}
                price={product.maxPrice}
                discount={product.minPrice}
                wishAndCart={false}
                deleteAndUpdate={true}
                id={product.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsOverview;
