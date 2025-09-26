import { Link } from "react-router";
import DevelopedWithAnas from "../assets/developedWithAnas.webp";
import { socialLinks } from "@/utils/Repeated";

const footerLinks = [
  {
    title: "About Us",
    url: "/aboutUs",
  },
  {
    title: "Contact Us",
    url: "/contactUs",
  },
  {
    title: "Phones",
    url: "/category/phones",
  },
  {
    title: "Computers",
    url: "/category/computers",
  },
  {
    title: "HeadPhones",
    url: "/category/headphones",
  },
  {
    title: "Camera",
    url: "/category/camera",
  },
  {
    title: "Gaming",
    url: "/category/gaming",
  },
  {
    title: "SmartWatches",
    url: "/category/smartwatches",
  },
];

const Footer = () => {
  return (
    <div className="footer bg-black flex flex-col justify-center items-center w-full">
      {/* Main Footer Content */}
      <div className="w-full container mx-auto text-txt-white p-4 sm:p-6 lg:p-12">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8 lg:gap-12 xl:gap-36">
          {/* Logo and Developer Section */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* <h1 className="text-2xl sm:text-3xl font-bold mb-4">NeoTech</h1> */}
            <img
              className="w-40 sm:w-48 md:w-60 rounded-md"
              src={DevelopedWithAnas}
              alt="Developed With Anas "
            />
          </div>

          {/* Social Links Section */}
          <div className="myLinks flex flex-col gap-4 sm:gap-5 text-center lg:text-left">
            <h1 className="text-lg sm:text-xl lg:text-heading font-bold mb-2">
              Our Links
            </h1>
            <div className="flex flex-col gap-3 sm:gap-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  className="flex justify-center lg:justify-between items-center w-full sm:w-56 mx-auto lg:mx-0 hover:text-txt-secondary2 transition-all text-sm sm:text-regular"
                >
                  <span>{link.name}</span>
                  <span className="ml-2 lg:ml-0">{link.icon}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Web Links Section */}
          <div className="footer-links text-center lg:text-left">
            <h1 className="text-lg sm:text-xl lg:text-heading font-bold mb-4 lg:mb-6">
              Web Links
            </h1>

            {/* Mobile and Tablet Layout */}
            <div className="lg:hidden">
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 max-w-sm mx-auto">
                {footerLinks.map((link, index) => (
                  <li
                    key={index}
                    className="list-none hover:text-txt-secondary2 transition-all text-sm sm:text-base"
                  >
                    <Link to={link.url}>{link.title}</Link>
                  </li>
                ))}
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:flex lg:justify-center lg:gap-10">
              <div className="left">
                {footerLinks.slice(0, 4).map((link, index) => (
                  <li
                    key={index}
                    className="list-none my-4 hover:text-txt-secondary2 transition-all"
                  >
                    <Link to={link.url}>{link.title}</Link>
                  </li>
                ))}
              </div>

              <div className="right">
                {footerLinks.slice(4, 8).map((link, index) => (
                  <li
                    key={index}
                    className="list-none my-4 hover:text-txt-secondary2 transition-all"
                  >
                    <Link to={link.url}>{link.title}</Link>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="flex justify-center items-center text-sm sm:text-regular text-txt-secondary border-t-2 border-gray-800 w-full p-4 sm:p-5">
        <p className="text-center">
          Developed by{" "}
          <a
            href="https://www.linkedin.com/in/anas-wael/"
            className="hover:text-txt-secondary2 transition-colors underline"
          >
            Anas
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
