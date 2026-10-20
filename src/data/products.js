import allProductsData from './allProducts.json';

export const ALL_PRODUCTS = allProductsData;

export const PRIMARY_PRODUCT = {
  id: "ring-lennon",
  name: "Lennon Three Stone Ring",
  sku: "HYLR015",
  rating: 5.0,
  reviewsCount: 42,
  priceUSD: 940,
  pricesByPurity: {
    "925 Silver": 225,
    "9K": 575,
    "14K": 770,
    "18K": 940
  },
  metals: ["925 Silver", "9K", "14K", "18K"],
  colors: [
    { id: "yellow", name: "Yellow Gold", hex: "#F2C94C", imageIndex: 0 },
    { id: "white", name: "White Gold", hex: "#C4C4C4", imageIndex: 1 },
    { id: "rose", name: "Rose Gold", hex: "#E08E88", imageIndex: 2 }
  ],
  images: [
    { src: "/assets/products/tct-three-stone-yellow.jpg", alt: "The Carat Theory Lennon Three Stone Ring 18K Yellow Gold", isVideo: false },
    { src: "/assets/products/tct-three-stone-white.jpg", alt: "The Carat Theory Lennon Three Stone Ring 18K White Gold", isVideo: false },
    { src: "/assets/products/tct-three-stone-rose.jpg", alt: "The Carat Theory Lennon Three Stone Ring 18K Rose Gold", isVideo: false },
    { src: "/assets/products/tct-ring-hand-model.jpg", alt: "The Carat Theory Lennon Three Stone Ring On-Model Hand Shot", isVideo: false },
    { src: "/assets/products/tct-solitaire-ring.jpg", alt: "The Carat Theory Solitaire Diamond Ring Alternative Angle", isVideo: false },
    { src: "/assets/products/tct-tennis-bracelet.jpg", alt: "The Carat Theory 18K Gold Diamond Tennis Bracelet", isVideo: false },
    { src: "/assets/products/tct-tennis-necklace.jpg", alt: "The Carat Theory 18K Gold Layered Diamond Tennis Necklace", isVideo: false }
  ],
  description: "Lennon Three Stone Ring brings a touch of luxury to your everyday attire, infusing it with creative elegance. Crafted with gold and diamonds, it's an ideal accessory for any occasion. Your order includes quality packaging and diamond certificate.",
  details: [
    { label: "Metal Purity", value: "18K Solid Gold / 14K / 9K / 925 Sterling Silver" },
    { label: "Center Diamond Carat", value: "1.20 ct Type IIa Lab-Grown Diamond" },
    { label: "Side Diamonds", value: "0.90 ct TW Brilliant Round Diamonds" },
    { label: "Total Carat Weight", value: "2.10 ct TW" },
    { label: "Diamond Color & Clarity", value: "DEF Color · VVS-VS Clarity" },
    { label: "Diamond Cut", value: "Excellent / Ideal Cut (Hearts & Arrows)" },
    { label: "Certificate", value: "IGI / GIA Authenticated Laser Inscription" },
    { label: "Warranty & Care", value: "Lifetime Diamond Care & Maintenance Service" }
  ],
  priceBreakup: [
    { item: "Gold Value (18K Solid Gold)", amount: "$295" },
    { item: "Diamond Value (2.10 ct DEF / VVS Certified)", amount: "$545" },
    { item: "Master Hand-Setting & Craftsmanship", amount: "$75" },
    { item: "Insured Global Armored Courier", amount: "$25" },
    { item: "Total Selling Price", amount: "$940", highlight: true }
  ],
  shippingInfo: "Complimentary insured express delivery in 3-5 business days worldwide. Ships via insured armored transport with discrete tamper-evident luxury presentation packaging. Odd ring sizes (e.g. 6.5) and custom orders are crafted exclusively to order with no cancellations. Covered by our Lifetime Care & Service Guarantee."
};

export const RELATED_PRODUCTS = [
  {
    id: "related-kyla",
    name: "Kyla Three Stone Ring",
    priceUSD: 1245,
    image: "/assets/products/tct-three-stone-yellow.jpg",
    metals: ["925 Silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  },
  {
    id: "related-viviana",
    name: "Viviana Solitaire Ring",
    priceUSD: 378,
    image: "/assets/products/tct-solitaire-ring.jpg",
    metals: ["925 Silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  },
  {
    id: "related-evie",
    name: "Evie Tennis Bracelet",
    priceUSD: 670,
    image: "/assets/products/tct-tennis-bracelet.jpg",
    metals: ["925 Silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  },
  {
    id: "related-giselle",
    name: "Giselle Tennis Necklace",
    priceUSD: 275,
    image: "/assets/products/tct-tennis-necklace.jpg",
    metals: ["925 Silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  }
];

export const BESTSELLER_RINGS = [
  {
    id: "ring-kyla",
    name: "Kyla Three Stone Ring",
    priceUSD: 1245,
    image: "/assets/rings/kyla-yellow.jpg",
    imagesByColor: {
      yellow: "/assets/rings/kyla-yellow.jpg",
      white: "/assets/rings/kyla-white.jpg",
      rose: "/assets/rings/kyla-rose.jpg"
    },
    metals: ["925 Silver", "9K", "14K", "18K"]
  },
  {
    id: "ring-mabel",
    name: "Mabel Three Stone Ring",
    priceUSD: 450,
    image: "/assets/rings/mabel-yellow.png",
    imagesByColor: {
      yellow: "/assets/rings/mabel-yellow.png",
      white: "/assets/rings/mabel-white.png",
      rose: "/assets/rings/mabel-rose.png"
    },
    metals: ["925 Silver", "9K", "14K", "18K"]
  },
  {
    id: "ring-kennedi",
    name: "Kennedi Three Stone Ring",
    priceUSD: 1115,
    image: "/assets/rings/kennedi-yellow.jpg",
    imagesByColor: {
      yellow: "/assets/rings/kennedi-yellow.jpg",
      white: "/assets/rings/kennedi-white.jpg",
      rose: "/assets/rings/kennedi-rose.jpg"
    },
    metals: ["925 Silver", "9K", "14K", "18K"]
  },
  {
    id: "ring-carmen",
    name: "Carmen Three Stone Ring",
    priceUSD: 360,
    image: "/assets/rings/carmen-yellow.png",
    imagesByColor: {
      yellow: "/assets/rings/carmen-yellow.png",
      white: "/assets/rings/carmen-white.png",
      rose: "/assets/rings/carmen-yellow.png"
    },
    metals: ["925 Silver", "9K", "14K", "18K"]
  }
];

export const CATEGORIES_DATA = [
  {
    name: "RINGS",
    image: "/assets/tct-category-rings.jpg",
    link: "#collection"
  },
  {
    name: "EARRINGS",
    image: "/assets/tct-category-earrings.jpg",
    link: "#collection"
  },
  {
    name: "BRACELETS",
    image: "/assets/tct-category-bracelets.jpg",
    link: "#collection"
  }
];

export const SHAPES_DATA = [
  { name: "PRINCESS", image: "/assets/shapes/princess.png" },
  { name: "CUSHION", image: "/assets/shapes/cushion.png" },
  { name: "EMERALD", image: "/assets/shapes/emerald.png" },
  { name: "ROUND", image: "/assets/shapes/round.png" },
  { name: "OVAL", image: "/assets/shapes/oval.png" },
  { name: "PEAR", image: "/assets/shapes/pear.png" },
  { name: "MARQUISE", image: "/assets/shapes/marquise.png" },
  { name: "HEART", image: "/assets/shapes/heart.png" }
];

export const PRODUCTS_DATA = allProductsData;
