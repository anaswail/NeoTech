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
import { Link } from "react-router";

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
  const [products, setProducts] = useState(() => productsData ?? []);

  useEffect(() => {
    if (selectedCat === "all") {
      setProducts(productsData ?? []);
    } else {
      setProducts(categoryData?.products?.products ?? []);
    }
  }, [selectedCat, productsData, categoryData]);

  // Fetch data from API
  useEffect(() => {
    dispatch(actGetHomeData());
  }, [dispatch]);
  useEffect(() => {
    dispatch(actFetchProducts({ page: currentPage, limit: 30 }));
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
        <h1 className="text-txt-black text-2xl sm:text-3xl md:text-4xl font-bold mb-8 px-4 text-center">
          Neo<span className="text-txt-secondary2">Tech</span>
        </h1>
        <SyncLoader size={25} margin={5} />
        <h1 className="absolute bottom-10 text-sm sm:text-base md:text-xl font-bold opacity-80 px-4 text-center">
          Developed By <span className="text-txt-secondary2">Anas & Hagar</span>
        </h1>
      </div>
    );
  }

  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLocaleLowerCase();
    const source =
      selectedCat === "all"
        ? productsData ?? []
        : categoryData?.products?.products ?? [];
    setProducts(
      source.filter((product) =>
        product.title.toLocaleLowerCase().includes(query)
      )
    );
  };

  return (
    <div className="min-h-screen">
      <div className="p-3 sm:p-4 md:p-5">
        <Heading title="Products" />
      </div>
      <div className="product bg-white w-full h-full p-3 sm:p-4 md:p-5 rounded-md">
        {/* Header with Search and Buttons */}
        <div className="header flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4 mt-3 sm:mt-5">
          {/* Search Input */}
          <div className="search relative w-full sm:w-1/2 md:w-2/5 lg:w-1/2 border-gray-500 border-1 rounded-md">
            <Input
              placeholder="What are you looking for?"
              className="p-3 sm:p-4 md:p-5 pr-10"
              onChange={handleSearchProduct}
            />
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-500 pointer-events-none" />
          </div>

          {/* Action Buttons */}
          <div className="btns flex gap-2 sm:gap-3 md:gap-5">
            <Link to="/dashboard/product-crud">
              <Button className="rounded-sm flex-1 sm:flex-none text-xs sm:text-sm px-3 sm:px-4">
                <span className="hidden sm:inline">New Product</span>
                <span className="sm:hidden">New</span>
                <Plus size={20} className="sm:w-6 sm:h-6 ml-1 sm:ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Category Filter Buttons */}
        <div className="my-6 sm:my-8">
          <div className="flex overflow-x-auto gap-2 sm:gap-3 md:gap-4 pb-4 scrollbar-hide">
            <Button
              onClick={() => setSelectedCat("all")}
              className={`flex-shrink-0 rounded-lg px-3 sm:px-4 py-2 sm:py-3 border transition-colors whitespace-nowrap text-xs sm:text-sm ${
                selectedCat === "all"
                  ? "bg-txt-secondary2 text-white"
                  : "bg-white text-black border-gray-200 hover:bg-gray-50"
              }`}
            >
              All ({totalProducts})
            </Button>
            {homeData?.categories.map((category, index) => (
              <Button
                key={index}
                onClick={() => handleActCategory(category.slug)}
                className={`flex-shrink-0 rounded-lg px-3 sm:px-4 py-2 sm:py-3 border transition-colors whitespace-nowrap text-xs sm:text-sm ${
                  selectedCat === category.slug
                    ? "bg-txt-secondary2 text-white"
                    : "bg-white text-black border-gray-200 hover:bg-gray-50"
                }`}
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="products">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6 lg:gap-8 mt-6 sm:mt-8 lg:mt-10">
            {products?.map((product, idx) => (
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
          {selectedCat === "all" && (
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-8 sm:mt-10 px-4">
              <Button
                onClick={() => dispatch(setPage((currentPage ?? 1) - 1))}
                disabled={(currentPage ?? 1) === 1}
                className="disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base px-6"
              >
                Prev
              </Button>

              <span className="font-semibold text-sm sm:text-base order-first sm:order-none">
                Page {currentPage ?? 1} of {totalPages ?? 1}
              </span>

              <Button
                onClick={() => dispatch(setPage((currentPage ?? 1) + 1))}
                disabled={(currentPage ?? 1) === (totalPages ?? 1)}
                className="disabled:opacity-50 w-full sm:w-auto text-sm sm:text-base px-6"
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsOverview;
