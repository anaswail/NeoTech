import Card from "@/components/Card";
import Heading from "@/components/Heading";
import { actGetCategoryBySlug } from "@/store/slices/products/act/actGetCategoryBySlug";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";

import { SyncLoader } from "react-spinners";

const CategoryPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { title } = useParams();
  const { data, loading } = useSelector((state: RootState) => state.category);
  const slug = title;

  useEffect(() => {
    if (!slug) return;
    if (loading === "idle" || !data) {
      dispatch(actGetCategoryBySlug({ slug }));
    }
  }, [slug, loading, data, dispatch]);

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
    <div className="container mx-auto px-4 mt-24 sm:mt-32">
      <div className="ourProducts my-16 sm:my-20 lg:my-30">
        <Heading title={data?.path[0]?.name ?? "Category"} />

        {/* Desktop Grid */}
        <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
          {data?.products.products.map((product) => (
            <Card
              key={product.id}
              img={product.interfaceImages.secure_url}
              title={product.title}
              price={product.maxPrice}
              wishAndCart={true}
              id={product.id}
              discount={product.minPrice}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
