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
    image: "/assets/products/tct-three-stone-yellow.jpg",
    metals: ["925 Silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  },
  {
    id: "related-viviana",
    name: "Viviana Solitaire Ring",
    priceINR: 31416,
    priceUSD: 378,
    image: "/assets/products/tct-solitaire-ring.jpg",
    metals: ["925 Silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  },
  {
    id: "related-evie",
    name: "Evie Tennis Bracelet",
    priceINR: 55678,
    priceUSD: 670,
    image: "/assets/products/tct-tennis-bracelet.jpg",
    metals: ["925silver", "9K", "14K", "18K"],
    colors: ["#F2C94C", "#C4C4C4", "#E08E88"]
  },
  {
    id: "related-giselle",
    name: "Giselle Tennis Necklace",
    priceINR: 22747,
    priceUSD: 275,
    image: "/assets/products/tct-tennis-necklace.jpg",
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
      { name: "18K Yellow Gold", code: "yg", color: "#E5C278", premium: 0, image: "/assets/products/tct-three-stone-yellow.jpg" },
      { name: "18K White Gold", code: "wg", color: "#E0E3E8", premium: 0, image: "/assets/products/tct-three-stone-white.jpg" },
      { name: "18K Rose Gold", code: "rg", color: "#E8B2A7", premium: 50, image: "/assets/products/tct-three-stone-rose.jpg" }
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
      { name: "18K Yellow Gold", code: "yg", color: "#E5C278", premium: 0, image: "/assets/products/tct-solitaire-ring.jpg" },
      { name: "18K White Gold", code: "wg", color: "#E0E3E8", premium: 0, image: "/assets/products/tct-three-stone-white.jpg" },
      { name: "18K Rose Gold", code: "rg", color: "#E8B2A7", premium: 50, image: "/assets/products/tct-three-stone-rose.jpg" }
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
      { name: "18K Yellow Gold", code: "yg", color: "#E5C278", premium: 0, image: "/assets/products/tct-tennis-bracelet.jpg" },
      { name: "18K White Gold", code: "wg", color: "#E0E3E8", premium: 0, image: "/assets/products/tct-three-stone-white.jpg" },
      { name: "18K Rose Gold", code: "rg", color: "#E8B2A7", premium: 50, image: "/assets/products/tct-three-stone-rose.jpg" }
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
      { name: "18K Yellow Gold", code: "yg", color: "#E5C278", premium: 0, image: "/assets/products/tct-tennis-necklace.jpg" },
      { name: "18K White Gold", code: "wg", color: "#E0E3E8", premium: 0, image: "/assets/products/tct-three-stone-white.jpg" },
      { name: "18K Rose Gold", code: "rg", color: "#E8B2A7", premium: 50, image: "/assets/products/tct-three-stone-rose.jpg" }
    ],
    carats: [
      { carat: 1.0, multiplier: 1.0, label: "1.00 Carat" },
      { carat: 1.5, multiplier: 1.5, label: "1.50 Carat" }
    ],
    details: ["Triple oval symmetry", "Recycled gold alloy", "Lifetime polishing"]
  }
];
