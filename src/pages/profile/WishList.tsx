import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import { products } from "@/utils/Repeated";

const WishList = () => {
  return (
    <div className="container  mx-auto px-4 mt-24 sm:mt-32">
      <div className="head flex items-center justify-between mb-8">
        <h1>
          Wish List <span>(2)</span>
        </h1>
        <Button>Remove All</Button>
      </div>

      {/* Desktop Grid */}
      <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
        {products.map((product, idx) => (
          <Card
            key={idx}
            img={product.img}
            title={product.title}
            price={product.price}
            deleteIcon={true}
            id={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default WishList;
