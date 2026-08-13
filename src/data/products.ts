import type { Product } from "../types/product.ts";


export const products: Product[] = [
  {
    id: 1,
    title: "Vintage Pokémon Card",
    category: "Trading Cards",
    condition: "Excellent",
    price: 12000,
    seller: "Rahul",
    location: "Kolkata",
    image: "https://assets.catawiki.com/image/cw_normal/plain/assets/catawiki/assets/2025/8/25/f/1/c/f1cc61fa-5574-4256-a5dc-6f2b422ca779.jpg",
    createdAt: "2026-08-10",
    description: "A rare vintage Pokémon collectible card.",
  },

  {
    id: 2,
    title: "Vintage Camera",
    category: "Cameras",
    condition: "Good",
    price: 8500,
    seller: "Arjun",
    location: "Mumbai",
    image: "https://www.vintagecameras.fr/images/MonSite/KODAK/Cine-Kodak_BB/_Img/img00.jpg",
    createdAt: "2026-08-09",
    description: "Classic vintage film camera.",
  },

  {
    id: 3,
    title: "Limited Edition Watch",
    category: "Watches",
    condition: "Like New",
    price: 25000,
    seller: "Sneha",
    location: "Delhi",
    image: "https://soleillees.fr/cdn/shop/articles/image_af018e3f-3a48-4abf-b688-d19d08bc1fc4.jpg?v=1743859815",
    createdAt: "2026-08-08",
    description: "Limited edition collectible wristwatch.",
  },
];