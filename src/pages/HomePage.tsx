import { Link } from "react-router";

import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Headphones,
  Headset,
  LaptopMinimal,
  ShieldCheck,
  Smartphone,
  Truck,
  Watch,
} from "lucide-react";
import Slider from "react-slick";
import Frame600 from "../assets/Frame600.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { banners, categories, products } from "@/utils/Repeated";
import Card from "@/components/Card";
import SectionTitle from "@/utils/SectionTitle";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actFetchProducts } from "@/store/slices/actProducts";
import type { AppDispatch, RootState } from "@/store/store";
import { PuffLoader, ScaleLoader } from "react-spinners";

// Custom arrow components
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-16 sm:right-20 -top-12 sm:-top-15 cursor-pointer -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
    >
      <ChevronLeft size={20} className="text-gray-600 sm:w-6 sm:h-6" />
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      onClick={onClick}
      className="absolute right-2 -top-12 sm:-top-15 cursor-pointer -translate-y-1/2 z-10 bg-white hover:bg-gray-100 rounded-full p-2 shadow-lg transition-all duration-300 hover:scale-110"
    >
      <ChevronRight size={20} className="text-gray-600 sm:w-6 sm:h-6" />
    </button>
  );
};

// data handle

const servicesSec = [
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

const categoriesSec = [
  {
    name: "Smart phones",
    icon: <Smartphone size={40} />,
  },
  {
    name: "Laptops",
    icon: <LaptopMinimal size={40} />,
  },
  {
    name: "Cameras",
    icon: <Camera size={40} />,
  },
  {
    name: "Headphones",
    icon: <Headphones size={40} />,
  },
  {
    name: "Games",
    icon: <Gamepad2 size={40} />,
  },
  {
    name: "Smart Watches",
    icon: <Watch size={40} />,
  },
];

const HomePage = () => {
  // Sliders settings

  const bannerSettings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
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
          slidesToScroll: 1,
        },
      },
    ],
  };

  const discountSettingsMobile = {
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Categories slider for mobile
  const categoriesSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    Infinity: true,
    autoplaySpeed: 5000,
    speed: 1000,
    arrows: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Services slider for mobile
  const servicesSettings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
  };

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector(
    (state: RootState) => state?.products
  );
  useEffect(() => {
    dispatch(actFetchProducts());
  }, []);

  // if (loading !== "fulfilled") {
  //   return (
  //     <div className=" top-0 left-0 w-full h-screen flex justify-center items-center bg-black/70  z-30">
  //       <ScaleLoader color="#DB4444" size={200} className="z-40" />
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto px-4 mt-24 sm:mt-32">
      {/* Hero Section */}
      <div className="hero-section flex flex-col lg:flex-row gap-4 lg:gap-6">
        {/* Categories - Hidden on mobile, shown as sidebar on desktop */}
        <div className="category-part hidden lg:block w-full lg:w-1/4 bg-white border border-gray-200 rounded-lg shadow-sm">
          <div className="p-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 transition-colors last:border-b-0"
              >
                <Link
                  to={`/category/${category.name}`}
                  className="text-gray-700 hover:text-txt-secondary2 flex justify-between items-center"
                >
                  {category.name}
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Slider Section */}
        <div className="slider-part w-full lg:w-3/4">
          <div className="slider-container overflow-hidden shadow-lg rounded-lg">
            <Slider {...bannerSettings}>
              {banners.map((banner, index) => (
                <div className="slide-item" key={index}>
                  <img
                    src={banner.image}
                    alt={banner.alt}
                    className="w-full  sm:h-64 lg:h-80 xl:h-96 object-cover"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>

      {/* Mobile Categories Section (appears after hero on mobile) */}
      <div className="mobile-categories lg:hidden my-8">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {categories.slice(0, 8).map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.name}`}
              className="flex-shrink-0 bg-white border border-gray-200 rounded-lg px-4 py-3 hover:bg-gray-50 transition-colors whitespace-nowrap text-sm"
            >
              {category.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Discount Section */}
      <div className="discountSection my-16 sm:my-20 lg:my-30">
        <SectionTitle title="Offers" />
        <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
          Flash Sales
        </h1>
        <div className="slider-container relative my-8 lg:my-15 w-full ">
          <Slider
            {...(screen.width > 768
              ? discountSettings
              : discountSettingsMobile)}
          >
            {data
              .filter(
                (productFilter) =>
                  productFilter.price !== productFilter.discount
              )
              .map((product, idx) => (
                <div key={idx} className="px-2 ">
                  <Card
                    img={product.img[0]}
                    title={product.title}
                    price={product.price}
                    discount={product.discount}
                    wishAndCart={true}
                    id={idx}
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>

      {/* Categories Section */}
      <div className="categoriesSection my-16 sm:my-20 lg:my-30">
        <SectionTitle title="Categories" />
        <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
          Shop by Category
        </h1>

        {/* Desktop Categories Grid */}
        <div className="hidden lg:flex justify-between mt-15">
          {categoriesSec.map((cat, index) => (
            <Link key={index} to={`category/${cat.name}`}>
              <div className="category h-40 w-46 rounded-lg transition-all hover:bg-txt-secondary2 hover:border-txt-secondary2 duration-300 cursor-pointer hover:text-white border-txt-gray border-2 flex flex-col justify-center items-center gap-2">
                {cat.icon}
                <h1 className="text-center text-sm">{cat.name}</h1>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile & Tablet Categories Slider */}
        <div className="lg:hidden mt-8">
          <Slider {...categoriesSettings}>
            {categoriesSec.map((cat, index) => (
              <div key={index} className="px-2">
                <Link to={`category/${cat.name}`}>
                  <div className="category h-32 sm:h-36 rounded-lg transition-all hover:bg-txt-secondary2 hover:border-txt-secondary2 duration-300 cursor-pointer hover:text-white border-txt-gray border-2 flex flex-col justify-center items-center gap-2 mx-2">
                    <div className="scale-75 sm:scale-90">{cat.icon}</div>
                    <h1 className="text-center text-xs sm:text-sm px-2">
                      {cat.name}
                    </h1>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="discountSection my-16 sm:my-20 lg:my-30">
        <SectionTitle title="This Month" />
        <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
          Best Selling Products
        </h1>
        <div className="slider-container relative my-8 lg:my-15">
          <Slider
            {...(screen.width > 768
              ? discountSettings
              : discountSettingsMobile)}
          >
            {data.map((product, idx) => (
              <div key={idx} className="px-2">
                <Card
                  img={product.img[0]}
                  title={product.title}
                  price={product.price}
                  discount={product.discount}
                  wishAndCart={true}
                  id={idx}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Banner */}
      <div className="my-16 sm:my-20 lg:my-30">
        <img
          className="bg-cover w-full rounded-lg"
          src={Frame600}
          alt="Banner"
        />
      </div>

      {/* Our Products */}
      <div className="ourProducts my-16 sm:my-20 lg:my-30">
        <SectionTitle title="Our Products" />
        <h1 className="text-xl sm:text-2xl lg:text-headerSection font-semibold mt-4 lg:mt-6">
          Explore Our Products
        </h1>

        {/* Desktop Grid */}
        <div className="flex justify-center gap-6 lg:gap-10 flex-wrap mt-8 lg:mt-15">
          {data.slice(0, 8).map((product, idx) => (
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

        <div className="flex justify-center mt-8 lg:mt-10">
          <Link to="/allProducts">
            <Button className="text-base sm:text-lg p-4 sm:p-6">
              View All Products
            </Button>
          </Link>
        </div>
      </div>

      {/* Services */}
      <div className="services mb-16 sm:mb-20 lg:mb-10">
        {/* Desktop Services */}
        <div className="hidden md:flex justify-between items-center w-full lg:w-10/12 mx-auto">
          {servicesSec.map((el, index) => (
            <div
              key={index}
              className="service flex flex-col justify-center items-center gap-2 text-center"
            >
              <div className="icon bg-txt-gray/50 rounded-full p-4 lg:p-5 text-white w-16 h-16 lg:w-20 lg:h-20 flex justify-center items-center">
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

        {/* Mobile Services Slider */}
        <div className="md:hidden">
          <Slider {...servicesSettings}>
            {servicesSec.map((el, index) => (
              <div key={index} className="px-4">
                <div className="service flex flex-col justify-center items-center gap-3 text-center py-8">
                  <div className="icon bg-txt-gray/50 rounded-full p-4 text-white w-16 h-16 flex justify-center items-center">
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
      </div>
    </div>
  );
};

export default HomePage;
