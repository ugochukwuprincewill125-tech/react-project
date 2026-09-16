import KeyboardImg from "../assets/product/keyboard.webp";
import powerBank from "../assets/product/powerbank.png";
import RouterImg from "../assets/product/router.png";
import HeadsetImg from "../assets/product/headset.png";
import flashDriveImg from "../assets/product/flash.png";
import gamepadImg from "../assets/hero/game.png";
import MemoryCardImg from "../assets/product/memorycard.png";

// Placeholder product catalog.
// This file stands in for a future products API. Nothing here is a real
// Timeline product, price, or stock claim — swap in the real catalog before
// launch. Structure matches the shape the rest of the app expects.
//
// image / images intentionally left empty: ProductCard renders a
// placeholder tile until real product photography is added.

const products = [
  {
    id: "p-001",
    name: "Wireless Mechanical Keyboard",
    category: "Computer Accessories",
    brand: "",
    price: 45000,
    oldPrice: null,
    image: KeyboardImg,
    images: [KeyboardImg],
    description: "Placeholder listing — replace with real product copy.",
    specifications: {},
    stock: "in-stock",
    featured: true,
    deal: false,
  },
  {
    id: "p-002",
    name: "Fast-Charge Power Bank 20,000mAh",
    category: "Power & Charging",
    brand: "",
    price: 18500,
    oldPrice: 22000,
    image: powerBank,
    images: [powerBank],
    description: "Placeholder listing — replace with real product copy.",
    specifications: {},
    stock: "in-stock",
    featured: true,
    deal: true,
  },
  {
    id: "p-003",
    name: "Dual-Band Wi-Fi Router",
    category: "Networking",
    brand: "",
    price: 32000,
    oldPrice: null,
    image: RouterImg,
    images: [RouterImg],
    description: "Placeholder listing — replace with real product copy.",
    specifications: {},
    stock: "in-stock",
    featured: true,
    deal: false,
  },
  {
    id: "p-004",
    name: "Bluetooth Over-Ear Headset",
    category: "Audio & Bluetooth",
    brand: "",
    price: 27500,
    oldPrice: 31000,
    image: HeadsetImg,
    images: [HeadsetImg],
    description: "Placeholder listing — replace with real product copy.",
    specifications: {},
    stock: "low-stock",
    featured: true,
    deal: true,
  },
  {
    id: "p-005",
    name: "128GB USB 3.0 Flash Drive",
    category: "Storage Devices",
    brand: "",
    price: 8500,
    oldPrice: null,
    image: flashDriveImg,
    images: [flashDriveImg],
    description: "Placeholder listing — replace with real product copy.",
    specifications: {},
    stock: "in-stock",
    featured: true,
    deal: false,
  },
  {
    id: "p-006",
    name: "PlayStation 4 Wireless Gamepad",
    category: "Gaming",
    brand: "",
    price: 24000,
    oldPrice: null,
    image: gamepadImg,
    images: [gamepadImg],
    description: "Placeholder listing — replace with real product copy.",
    specifications: {},
    stock: "in-stock",
    featured: true,
    deal: false,
  },
  {
    id: "p-007",
    name: "Original Memory Card 256GB",
    category: "Camera Accessories",
    brand: "",
    price: 21000,
    oldPrice: 24500,
    image: MemoryCardImg,
    images: [MemoryCardImg],
    description: "Placeholder listing — replace with real product copy.",
    specifications: {},
    stock: "in-stock",
    featured: true,
    deal: true,
  },
  {
    id: "p-008",
    name: "Tempered-Glass iPad Case",
    category: "Home & Office Technology",
    brand: "",
    price: 12500,
    oldPrice: null,
    image: "",
    images: [],
    description: "Placeholder listing — replace with real product copy.",
    specifications: {},
    stock: "out-of-stock",
    featured: false,
    deal: false,
  },
];

export default products;
