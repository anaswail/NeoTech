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
} from "lucide-react";
import { categories, userToken } from "@/utils/Repeated";
import { useState } from "react";
import profileImg from "../assets/profile.png";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Reset categories state when closing menu
    if (menuOpen) {
      setCategoriesOpen(false);
    }
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setCategoriesOpen(false);
  };

  const profile = useSelector((state: RootState) => state?.profile.data);

  return (
    <>
      <div className="border-b-[#b3b3b3] z-50 border-b-2 fixed w-full top-0 block left-0 bg-white">
        <div className="navbar flex-schema container mx-auto p-7">
          <div className="logo">
            <h1 className="text-txt-black text-heading font-bold mr-2">
              <Link to="/">
                Neo
                <span className="text-txt-secondary2">Tech</span>
              </Link>
            </h1>
          </div>

          {/* Desktop Navigation */}
          <ul className="navLinks md:flex justify-between items-center w-[460px] text-regular hidden">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="relative cat group">
              <h1 className="cursor-pointer p-3">Categories</h1>
              <div className="absolute hidden group-hover:block bg-white border shadow-lg w-64 p-3">
                {categories.map((category, index) => (
                  <Link key={index} to={`/category/${category.name}`}>
                    <p
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      key={index}
                    >
                      {category.name}
                    </p>
                  </Link>
                ))}
              </div>
            </li>
            <li>
              <Link to="/aboutUs">About Us</Link>
            </li>
            <li>
              <Link to="/contactUs">Contact Us</Link>
            </li>
          </ul>

          {/* Desktop Icons */}
          <div className="other md:flex justify-center items-center gap-8 hidden">
            <div className="relative w-60 ml-2 max-lg:hidden">
              <Input
                placeholder="What are you looking for?"
                className="p-5 bg-txt-secondary "
              />
              <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
            </div>
            {userToken ? (
              <>
                <Link to="/wishlist">
                  <HeartIcon className="hover:fill-red-700 hover:text-red-700 transition-all" />
                </Link>
                <Link to="/cart">
                  <ShoppingCart className="hover:fill-black transition-all" />
                </Link>
                <Link to="/profile">
                  <div className="h-8 w-8 bg-txt-white rounded-full overflow-hidden  ">
                    <img
                      src={profile?.avatar?.secure_url || profileImg}
                      alt={profile?.name}
                      className="w-full"
                    />
                  </div>
                </Link>
              </>
            ) : (
              <div className="flex max-lg:ml-5">
                <Link to="signup">
                  <Button className="rounded-sm mr-5 w-25 py-5 max-lg:w-20 max-lg:text-sm">
                    Sign Up
                  </Button>
                </Link>
                <Link to="login">
                  <Button className="rounded-sm bg-black hover:bg-black/80 w-25 py-5 max-lg:w-20 max-lg:text-sm">
                    Login
                    <LogInIcon />
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Icons */}
          <div className="flex items-center gap-4 md:hidden">
            {userToken && (
              <>
                <Link to="/wishlist">
                  <HeartIcon className="hover:fill-red-700 hover:text-red-700 transition-all" />
                </Link>
                <Link to="/cart">
                  <ShoppingCart className="hover:fill-black transition-all" />
                </Link>
                <Link to="/profile">
                  <div className="h-8 w-8 bg-txt-white rounded-full overflow-hidden  ">
                    <img
                      src={profile?.avatar?.secure_url || profileImg}
                      alt={profile?.name}
                      className="w-full"
                    />
                  </div>
                </Link>
              </>
            )}
            <button
              onClick={toggleMenu}
              className="cursor-pointer"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>

          {/* Desktop Store Icon */}
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={closeMobileMenu}
          ></div>

          {/* Menu Content */}
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            {/* Header */}
            <div className="border-b border-gray-200 p-7 flex justify-between items-center">
              <h1 className="text-txt-black text-heading font-bold">
                <Link to="/" onClick={closeMobileMenu}>
                  NeoTech
                </Link>
              </h1>
              <button
                onClick={toggleMenu}
                className="cursor-pointer"
                aria-label="Close menu"
              >
                <X size={30} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-7 border-b border-gray-200">
              <div className="relative">
                <Input
                  placeholder="What are you looking for?"
                  className="p-5 bg-txt-secondary w-full placeholder:truncate placeholder:w-3/4"
                />
                <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex flex-col">
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="px-7 py-6 text-regular border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                Home
              </Link>

              {/* Categories with Accordion */}
              <div className="border-b border-gray-100">
                <button
                  onClick={() => setCategoriesOpen(!categoriesOpen)}
                  className="w-full px-7 py-6 text-regular flex justify-between items-center hover:bg-gray-50 transition-colors text-left"
                >
                  Categories
                  <ChevronDown
                    className={`transition-transform ${
                      categoriesOpen ? "rotate-180" : ""
                    }`}
                    size={20}
                  />
                </button>

                {categoriesOpen && (
                  <div className="bg-gray-50">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        to={`/category/${category.name}`}
                        onClick={closeMobileMenu}
                        className="block px-10 py-4 text-sm hover:bg-gray-100 transition-colors border-b border-gray-200 last:border-b-0"
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
                className="px-7 py-6 text-regular border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                About Us
              </Link>

              <Link
                to="/contactUs"
                onClick={closeMobileMenu}
                className="px-7 py-6 text-regular border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>

            {/* Bottom Section */}
            <div className="p-7 mt-auto">
              <div className="flex items-center justify-center gap-8 pt-6 border-t border-gray-200">
                {userToken ? (
                  <>
                    <Link to="/wishlist">
                      <HeartIcon className="hover:fill-red-700 hover:text-red-700 transition-all" />
                    </Link>
                    <Link to="/cart">
                      <ShoppingCart className="hover:fill-black transition-all" />
                    </Link>
                    <Link to="/profile">
                      <div className="h-8 w-8 bg-txt-white rounded-full overflow-hidden  ">
                        <img
                          src={profile?.avatar?.secure_url || profileImg}
                          alt={profile?.name}
                          className="w-full"
                        />
                      </div>
                    </Link>
                  </>
                ) : (
                  <div className="flex">
                    <Link to="signup">
                      <Button className="rounded-sm mr-5 w-25 py-5">
                        Sign Up
                      </Button>
                    </Link>
                    <Link to="login">
                      <Button className="rounded-sm bg-black hover:bg-black/80 w-25 py-5">
                        Login
                        <LogInIcon />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
