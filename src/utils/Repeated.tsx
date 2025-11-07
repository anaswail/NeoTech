import type { CategoryLevels } from "@/types";
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
    name: "smartphones",
  },
  {
    index: 2,
    name: "laptops",
  },
  {
    index: 3,
    name: "headphones",
  },
  {
    index: 4,
    name: "cameras",
  },
  {
    index: 5,
    name: "games",
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

export const userToken = localStorage.getItem("token");
export const user = JSON.parse(localStorage.getItem("user") || "null");
export const productId = localStorage.getItem("productId");

export const categoriesLevels: CategoryLevels[] = [
  {
    id: "68e9e3937c46bc54194b4d73",
    name: "Phones",
    description: "Smartphones, tablets, feature phones and mobile accessories",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82bfe",
        name: "Smartphones",
        description: "Latest smartphones from all brands",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c33",
            name: "iPhone",
            description: "Apple iPhone models and variants",
          },
          {
            id: "68e9eca75718622ab9d82c34",
            name: "Samsung Galaxy",
            description: "Samsung Galaxy smartphones",
          },
          {
            id: "68e9eca75718622ab9d82c35",
            name: "Google Pixel",
            description: "Google Pixel phones",
          },
          {
            id: "68e9eca75718622ab9d82c36",
            name: "Other Android Phones",
            description: "Xiaomi, OnePlus, and other Android brands",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82bff",
        name: "Tablets",
        description: "iPads, Android tablets and Windows tablets",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c37",
            name: "iPad",
            description: "Apple iPad tablets",
          },
          {
            id: "68e9eca75718622ab9d82c38",
            name: "Android Tablets",
            description: "Samsung, Lenovo, and other Android tablets",
          },
          {
            id: "68e9eca75718622ab9d82c39",
            name: "Windows Tablets",
            description: "Microsoft Surface and Windows tablets",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c00",
        name: "Feature Phones",
        description: "Basic phones and feature phones",
      },
      {
        id: "68e9e65b5718622ab9d82c02",
        name: "Phone Accessories",
        description: "Cases, screen protectors, and phone gadgets",
      },
      {
        id: "68e9e65b5718622ab9d82c01",
        name: "Power Banks",
        description: "Portable chargers and power banks",
      },
    ],
  },
  {
    id: "68e9e3937c46bc54194b4d76",
    name: "Cameras",
    description: "Digital cameras, lenses and photography equipment",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82c19",
        name: "DSLR Cameras",
        description: "Digital SLR cameras and lenses",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c54",
            name: "Canon DSLR",
            description: "Canon DSLR cameras and lenses",
          },
          {
            id: "68e9eca75718622ab9d82c55",
            name: "Nikon DSLR",
            description: "Nikon DSLR cameras and equipment",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c1a",
        name: "Mirrorless Cameras",
        description: "Mirrorless camera systems",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c56",
            name: "Sony Mirrorless",
            description: "Sony Alpha mirrorless cameras",
          },
          {
            id: "68e9eca75718622ab9d82c57",
            name: "Fujifilm Mirrorless",
            description: "Fujifilm X-series mirrorless cameras",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c1b",
        name: "Action Cameras",
        description: "Action cameras and sports cameras",
      },
      {
        id: "68e9e65b5718622ab9d82c1c",
        name: "Camera Lenses",
        description: "Camera lenses and optics",
      },
      {
        id: "68e9e65b5718622ab9d82c1d",
        name: "Tripods & Accessories",
        description: "Camera tripods and photography accessories",
      },
    ],
  },
  {
    id: "68e9e3937c46bc54194b4d74",
    name: "Computers",
    description: "Laptops, desktops, monitors and computer accessories",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82c03",
        name: "Laptops",
        description: "All types of laptops for work and gaming",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c40",
            name: "MacBook Pro",
            description: "Apple MacBook Pro laptops",
          },
          {
            id: "68e9eca75718622ab9d82c41",
            name: "Dell XPS",
            description: "Dell XPS business laptops",
          },
          {
            id: "68e9eca75718622ab9d82c42",
            name: "Lenovo ThinkPad",
            description: "Lenovo ThinkPad business laptops",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c04",
        name: "Desktops",
        description: "Desktop computers and all-in-one PCs",
      },
      {
        id: "68e9e65b5718622ab9d82c05",
        name: "Computer Monitors",
        description: "Computer displays and screens",
      },
      {
        id: "68e9e65b5718622ab9d82c06",
        name: "Computer Components",
        description: "Processors, graphics cards, RAM and motherboards",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c43",
            name: "Intel Core",
            description: "Intel Core i3/i5/i7/i9 processors",
          },
          {
            id: "68e9eca75718622ab9d82c44",
            name: "AMD Ryzen",
            description: "AMD Ryzen 3/5/7/9 processors",
          },
          {
            id: "68e9eca75718622ab9d82c46",
            name: "NVIDIA RTX 40 Series",
            description: "Latest NVIDIA RTX 40 series graphics cards",
          },
          {
            id: "68e9eca75718622ab9d82c47",
            name: "AMD Radeon RX",
            description: "AMD Radeon RX graphics cards",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c07",
        name: "Keyboards & Mice",
        description: "Keyboards, mice and input devices",
      },
      {
        id: "68e9e65b5718622ab9d82c08",
        name: "Laptop Accessories",
        description: "Laptop bags, cooling pads and accessories",
      },
    ],
  },
  {
    id: "68e9e3937c46bc54194b4d75",
    name: "Wearables Technology",
    description: "Smartwatches, fitness trackers and tech accessories",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82c23",
        name: "Smartwatches",
        description: "Smartwatches and smart timepieces",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c3a",
            name: "Apple Watch",
            description: "Apple Watch series and models",
          },
          {
            id: "68e9eca75718622ab9d82c3b",
            name: "Samsung Galaxy Watch",
            description: "Samsung smartwatches",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c24",
        name: "Fitness Bands",
        description: "Fitness trackers and activity bands",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c3c",
            name: "Fitness Trackers",
            description: "Fitbit, Garmin, and activity trackers",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c25",
        name: "VR Headsets",
        description: "Virtual reality headsets and gear",
      },
      {
        id: "68e9e65b5718622ab9d82c26",
        name: "Chargers & Cables",
        description: "Chargers, cables and power accessories",
      },
    ],
  },
  {
    id: "68e9e3937c46bc54194b4d7b",
    name: "Networking & Storage",
    description: "Networking equipment and data storage solutions",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82c27",
        name: "Wi-Fi Routers",
        description: "Wireless routers and networking gear",
      },
      {
        id: "68e9e65b5718622ab9d82c28",
        name: "Network Switches",
        description: "Network switches and hubs",
      },
      {
        id: "68e9e65b5718622ab9d82c29",
        name: "External Hard Drives",
        description: "External storage and hard drives",
      },
      {
        id: "68e9e65b5718622ab9d82c2a",
        name: "Flash Drives",
        description: "USB flash drives and memory sticks",
      },
      {
        id: "68e9e65b5718622ab9d82c2b",
        name: "NAS Systems",
        description: "Network attached storage systems",
      },
    ],
  },
  {
    id: "68e9e3937c46bc54194b4d77",
    name: "Audio Devices",
    description: "Headphones, speakers and audio equipment",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82c14",
        name: "Headphones",
        description: "Over-ear and on-ear headphones",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c52",
            name: "Noise Cancelling",
            description: "Noise cancelling wireless headphones",
          },
          {
            id: "68e9eca75718622ab9d82c53",
            name: "Sports Headphones",
            description: "Wireless headphones for sports and fitness",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c15",
        name: "Earbuds",
        description: "In-ear headphones and wireless earbuds",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c51",
            name: "AirPods",
            description: "Apple AirPods and wireless earbuds",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c16",
        name: "Bluetooth Speakers",
        description: "Portable Bluetooth speakers",
      },
      {
        id: "68e9e65b5718622ab9d82c17",
        name: "Home Audio Systems",
        description: "Home theater and audio systems",
      },
      {
        id: "68e9e65b5718622ab9d82c18",
        name: "Studio Equipment",
        description: "Professional audio and studio gear",
      },
    ],
  },
  {
    id: "68e9e3937c46bc54194b4d78",
    name: "Gaming",
    description: "Gaming consoles, accessories and gaming equipment",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82c09",
        name: "Gaming Laptops",
        description: "High-performance laptops for gaming",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c3d",
            name: "ASUS ROG",
            description: "ASUS Republic of Gamers laptops",
          },
          {
            id: "68e9eca75718622ab9d82c3e",
            name: "Alienware",
            description: "Dell Alienware gaming laptops",
          },
          {
            id: "68e9eca75718622ab9d82c3f",
            name: "MSI Gaming",
            description: "MSI gaming laptops and notebooks",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c0a",
        name: "PlayStation",
        description: "PS5, PS4 consoles and accessories",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c4c",
            name: "PS5 Consoles",
            description: "PlayStation 5 consoles and bundles",
          },
          {
            id: "68e9eca75718622ab9d82c4d",
            name: "PS5 Accessories",
            description: "PS5 controllers, headsets, and gear",
          },
          {
            id: "68e9eca75718622ab9d82c4e",
            name: "PS5 Games",
            description: "PlayStation 5 game titles",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c0b",
        name: "Xbox",
        description: "Xbox Series X|S consoles and games",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c4f",
            name: "Xbox Series X",
            description: "Xbox Series X consoles",
          },
          {
            id: "68e9eca75718622ab9d82c50",
            name: "Xbox Series S",
            description: "Xbox Series S consoles",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c0c",
        name: "Nintendo",
        description: "Nintendo Switch and gaming products",
      },
      {
        id: "68e9e65b5718622ab9d82c0d",
        name: "Gaming Controllers",
        description: "Game controllers and input devices",
      },
      {
        id: "68e9e65b5718622ab9d82c0e",
        name: "Gaming Chairs",
        description: "Gaming chairs and ergonomic seating",
      },
    ],
  },
  {
    id: "68e9e3937c46bc54194b4d7a",
    name: "Home Theater",
    description: "Smart TVs, home theater systems and audio equipment",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82c0f",
        name: "Smart TVs",
        description: "Smart TVs with streaming capabilities",
        subCategories: [
          {
            id: "68e9eca75718622ab9d82c49",
            name: "Samsung TVs",
            description: "Samsung Smart TVs and displays",
          },
          {
            id: "68e9eca75718622ab9d82c4a",
            name: "LG TVs",
            description: "LG OLED and Smart TVs",
          },
          {
            id: "68e9eca75718622ab9d82c4b",
            name: "Sony TVs",
            description: "Sony Bravia and Smart TVs",
          },
        ],
      },
      {
        id: "68e9e65b5718622ab9d82c10",
        name: "LED TVs",
        description: "LED television displays",
      },
      {
        id: "68e9e65b5718622ab9d82c11",
        name: "Projectors",
        description: "Home theater and multimedia projectors",
      },
      {
        id: "68e9e65b5718622ab9d82c12",
        name: "TV Accessories",
        description: "TV mounts, cables and accessories",
      },
      {
        id: "68e9e65b5718622ab9d82c13",
        name: "Soundbars",
        description: "Soundbars and home audio systems",
      },
    ],
  },
  {
    id: "68e9e3937c46bc54194b4d79",
    name: "Smart Home & IoT",
    description: "Smart home devices and Internet of Things products",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82c1e",
        name: "Smart Lights",
        description: "Smart lighting and bulbs",
      },
      {
        id: "68e9e65b5718622ab9d82c1f",
        name: "Smart Plugs",
        description: "Smart plugs and switches",
      },
      {
        id: "68e9e65b5718622ab9d82c20",
        name: "Smart Security Cameras",
        description: "Home security cameras and systems",
      },
      {
        id: "68e9e65b5718622ab9d82c21",
        name: "Smart Thermostats",
        description: "Smart thermostats and climate control",
      },
      {
        id: "68e9e65b5718622ab9d82c22",
        name: "Smart Hubs",
        description: "Smart home hubs and controllers",
      },
    ],
  },
  {
    id: "68e9e3937c46bc54194b4d7c",
    name: "Office Electronics",
    description: "Office equipment and business electronics",
    subCategories: [
      {
        id: "68e9e65b5718622ab9d82c2c",
        name: "Printers & Scanners",
        description: "Printers, scanners and multifunction devices",
      },
      {
        id: "68e9e65b5718622ab9d82c2e",
        name: "Office Phones",
        description: "Business phones and communication systems",
      },
      {
        id: "68e9e65b5718622ab9d82c2f",
        name: "Shredders",
        description: "Paper shredders and document destruction",
      },
      {
        id: "68e9e65b5718622ab9d82c30",
        name: "UPS & Power Solutions",
        description: "UPS systems and power backup",
      },
    ],
  },
];
