import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { useEffect } from "react";
import DevelopedWithAnas from "../assets/developedWithAnas.webp";
import { socialLinks } from "@/utils/Repeated";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { actGetHomeData } from "@/store/slices/products/act/actGetHomeData";
import { actGetCategoryBySlug } from "@/store/slices/products/act/actGetCategoryBySlug";

const Footer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const homeData = useSelector((state: RootState) => state.home);
  const categories = homeData.data?.categories;

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(actGetHomeData());
    }
  }, [dispatch, categories]);

  const handleCategoryClick = (slug: string) => {
    dispatch(actGetCategoryBySlug({ slug }));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Get up to 8 categories for footer
  const footerCategories = categories?.slice(0, 8) || [];

  const quickLinks = [
    { title: "About Us", url: "/aboutUs" },
    { title: "Contact Us", url: "/contactUs" },
    { title: "Privacy Policy", url: "/privacy" },
    { title: "Terms & Conditions", url: "/terms" },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-gray-950 to-black text-txt-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 xl:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start">
            <Link to="/" onClick={scrollToTop} className="mb-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Neo<span className="text-txt-secondary2">Tech</span>
              </h1>
            </Link>
            <p className="text-sm sm:text-base text-gray-400 mb-6 text-center sm:text-left leading-relaxed max-w-xs">
              Your trusted destination for the latest tech products and
              accessories. Quality guaranteed.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 w-full">
              <a
                href="mailto:techspireoffice@gmail.com
"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-txt-secondary2 transition-colors group"
              >
                <Mail
                  size={16}
                  className="flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <span>techspireoffice@gmail.com</span>
              </a>
              <a
                href="tel:+1234567890"
                className="flex items-center gap-3 text-sm text-gray-400 hover:text-txt-secondary2 transition-colors group"
              >
                <Phone
                  size={16}
                  className="flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <span>+20 1050305754</span>
              </a>
              <div className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span>Cairo, Egypt</span>
              </div>
            </div>

            {/* Developer Badge */}
            <div className="mt-6">
              <img
                className="w-36 sm:w-40 md:w-44 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                src={DevelopedWithAnas}
                alt="Developed With Anas"
              />
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-txt-secondary2 relative inline-block">
              Quick Links
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-txt-secondary2 sm:block hidden"></span>
            </h3>
            <ul className="space-y-2.5 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.url}
                    onClick={scrollToTop}
                    className="text-sm sm:text-base text-gray-400 hover:text-txt-secondary2 transition-all inline-flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all"
                    />
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-txt-secondary2 relative inline-block">
              Categories
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-txt-secondary2 sm:block hidden"></span>
            </h3>
            {footerCategories.length > 0 ? (
              <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-3 max-w-xs mx-auto sm:mx-0">
                {footerCategories.map((category) => (
                  <li key={category._id}>
                    <Link
                      to={`/category/${category.slug}`}
                      onClick={() => handleCategoryClick(category.slug)}
                      className="text-sm sm:text-base text-gray-400 hover:text-txt-secondary2 transition-all inline-flex items-center gap-2 group"
                    >
                      <ArrowRight
                        size={14}
                        className="opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all hidden sm:inline"
                      />
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500">Loading categories...</p>
            )}
          </div>

          {/* Social Links Section */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-txt-secondary2 relative inline-block">
              Connect With Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-txt-secondary2 sm:block hidden"></span>
            </h3>
            <div className="flex flex-col gap-3 sm:gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center sm:justify-start gap-3 text-sm sm:text-base text-gray-400 hover:text-txt-secondary2 transition-all group"
                >
                  <span className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-gray-800 group-hover:bg-txt-secondary2 text-white transition-all group-hover:scale-110">
                    {link.icon}
                  </span>
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>

            {/* Newsletter Subscription */}
            <div className="mt-6 sm:mt-8">
              <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Subscribe to Newsletter
              </h4>
              <form className="flex flex-col  gap-2 max-w-sm mx-auto sm:mx-0">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-sm sm:text-base focus:outline-none focus:border-txt-secondary2 transition-colors"
                />
                <button
                  type="submit"
                  className="px-4 sm:px-6 py-2 sm:py-2.5 bg-txt-secondary2 hover:bg-txt-secondary2/90 rounded-lg font-semibold text-sm sm:text-base transition-all hover:shadow-lg whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
              © {new Date().getFullYear()} NeoTech. All rights reserved.
            </p>
            <p className="text-xs sm:text-sm text-gray-400 text-center">
              Crafted with ❤️ by{" "}
              <a
                href="https://www.linkedin.com/in/anas-wael/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-txt-secondary2 hover:text-txt-secondary2/80 transition-colors font-semibold underline"
              >
                Anas Wael
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-txt-secondary2 hover:bg-txt-secondary2/90 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all opacity-0 hover:opacity-100 focus:opacity-100 z-50 group"
        aria-label="Scroll to top"
      >
        <ArrowRight
          size={20}
          className="rotate-[-90deg] group-hover:translate-y-[-2px] transition-transform"
        />
      </button>
    </footer>
  );
};

export default Footer;
