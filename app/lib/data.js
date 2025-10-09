// lib/data.js

import girl_image from '../../public/Girls_team.webp'

export const categories = [
  {
    id: 1,
    slug: "education",
    title: "Education",
    image: girl_image,
    flavors: [
      { id: 101, name: "Online Courses", price: "$20", tags: ["digital", "learning"] },
      { id: 102, name: "Books", price: "$15", tags: ["physical", "reading"] },
      { id: 103, name: "Tutoring", price: "$30/hr", tags: ["service", "learning"] },
    ]
  },
  {
    id: 2,
    slug: "medical-health",
    title: "Medical & Health",
    image: girl_image,
    flavors: [
      { id: 201, name: "Vitamins", price: "$10", tags: ["supplement"] },
      { id: 202, name: "Telehealth", price: "$25", tags: ["service", "online"] },
    ]
  },
  {
    id: 3,
    slug: "clothes",
    title: "Clothes",
    image: girl_image,
    flavors: [
      { id: 301, name: "T-Shirts", price: "$12", tags: ["casual", "cotton"] },
      { id: 302, name: "Jeans", price: "$40", tags: ["denim", "fashion"] },
    ]
  },
  {
    id: 4,
    slug: "video-films",
    title: "Video & Films",
    image: girl_image,
    flavors: [
      { id: 401, name: "Short Films", price: "$5", tags: ["entertainment", "digital"] },
      { id: 402, name: "Documentaries", price: "$8", tags: ["educational", "streaming"] },
    ]
  },
  {
    id: 5,
    slug: "technology",
    title: "Technology",
    image: girl_image,
    flavors: [
      { id: 501, name: "Laptops", price: "$800", tags: ["gadgets", "electronics"] },
      { id: 502, name: "Smartphones", price: "$600", tags: ["mobile", "tech"] },
    ]
  },
  {
    id: 6,
    slug: "organic-foods",
    title: "Organic Foods",
    image: girl_image,
    flavors: [
      { id: 601, name: "Organic Fruits", price: "$10", tags: ["fresh", "healthy"] },
      { id: 602, name: "Honey", price: "$15", tags: ["natural", "sweet"] },
    ]
  },
]