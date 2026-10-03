import { Category, Product, Review } from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'hoodies', name: 'Hoodies' },
  { id: 'tees', name: 'Tees & Tops' },
  { id: 'cargo', name: 'Pants & Cargos' },
  { id: 'jackets', name: 'Jackets & Outerwear' },
  { id: 'accessories', name: 'Accessories' }
];

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'EVORAN Phantom Heavyweight Hoodie',
    price: 3850,
    category: 'hoodies',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=1000&auto=format&fit=crop',
    description: '450 GSM French Terry cotton hoodie with custom embroidered cyber-glyph graphics, distressed cuffs, and an oversized drop-shoulder silhouette.',
    featured: true
  },
  {
    id: 'prod-2',
    name: 'Cyber Matrix Acid Wash Tee',
    price: 1950,
    category: 'tees',
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1000&auto=format&fit=crop',
    description: 'Heavyweight 260 GSM organic cotton t-shirt with vintage enzyme wash, screen-printed dystopian typography, and reinforced ribbed collar.',
    featured: true
  },
  {
    id: 'prod-3',
    name: 'Void Tactical Parachute Cargos',
    price: 4200,
    category: 'cargo',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=1000&auto=format&fit=crop',
    description: 'Water-resistant ripstop nylon utility trousers with 8 modular pockets, adjustable ankle bungee toggles, and matte black industrial hardware.',
    featured: true
  },
  {
    id: 'prod-4',
    name: 'Shadow Nomad Bomber Jacket',
    price: 5800,
    category: 'jackets',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1000&auto=format&fit=crop',
    description: 'Reversible tech-satin MA-1 bomber with thermal insulation, storm flap zip closure, and signature EVORAN orange security harness lining.',
    featured: true
  },
  {
    id: 'prod-5',
    name: 'Eclipse Distressed Knit Sweater',
    price: 3600,
    category: 'hoodies',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=1000&auto=format&fit=crop',
    description: 'Deconstructed chunky knit in raven black featuring intentional fraying along hem and cuffs with an ultra-soft wool blend.',
    featured: false
  },
  {
    id: 'prod-6',
    name: 'Genesis Raw Hem Boxy Tee',
    price: 1850,
    category: 'tees',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop',
    description: 'Boxy drop-shoulder tee with laser-cut raw hems and high-density EVORAN emblem chest print.',
    featured: false
  },
  {
    id: 'prod-7',
    name: 'Obsidian Utility Chest Rig',
    price: 2400,
    category: 'accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop',
    description: 'Cordura ballistic nylon chest harness with FIDLOCK-style magnetic buckles and weatherproof zippered compartments.',
    featured: false
  },
  {
    id: 'prod-8',
    name: 'Sub-Zero Quilted Puffer Vest',
    price: 4900,
    category: 'jackets',
    image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?q=80&w=1000&auto=format&fit=crop',
    description: 'Oversized down-filled utility vest with high stand collar, reflective back panel logo, and dual fleece-lined hand warmers.',
    featured: false
  }
];

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    name: 'Tanvir Ahmed',
    rating: 5,
    comment: 'The quality of the Phantom Heavyweight Hoodie is unreal. Feels like high-end Japanese streetwear brands. Packaging and delivery was on point.',
    timestamp: Date.now() - 1000 * 60 * 60 * 48,
    reply: 'Thank you for standing with EVORAN. More heavyweight drops arriving next month.'
  },
  {
    id: 'rev-2',
    name: 'Rakin Chowdhury',
    rating: 5,
    comment: 'The boxy cut on the tees is genuinely unmatched in BD. Fits exactly how oversized streetwear should drape.',
    timestamp: Date.now() - 1000 * 60 * 60 * 96,
    reply: 'Precision tailoring is our obsession. Appreciate the feedback brother!'
  },
  {
    id: 'rev-3',
    name: 'Shakil Hasan',
    rating: 5,
    comment: 'Tactical cargo quality exceeded expectations. Zippers and buckles are solid metal, fabric doesn\'t wrinkle.',
    timestamp: Date.now() - 1000 * 60 * 60 * 180
  }
];
