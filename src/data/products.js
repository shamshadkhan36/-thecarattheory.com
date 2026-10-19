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
