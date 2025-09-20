import Card from "@/components/Card";
import type { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { SyncLoader } from "react-spinners";

const CategoryPage = () => {
  const { title } = useParams();
  const { data, loading } = useSelector((state: RootState) => state.products);
  const catProducts = data.filter((item) => item.category === title);

  if (loading !== "fulfilled") {
    return (
      <div className="fixed top-0 left-0 w-full h-screen flex justify-center items-center z-50 bg-white/20 flex-col ">
        <h1 className="text-txt-black text-4xl font-bold mb-5">NeoTech</h1>
        <SyncLoader size={25} margin={5} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-24 sm:mt-32">
      <div className="ourProducts my-16 sm:my-20 lg:my-30">
        <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
          {catProducts[0]?.category}
        </h1>

        {/* Desktop Grid */}
        <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
          {catProducts.map((product, idx) => (
            <Card
              key={idx}
              img={product.img[0]}
              title={product.title}
              price={product.price}
              wishAndCart={true}
              id={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
