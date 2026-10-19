export const PRIMARY_PRODUCT = {
  id: "ring-lennon",
  name: "Lennon Three Stone Ring",
  sku: "HYLR015",
  rating: 5.0,
  reviewsCount: 42,
  priceINR: 79420,
  priceUSD: 955,
  pricesByPurity: {
    "925 Silver": 18900,
    "9K": 48200,
    "14K": 64800,
    "18K": 79420
  },
  metals: ["925 Silver", "9K", "14K", "18K"],
  colors: [
    { id: "yellow", name: "Yellow Gold", hex: "#F2C94C", imageIndex: 0 },
    { id: "white", name: "White Gold", hex: "#C4C4C4", imageIndex: 6 },
    { id: "rose", name: "Rose Gold", hex: "#E08E88", imageIndex: 8 }
  ],
  images: [
    { src: "/assets/products/lennon/hylr015-1.png", alt: "Lennon Three Stone Ring Front View", isVideo: false },
    { src: "/assets/products/lennon/hylr015-11.png", alt: "Lennon Three Stone Ring Angled View", isVideo: false },
    { src: "/assets/products/lennon/hylr015-5.png", alt: "Lennon Three Stone Ring Side Profile", isVideo: false },
    { src: "/assets/products/lennon/hylr015-7.png", alt: "Lennon Ring 360 Spin Video", isVideo: true },
    { src: "/assets/products/lennon/hylr015-3.png", alt: "Lennon Ring Detail Angle", isVideo: false },
    { src: "/assets/products/lennon/hylr015-10.png", alt: "Lennon Diamond Shank Pavé", isVideo: false },
    { src: "/assets/products/lennon/hylr015-4.png", alt: "Lennon White Gold Front", isVideo: false },
    { src: "/assets/products/lennon/hylr015-9.png", alt: "Lennon White Gold 360 Spin", isVideo: true },
    { src: "/assets/products/lennon/hylr015-2.png", alt: "Lennon Rose Gold Front", isVideo: false },
    { src: "/assets/products/lennon/hylr015-6.png", alt: "Lennon Rose Gold Side", isVideo: false },
    { src: "/assets/products/lennon/hylr015-8.png", alt: "Lennon Rose Gold Profile", isVideo: false },
    { src: "/assets/products/lennon/hylr015-12.png", alt: "Lennon Top Down Symmetry", isVideo: false },
    { src: "/assets/products/lennon/hylr015-14.jpg", alt: "Lennon On-Model Hand Shot", isVideo: false }
  ],
  description: "Lennon Three Stone Ring brings a touch of luxury to your everyday attire, infusing it with creative elegance. Crafted with gold and diamonds, it's an ideal accessory for any occasion. Your order includes quality packaging and diamond certificate.",
  details: [
    { label: "Metal Purity", value: "18K Gold (Hallmarked) / 14K / 9K / 925 Sterling Silver" },
    { label: "Center Diamond Carat", value: "1.20 ct Type IIa Lab-Grown Diamond" },
    { label: "Side Diamonds", value: "0.90 ct TW Brilliant Round Diamonds" },
    { label: "Total Carat Weight", value: "2.10 ct TW" },
    { label: "Diamond Color & Clarity", value: "DEF Color · VVS-VS Clarity" },
    { label: "Diamond Cut", value: "Excellent / Ideal Cut (Hearts & Arrows)" },
    { label: "Certificate", value: "IGI / GIA Authenticated Laser Inscription" },
    { label: "Approx. Gold Weight", value: "4.95 grams (18K Solid Gold)" }
  ],
  priceBreakup: [
    { item: "Gold Value (18K Hallmarked)", amount: "Rs. 24,650" },
    { item: "Diamond Value (DEF / VVS Certified)", amount: "Rs. 46,200" },
    { item: "Making & Setting Charges", amount: "Rs. 6,250" },
    { item: "Applicable GST (3%)", amount: "Rs. 2,320" },
    { item: "Total Selling Price", amount: "Rs. 79,420", highlight: true }
  ],
  shippingInfo: "Complimentary insured express delivery in 3-5 business days across India. Ships via insured armored transport with discrete tamper-evident luxury presentation packaging. 15-Day 100% money back guarantee & Lifetime Full-Value Buyback policy."
};

export const RELATED_PRODUCTS = [
  {
    id: "related-kyla",
    name: "Kyla Three Stone Ring",
    priceINR: 103589,
    priceUSD: 1245,
    image: "/assets/rings/kyla-yellow.jpg",
    metals: ["925 Silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  },
  {
    id: "related-viviana",
    name: "Viviana Solitaire Ring",
    priceINR: 31416,
    priceUSD: 378,
    image: "/assets/products/viviana-solitaire.png",
    metals: ["925 Silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  },
  {
    id: "related-evie",
    name: "Evie Tennis Bracelet",
    priceINR: 55678,
    priceUSD: 670,
    image: "/assets/products/evie-bracelet.jpg",
    metals: ["925silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  },
  {
    id: "related-giselle",
    name: "Giselle Tennis Necklace",
    priceINR: 22747,
    priceUSD: 275,
    image: "/assets/products/giselle-necklace.jpg",
    metals: ["925 silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  }
];

export const BESTSELLER_RINGS = [
  {
    id: "ring-kyla",
    name: "Kyla Three Stone Ring",
    priceINR: 103589,
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
    priceINR: 37667,
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
    priceINR: 92832,
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
    priceINR: 30029,
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
    image: "/assets/category-rings.png",
    link: "#collection"
  },
  {
    name: "EARRINGS",
    image: "/assets/category-earrings.png",
    link: "#collection"
  },
  {
    name: "BRACELETS",
    image: "/assets/category-bracelets.png",
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

export const PRODUCTS_DATA = [
  {
    id: "tct-ring-01",
    name: "Kyla Three Stone Ring",
    category: "rings",
    subCategory: "three-stone",
    shape: "oval",
    basePrice: 1245,
    rating: 5.0,
    reviewsCount: 38,
    isBestseller: true,
    certification: "IGI & GIA Certified",
    diamondGrade: "D-F Color · VVS1-VS1 Clarity · Ideal Cut",
    badge: "Bestseller",
    description: "An architectural icon of balanced harmony with three graduated brilliant diamonds.",
    metals: [
      { name: "18K Yellow Gold", code: "yg", color: "#E5C278", premium: 0, image: "https://purepromisediamonds.com/cdn/shop/files/HYLR3081_9_748f9614-e9e8-4ed7-8bce-f6919ca44e94.jpg" },
      { name: "18K White Gold", code: "wg", color: "#E0E3E8", premium: 0, image: "https://purepromisediamonds.com/cdn/shop/files/HYLR3081_5_4283f03a-b48d-47d8-b123-6e77009590f5.jpg" },
      { name: "18K Rose Gold", code: "rg", color: "#E8B2A7", premium: 50, image: "https://purepromisediamonds.com/cdn/shop/files/HYLR3081_3_701b5855-09a1-4e98-8016-9d543bb2f8c5.jpg" }
    ],
    carats: [
      { carat: 1.0, multiplier: 1.0, label: "1.00 Carat" },
      { carat: 1.5, multiplier: 1.45, label: "1.50 Carat" },
      { carat: 2.0, multiplier: 2.15, label: "2.00 Carat" }
    ],
    details: ["Solid 14k/18k Gold or 925 Silver", "IGI Certified Type IIa", "Lifetime Buyback Guaranteed"]
  },
  {
    id: "tct-ring-02",
    name: "Mabel Three Stone Ring",
    category: "rings",
    subCategory: "three-stone",
    shape: "round",
    basePrice: 450,
    rating: 4.9,
    reviewsCount: 52,
    isBestseller: true,
    certification: "IGI Certified",
    diamondGrade: "E Color · VVS2 Clarity",
    badge: "Trending",
    description: "Three scintillating round brilliant cut stones mounted in classic claw prongs.",
    metals: [
      { name: "18K Yellow Gold", code: "yg", color: "#E5C278", premium: 0, image: "https://purepromisediamonds.com/cdn/shop/files/R3_RD_1070001.png" },
      { name: "18K White Gold", code: "wg", color: "#E0E3E8", premium: 0, image: "https://purepromisediamonds.com/cdn/shop/files/R3_RD_1070011.png" },
      { name: "18K Rose Gold", code: "rg", color: "#E8B2A7", premium: 50, image: "https://purepromisediamonds.com/cdn/shop/files/R3_RD_1070005.png" }
    ],
    carats: [
      { carat: 1.0, multiplier: 1.0, label: "1.00 Carat" },
      { carat: 1.5, multiplier: 1.48, label: "1.50 Carat" }
    ],
    details: ["Comfort Fit Band", "Hand-finished setting", "Free insured shipping"]
  },
  {
    id: "tct-ring-03",
    name: "Kennedi Three Stone Ring",
    category: "rings",
    subCategory: "three-stone",
    shape: "round",
    basePrice: 1115,
    rating: 5.0,
    reviewsCount: 29,
    isBestseller: true,
    certification: "GIA Certified",
    diamondGrade: "D Color · VVS1 Clarity",
    badge: "Iconic",
    description: "Prominent round brilliant flanked by two pear side diamonds.",
    metals: [
      { name: "18K Yellow Gold", code: "yg", color: "#E5C278", premium: 0, image: "https://purepromisediamonds.com/cdn/shop/files/HYLR3007_1.jpg" },
      { name: "18K White Gold", code: "wg", color: "#E0E3E8", premium: 0, image: "https://purepromisediamonds.com/cdn/shop/files/HYLR3007_7.jpg" },
      { name: "18K Rose Gold", code: "rg", color: "#E8B2A7", premium: 50, image: "https://purepromisediamonds.com/cdn/shop/files/HYLR3007_5.jpg" }
    ],
    carats: [
      { carat: 1.5, multiplier: 1.0, label: "1.50 Carat" },
      { carat: 2.0, multiplier: 1.55, label: "2.00 Carat" }
    ],
    details: ["Precision 4-prong setting", "Conflict-free lab engineered", "Certificate of Authenticity"]
  },
  {
    id: "tct-ring-04",
    name: "Carmen Three Stone Ring",
    category: "rings",
    subCategory: "three-stone",
    shape: "oval",
    basePrice: 360,
    rating: 4.8,
    reviewsCount: 34,
    isBestseller: true,
    certification: "IGI Certified",
    diamondGrade: "F Color · VS1 Clarity",
    badge: "Special",
    description: "Three matched oval cut stones resting side by side with endless fire.",
    metals: [
      { name: "18K Yellow Gold", code: "yg", color: "#E5C278", premium: 0, image: "https://purepromisediamonds.com/cdn/shop/files/HYLR3129_14.png" },
      { name: "18K White Gold", code: "wg", color: "#E0E3E8", premium: 0, image: "https://purepromisediamonds.com/cdn/shop/files/HYLR3129_7.png" },
      { name: "18K Rose Gold", code: "rg", color: "#E8B2A7", premium: 50, image: "https://purepromisediamonds.com/cdn/shop/files/HYLR3129_8.png" }
    ],
    carats: [
      { carat: 1.0, multiplier: 1.0, label: "1.00 Carat" },
      { carat: 1.5, multiplier: 1.5, label: "1.50 Carat" }
    ],
    details: ["Triple oval symmetry", "Recycled gold alloy", "Lifetime polishing"]
  }
];
