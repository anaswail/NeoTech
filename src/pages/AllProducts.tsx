import Card from "@/components/Card";
import { actFetchProducts } from "@/store/slices/actProducts";
import type { AppDispatch, RootState } from "@/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AllProducts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state?.products
  );
  useEffect(() => {
    dispatch(actFetchProducts());
  }, []);

  return (
    <div className="my-16 sm:my-20 lg:my-30">
      <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
        All Products
      </h1>
      <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
        {data.map((product, idx) => (
          <Card
            key={idx}
            img={product.img[0]}
            title={product.title}
            price={product.price}
            discount={product.discount}
            wishAndCart={true}
            id={idx}
          />
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
