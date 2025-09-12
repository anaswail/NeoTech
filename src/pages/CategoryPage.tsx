import Card from "@/components/Card";
import { products } from "@/utils/Repeated";

const CategoryPage = () => {
  return (
    <div className="container mx-auto px-4 mt-24 sm:mt-32">
      <div className="ourProducts my-16 sm:my-20 lg:my-30">
        <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
          Category Page
        </h1>

        {/* Desktop Grid */}
        <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
          {products.map((product, idx) => (
            <Card
              key={idx}
              img={product.img}
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
