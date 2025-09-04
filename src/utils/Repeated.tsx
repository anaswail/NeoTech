import Banner1 from "../assets/banner1.png";
import Banner2 from "../assets/banner2.png";
import Banner3 from "../assets/banner3.png";
import Banner4 from "../assets/banner4.png";
import Banner5 from "../assets/banner5.png";
import Banner6 from "../assets/banner6.png";

import product1 from "../assets/product1.png";
import product2 from "../assets/product2.png";
import product3 from "../assets/product3.png";
import product4 from "../assets/product4.png";
import product5 from "../assets/product5.png";
import product6 from "../assets/product6.png";

import { Facebook, LinkedinIcon, Mail, MessageSquareMore } from "lucide-react";

export const categories = [
  {
    index: 1,
    name: "phones",
  },
  {
    index: 2,
    name: "computers",
  },
  {
    index: 3,
    name: "headphones",
  },
  {
    index: 4,
    name: "camera",
  },
  {
    index: 5,
    name: "gaming",
  },
  {
    index: 6,
    name: "smartwatches",
  },
];

export const banners = [
  {
    image: Banner1,
    alt: "Banner 1",
  },
  {
    image: Banner2,
    alt: "Banner 2",
  },
  {
    image: Banner3,
    alt: "Banner 3",
  },
  {
    image: Banner4,
    alt: "Banner 4",
  },
  {
    image: Banner5,
    alt: "Banner 5",
  },
  {
    image: Banner6,
    alt: "Banner 6",
  },
];

export const socialLinks = [
  {
    name: "FaceBook",
    icon: <Facebook />,
    url: "https://www.facebook.com/profile.php?id=100053090326397",
  },
  {
    name: "LinkedIn",
    icon: <LinkedinIcon />,
    url: "https://www.linkedin.com/in/anas-wael/",
  },
  {
    name: "Whatsapp",
    icon: <MessageSquareMore />,
    url: "https://wa.me/+201050305754",
  },
  {
    name: "Email",
    icon: <Mail />,
    url: "mailto:anaswail246@gmail.com",
  },
];

export const products = [
  {
    img: product1,
    title: "ASUS FHD Gaming Laptop",
    price: 600,
    discount: 700,
    percent: 20,
  },
  {
    img: product2,
    title: "CANON EOS DSLR Camera",
    price: 360,
    discount: 400,
    percent: 10,
  },
  {
    img: product3,
    title: "IPS LCD Gaming Monitor",
    price: 370,
    discount: 400,
    percent: 10,
  },
  {
    img: product4,
    title: "HAVIT HV-G92 Gamepad",
    price: 120,
    discount: 160,
    percent: 25,
  },
  {
    img: product5,
    title: "Havic HV G-92 Gamepad",
    price: 192,
    discount: 240,
    percent: 20,
  },
  {
    img: product6,
    title: "AK-900 Wired Keyboard",
    price: 960,
    discount: 1160,
    percent: 35,
  },
  {
    img: product5,
    title: "Havic HV G-92 Gamepad",
    price: 192,
    discount: 240,
    percent: 20,
  },
  {
    img: product6,
    title: "AK-900 Wired Keyboard",
    price: 960,
    discount: 1160,
    percent: 35,
  },
];
