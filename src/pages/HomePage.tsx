// =========================================
//                  Imports
// =========================================
import { Link } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headset,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { SyncLoader } from "react-spinners";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Frame600 from "../assets/Frame600.png";
import Card from "@/components/Card";
import SectionTitle from "@/utils/SectionTitle";
import { Button } from "@/components/ui/button";
import { banners } from "@/utils/Repeated";

import type { AppDispatch, RootState } from "@/store/store";
import { actFetchProducts } from "@/store/slices/products/act/actProducts";
import { actGetHomeData } from "@/store/slices/products/act/actGetHomeData";
import { actGetCategoryBySlug } from "@/store/slices/products/act/actGetCategoryBySlug";

// =========================================
//        Custom Arrows (with types)
// =========================================
interface ArrowProps {
  onClick?: () => void;
}

const PrevArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-16 sm:right-20 -top-12 sm:-top-16 cursor-pointer -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
  >
    <ChevronLeft size={20} className="text-gray-600 sm:w-6 sm:h-6" />
  </button>
);

const NextArrow: React.FC<ArrowProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="absolute right-2 -top-12 sm:-top-16 cursor-pointer -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
  >
    <ChevronRight size={20} className="text-gray-600 sm:w-6 sm:h-6" />
  </button>
);

// =========================================
// Constants (services & categories data)
// =========================================
const servicesData = [
  {
    icon: <Truck className="text-white" size={40} />,
    title: "FREE AND FAST DELIVERY",
    desc: "Free delivery for all orders over $140",
  },
  {
    icon: <Headset className="text-white" size={40} />,
    title: "24/7 CUSTOMER SERVICE",
    desc: "Friendly 24/7 customer support",
  },
  {
    icon: <ShieldCheck className="text-white" size={40} />,
    title: "MONEY BACK GUARANTEE",
    desc: "We return money within 30 days",
  },
];

// =========================================
//              Slider Settings
// =========================================
const bannerSettings = {
  dots: true,
  fade: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
};

const discountSettings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
  ],
};

const discountSettingsMobile = {
  ...discountSettings,
  slidesToShow: 2,
  responsive: [
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
  ],
};

const categoriesSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 5000,
  speed: 1000,
  arrows: false,
  responsive: [
    {
      breakpoint: 480,
      settings: { slidesToShow: 1 },
    },
    {
      breakpoint: 720,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 1020,
      settings: { slidesToShow: 4 },
    },
  ],
};

const servicesSettings = {
  dots: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
};

// =========================================
//            HomePage Component
// =========================================
const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: homeData, loading } = useSelector(
    (state: RootState) => state.home
  );

  // Fetch data from API
  useEffect(() => {
    dispatch(actFetchProducts({ page: 1, limit: 12 }));
    dispatch(actGetHomeData());
  }, [dispatch]);

  const handleActCategory = (slug: string) => {
    dispatch(actGetCategoryBySlug({ slug }));
  };
  

  // Loading Screen
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
    <div className="container mx-auto px-4 mt-24 sm:mt-32">
      {/* ================= Hero Section ================= */}
      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Categories Sidebar */}
        <div className="hidden lg:block w-full lg:w-1/4 h-90 overflow-y-scroll bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-2">
            {homeData?.categories.map((category, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors last:border-b-0"
              >
                <Link
                  to={`/category/${category.slug}`}
                  onClick={() => handleActCategory(category.slug)}
                  className="text-gray-700 hover:text-txt-secondary2 flex justify-between items-center"
                >
                  {category.name}
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Slider */}
        <div className="w-full lg:w-3/4">
          <div className="overflow-hidden shadow-lg rounded-lg">
            <Slider {...bannerSettings}>
              {banners.map((banner, index) => (
                <div key={index}>
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full sm:h-64 lg:h-80 xl:h-96 object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* ================= Mobile Categories ================= */}
      <div className="lg:hidden my-8">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {homeData?.categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.slug}`}
              onClick={() => handleActCategory(category.slug)}
              className="flex-shrink-0 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* ================= Flash Sales ================= */}
      {homeData?.flashSales?.count !== 0 && (
        <section className="my-16 sm:my-20 lg:my-30">
          <SectionTitle title="Offers" />
          <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
            Flash Sales
          </h1>
          <div className="relative my-8 lg:my-15 w-full">
            <Slider
              {...(window.innerWidth > 768
                ? discountSettings
                : discountSettingsMobile)}
            >
              {homeData?.flashSales?.products?.map((product) => (
                <div key={product.id} className="px-2">
                  <Card
                    img={product?.images?.[0]?.secure_url || "not found"}
                    title={product.title}
                    price={product?.priceRange?.max}
                    discount={product?.priceRange?.min}
                    wishAndCart={true}
                    id={product.id}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </section>
      )}

      {/* ================= Categories ================= */}
      <section className="my-16 sm:my-20 lg:my-30">
        <SectionTitle title="Categories" />
        <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
          Shop by Category
        </h1>

        {/* Cat slider */}
        <div className=" mt-10">
          <Slider {...categoriesSettings}>
            {homeData?.categories.map((cat, index) => (
              <div
                key={index}
                className="px-2 mb-3 max-md:mb-6"
                onClick={() => handleActCategory(cat.slug)}
              >
                <Link to={`/category/${cat.slug}`}>
                  <div className="category h-32 sm:h-36 rounded-lg border-2 border-txt-gray flex flex-col justify-center items-center gap-2 mx-2 hover:bg-txt-secondary2 hover:text-white transition-all duration-300">
                    <div className="scale-75 sm:scale-90">
                      <img src={cat.icon} alt={cat.name} />
                    </div>
                    <h1 className="text-center text-xs sm:text-sm px-2 capitalize">
                      {cat.name}
                    </h1>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* ================= Best Selling ================= */}
      <section className="my-16 sm:my-20 lg:my-30">
        <SectionTitle title="This Month" />
        <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
          Best Selling Products
        </h1>
        <div className="relative my-8 lg:my-15">
          <Slider
            {...(window.innerWidth > 768
              ? discountSettings
              : discountSettingsMobile)}
          >
            {homeData?.bestSelling?.map((product) => (
              <div key={product.id} className="px-2">
                <Card
                  img={product.interfaceImages.secure_url}
                  title={product.title}
                  price={product.maxPrice}
                  discount={product.minPrice}
                  wishAndCart={true}
                  id={product.id}
                />
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* ================= Banner ================= */}
      <div className="my-16 sm:my-20 lg:my-30">
        <img
          className="bg-cover w-full rounded-lg"
          src={Frame600}
          alt="Banner"
        />
      </div>

      {/* ================= Our Products ================= */}
      <section className="my-16 sm:my-20 lg:my-30">
        <SectionTitle title="Our Products" />
        <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
          Explore Our Products
        </h1>

        <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
          {homeData?.discoverProducts?.map((product) => (
            <Card
              key={product.id}
              img={product.interfaceImages.secure_url}
              title={product.title}
              price={product.maxPrice}
              discount={product.minPrice}
              wishAndCart={true}
              id={product.id}
            />
          ))}
        </div>

        <div className="flex justify-center mt-8 lg:mt-10">
          <Link
            to="/products"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <Button className="text-base sm:text-lg p-4 sm:p-6">
              View All Products
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= Services ================= */}
      <section className="mb-16 sm:mb-20 lg:mb-10">
        {/* Desktop */}
        <div className="hidden md:flex justify-between items-center w-full lg:w-10/12 mx-auto">
          {servicesData?.map((el, index) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-2 text-center"
            >
              <div className="icon bg-txt-gray/50 rounded-full p-4 lg:p-5 w-16 h-16 lg:w-20 lg:h-20 flex justify-center items-center">
                <div className="bg-black p-2 lg:p-3 rounded-full w-12 h-12 lg:w-15 lg:h-15 flex justify-center items-center">
                  <div className="scale-75 lg:scale-100">{el.icon}</div>
                </div>
              </div>
              <h1 className="text-sm lg:text-heading font-semibold mt-2 lg:mt-4">
                {el.title}
              </h1>
              <p className="text-xs lg:text-bodySection text-gray-600 max-w-32 lg:max-w-none">
                {el.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden">
          <Slider {...servicesSettings}>
            {servicesData.map((el, index) => (
              <div key={index} className="px-4">
                <div className="flex flex-col justify-center items-center gap-3 text-center py-8">
                  <div className="icon bg-txt-gray/50 rounded-full p-4 w-16 h-16 flex justify-center items-center">
                    <div className="bg-black p-2 rounded-full w-12 h-12 flex justify-center items-center">
                      <div className="scale-75">{el.icon}</div>
                    </div>
                  </div>
                  <h1 className="text-lg font-semibold">{el.title}</h1>
                  <p className="text-sm text-gray-600">{el.desc}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
