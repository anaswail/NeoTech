import { Link } from "react-router";
import { Input } from "./ui/input";
import {
  HeartIcon,
  SearchIcon,
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  LogInIcon,
  User,
} from "lucide-react";
import { userToken } from "@/utils/Repeated";
import { useEffect, useState } from "react";
import profileImg from "../assets/profile.png";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { actGetCategoryBySlug } from "@/store/slices/products/act/actGetCategoryBySlug";
import { actGetHomeData } from "@/store/slices/products/act/actGetHomeData";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (menuOpen) {
      setCategoriesOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [menuOpen]);

  const profile = useSelector((state: RootState) => state?.profile.data);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const homeData = useSelector((state: RootState) => state.home);
  const dispatch = useDispatch<AppDispatch>();
  const categories = homeData.data?.categories;

  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(actGetHomeData());
    }
  }, [dispatch, categories]);

  const handleActCategory = (slug: string) => {
    dispatch(actGetCategoryBySlug({ slug }));
    closeMobileMenu();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`border-b-2 z-50 fixed w-full top-0 left-0 bg-white transition-all duration-300 ${
          scrolled ? "border-b-gray-300 shadow-md" : "border-b-[#b3b3b3]"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20 lg:h-24">
            {/* Logo */}
            <div className="logo flex-shrink-0">
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <h1 className="text-txt-black text-xl sm:text-2xl lg:text-heading font-bold">
                  Neo
                  <span className="text-txt-secondary2">Tech</span>
                </h1>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10">
              <Link
                to="/"
                className="text-sm xl:text-regular font-medium hover:text-txt-secondary2 transition-colors"
              >
                Home
              </Link>

              {/* Categories Dropdown */}
              <div className="relative group">
                <button className="text-sm xl:text-regular font-medium hover:text-txt-secondary2 transition-colors flex items-center gap-1 py-6">
                  Categories
                  <ChevronDown
                    size={16}
                    className="group-hover:rotate-180 transition-transform"
                  />
                </button>
                <div className="absolute top-full left-0 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 pt-2">
                  <div className="bg-white border border-gray-200 shadow-lg rounded-lg w-56 max-h-96 overflow-y-auto">
                    {categories?.map((category) => (
                      <Link
                        key={category._id}
                        to={`/category/${category.slug}`}
                        onClick={() => handleActCategory(category.slug)}
                        className="block px-4 py-3 text-sm hover:bg-gray-50 hover:text-txt-secondary2 transition-colors border-b border-gray-100 last:border-b-0"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                to="/aboutUs"
                className="text-sm xl:text-regular font-medium hover:text-txt-secondary2 transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contactUs"
                className="text-sm xl:text-regular font-medium hover:text-txt-secondary2 transition-colors"
              >
                Contact Us
              </Link>
            </nav>

            {/* Desktop Search & Icons */}
            <div className="hidden md:flex items-center gap-3 lg:gap-4 xl:gap-6">
              {/* Search Bar */}
              <div className="relative hidden xl:block">
                <Input
                  placeholder="Search products..."
                  className="w-56 xl:w-64 h-10 pl-4 pr-10 bg-txt-secondary border-0 focus-visible:ring-2 focus-visible:ring-txt-secondary2"
                />
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>

              {/* Search Icon for Tablet */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="xl:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <SearchIcon size={20} className="text-gray-700" />
              </button>

              {userToken ? (
                <>
                  {/* Wishlist */}
                  <Link
                    to="/wishlist"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                    aria-label="Wishlist"
                  >
                    <HeartIcon
                      size={20}
                      className="hover:fill-red-500 hover:text-red-500 transition-all"
                    />
                  </Link>

                  {/* Cart with Badge */}
                  <Link
                    to="/cart"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                    aria-label="Cart"
                  >
                    <ShoppingCart
                      size={20}
                      className="hover:fill-black transition-all"
                    />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-txt-secondary2 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>

                  {/* Profile */}
                  <Link
                    to="/profile"
                    className="flex-shrink-0"
                    aria-label="Profile"
                  >
                    <div className="h-9 w-9 bg-gray-200 rounded-full overflow-hidden border-2 border-transparent hover:border-txt-secondary2 transition-all">
                      <img
                        src={profile?.avatar?.secure_url || profileImg}
                        alt={profile?.name || "Profile"}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </Link>
                </>
              ) : (
                <div className="flex items-center gap-2 lg:gap-3">
                  <Link to="/signup">
                    <Button className="rounded-md px-4 lg:px-5 h-9 lg:h-10 text-xs lg:text-sm font-semibold">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="rounded-md bg-black hover:bg-black/80 px-4 lg:px-5 h-9 lg:h-10 text-xs lg:text-sm font-semibold flex items-center gap-1.5">
                      <span>Login</span>
                      <LogInIcon size={14} />
                    </Button>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Icons */}
            <div className="flex md:hidden items-center gap-2 sm:gap-3">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Search"
              >
                <SearchIcon size={20} className="text-gray-700" />
              </button>

              {userToken && (
                <>
                  <Link
                    to="/wishlist"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Wishlist"
                  >
                    <HeartIcon
                      size={20}
                      className="hover:fill-red-500 hover:text-red-500 transition-all"
                    />
                  </Link>
                  <Link
                    to="/cart"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                    aria-label="Cart"
                  >
                    <ShoppingCart
                      size={20}
                      className="hover:fill-black transition-all"
                    />
                    {cartItems.length > 0 && (
                      <span className="absolute top-0 right-0 bg-txt-secondary2 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                        {cartItems.length}
                      </span>
                    )}
                  </Link>
                </>
              )}

              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Toggle menu"
              >
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="md:hidden pb-4 animate-in slide-in-from-top duration-200">
              <div className="relative">
                <Input
                  placeholder="Search products..."
                  className="w-full h-10 pl-4 pr-10 bg-txt-secondary border-0 focus-visible:ring-2 focus-visible:ring-txt-secondary2"
                  autoFocus
                />
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={closeMobileMenu}
          />

          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-full sm:w-80 bg-white shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300">
            {/* Menu Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex justify-between items-center z-10">
              <Link to="/" onClick={closeMobileMenu}>
                <h1 className="text-txt-black text-xl sm:text-2xl font-bold">
                  Neo<span className="text-txt-secondary2">Tech</span>
                </h1>
              </Link>
              <button
                onClick={toggleMenu}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col py-2">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="px-4 sm:px-6 py-4 text-base font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-txt-secondary2 transition-colors active:bg-gray-100"
              >
                Home
              </Link>

              {/* Categories Accordion */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="w-full px-4 sm:px-6 py-4 text-base font-medium flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
                >
                  <span>Categories</span>
                  <ChevronDown
                    className={`transition-transform duration-200 ${
                      categoriesOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>

                {categoriesOpen && (
                  <div className="bg-gray-50 animate-in slide-in-from-top duration-200">
                    {categories?.map((category) => (
                      <Link
                        key={category._id}
                        to={`/category/${category.slug}`}
                        onClick={() => handleActCategory(category.slug)}
                        className="block px-8 sm:px-10 py-3 text-sm hover:bg-gray-100 hover:text-txt-secondary2 transition-colors border-b border-gray-200 last:border-b-0 active:bg-gray-200"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                to="/aboutUs"
                onClick={closeMobileMenu}
                className="px-4 sm:px-6 py-4 text-base font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-txt-secondary2 transition-colors active:bg-gray-100"
              >
                About Us
              </Link>

              <Link
                to="/contactUs"
                onClick={closeMobileMenu}
                className="px-4 sm:px-6 py-4 text-base font-medium border-b border-gray-100 hover:bg-gray-50 hover:text-txt-secondary2 transition-colors active:bg-gray-100"
              >
                Contact Us
              </Link>
            </nav>

            {/* Bottom Section */}
            <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 sm:px-6 py-6 mt-auto">
              {userToken ? (
                <Link
                  to="/profile"
                  onClick={closeMobileMenu}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="h-12 w-12 bg-gray-200 rounded-full overflow-hidden flex-shrink-0">
                    <img
                      src={profile?.avatar?.secure_url || profileImg}
                      alt={profile?.name || "Profile"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">
                      {profile?.name || "My Account"}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      View Profile
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="space-y-3">
                  <Link
                    to="/signup"
                    onClick={closeMobileMenu}
                    className="block"
                  >
                    <Button className="w-full rounded-md h-11 text-sm font-semibold">
                      Sign Up
                    </Button>
                  </Link>
                  <Link to="/login" onClick={closeMobileMenu} className="block">
                    <Button className="w-full rounded-md bg-black hover:bg-black/80 h-11 text-sm font-semibold flex items-center justify-center gap-2">
                      <span>Login</span>
                      <LogInIcon size={16} />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
