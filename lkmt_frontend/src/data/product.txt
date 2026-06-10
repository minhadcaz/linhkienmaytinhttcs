// import { Product } from '../types';
export interface Product {
  id: string;
  name: string;
  category: 'motherboard' | 'gpu' | 'ram' | 'cpu' | 'cooler' | 'case';
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviewCount: number;
  description: string;
  specifications: Record<string, string>;
  inStock: boolean;
  featured?: boolean;
}

export const products: Product[] = [
  // Motherboards
  {
    id: 'mb-1',
    name: 'ASUS ROG Strix Z790-E Gaming',
    category: 'motherboard',
    price: 449.99,
    originalPrice: 499.99,
    image: 'https://images-na.ssl-images-amazon.com/images/I/81cQQqzPcSL.jpg',
    rating: 4.8,
    reviewCount: 1247,
    description: 'High-end gaming motherboard with RGB lighting, WiFi 6E, and premium components for ultimate performance.',
    specifications: {
      'Socket': 'LGA 1700',
      'Chipset': 'Intel Z790',
      'Memory': 'DDR5-7600+ (OC)',
      'Slots': '4 x DIMM',
      'PCIe': '5.0 x16, 4.0 x16',
      'WiFi': '6E'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'mb-2',
    name: 'MSI MAG B550 Tomahawk',
    category: 'motherboard',
    price: 179.99,
    image: 'https://cdna.pcpartpicker.com/static/forever/images/product/b4c7550465b4b8115e71249aaf216a65.1600.jpg',
    rating: 4.6,
    reviewCount: 892,
    description: 'Mid-range AMD motherboard with excellent price-to-performance ratio.',
    specifications: {
      'Socket': 'AM4',
      'Chipset': 'AMD B550',
      'Memory': 'DDR4-4400+ (OC)',
      'Slots': '4 x DIMM',
      'PCIe': '4.0 x16, 3.0 x16'
    },
    inStock: true
  },

  // GPUs
  {
    id: 'gpu-1',
    name: 'GIGABYTE GeForce NVIDIA RTX 4080 SUPER',
    category: 'gpu',
    price: 999.99,
    originalPrice: 1199.99,
    image: 'https://netcodex.ph/wp-content/uploads/2024/08/GIGABYTE-GeForce-RTX-4080-Super-WINDFORCE-V2-16G-Graphics-Card.jpg',
    rating: 4.9,
    reviewCount: 2156,
    description: 'Top-tier graphics card for 4K gaming and content creation with ray tracing and DLSS 3.',
    specifications: {
      'Memory': '16GB GDDR6X',
      'Base Clock': '2210 MHz',
      'Boost Clock': '2550 MHz',
      'Memory Interface': '256-bit',
      'CUDA Cores': '10240',
      'Ray Tracing': 'Yes'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'gpu-2',
    name: 'Asus AMD Radeon RX 7600 XT',
    category: 'gpu',
    price: 329.99,
    image: 'https://gameone.ph/media/catalog/product/cache/d378a0f20f83637cdb1392af8dc032a2/a/s/asus_dual_radeon_rx_7600xt_oc_16gb_gddr6_graphics_card-1.jpg',
    rating: 4.4,
    reviewCount: 756,
    description: 'Excellent 1440p gaming graphics card with great price-to-performance.',
    specifications: {
      'Memory': '16GB GDDR6',
      'Base Clock': '2539 MHz',
      'Game Clock': '2755 MHz',
      'Memory Interface': '128-bit',
      'Stream Processors': '2048'
    },
    inStock: true
  },

  // RAM
  {
    id: 'ram-1',
    name: 'Corsair Vengeance RGB Pro 32GB',
    category: 'ram',
    price: 139.99,
    originalPrice: 159.99,
    image: 'https://m.media-amazon.com/images/I/61TMdiJy72L._AC_SL1200_.jpg',
    rating: 4.7,
    reviewCount: 3421,
    description: 'High-performance DDR4 memory with dynamic RGB lighting and optimized for Intel and AMD.',
    specifications: {
      'Capacity': '32GB (2x16GB)',
      'Speed': 'DDR4-3200',
      'Timing': 'CL16-18-18-36',
      'Voltage': '1.35V',
      'RGB': 'Yes'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'ram-2',
    name: 'G.SKILL Trident Z5 Neo 32GB',
    category: 'ram',
    price: 189.99,
    image: 'https://dynaquestpc.com/cdn/shop/files/89_e03ee509-5c80-4ca2-8cba-29b8120b9b0d.png?v=1749285683&width=1080',
    rating: 4.8,
    reviewCount: 1823,
    description: 'Premium DDR5 memory optimized for AMD Ryzen 7000 series processors.',
    specifications: {
      'Capacity': '32GB (2x16GB)',
      'Speed': 'DDR5-6000',
      'Timing': 'CL30-38-38-96',
      'Voltage': '1.35V',
      'RGB': 'Yes'
    },
    inStock: true
  },

  // CPUs
  {
    id: 'cpu-1',
    name: 'Intel Core i7-14700K',
    category: 'cpu',
    price: 399.99,
    originalPrice: 449.99,
    image: 'https://m.media-amazon.com/images/I/51seOKbqbcL._UF1000,1000_QL80_.jpg',
    rating: 4.6,
    reviewCount: 1654,
    description: 'High-performance processor for gaming and content creation with 20 cores and 28 threads.',
    specifications: {
      'Cores': '20 (8P + 12E)',
      'Threads': '28',
      'Base Clock': '3.4 GHz',
      'Boost Clock': '5.6 GHz',
      'Cache': '33MB',
      'Socket': 'LGA 1700'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'cpu-2',
    name: 'AMD Ryzen 7 7800X3D',
    category: 'cpu',
    price: 449.99,
    image: 'https://thumbor.arvutitark.ee/y4gh04lMdH7ZMS2plbO4UkdFGyk=/trim/fit-in/800x800/filters:format(webp)/https%3A%2F%2Fstatic.arvutitark.ee%2Fpublic%2Fmedia-hub-olev%2F2023%2F09%2F459175%2Fhpam-257_hpam_257_01.jpg',
    rating: 4.8,
    reviewCount: 2234,
    description: 'Gaming powerhouse with 3D V-Cache technology for exceptional gaming performance.',
    specifications: {
      'Cores': '8',
      'Threads': '16',
      'Base Clock': '4.2 GHz',
      'Boost Clock': '5.0 GHz',
      'Cache': '96MB 3D V-Cache',
      'Socket': 'AM5'
    },
    inStock: true
  },

  // CPU Coolers
  {
    id: 'cooler-1',
    name: 'NZXT Kraken Elite 360',
    category: 'cooler',
    price: 279.99,
    originalPrice: 299.99,
    image: 'https://dynaquestpc.com/cdn/shop/files/NZXTKRAKENELITE360LCDBlack360mmCPUCoolerRL-KN36E-B1.jpg?v=1682747059&width=500',
    rating: 4.7,
    reviewCount: 987,
    description: 'Premium 360mm AIO liquid cooler with LCD display and RGB lighting.',
    specifications: {
      'Radiator Size': '360mm',
      'Fan Speed': '500-2000 RPM',
      'Pump Speed': '800-2800 RPM',
      'Socket Support': 'Intel LGA 1700, AMD AM4/AM5',
      'RGB': 'Yes',
      'LCD Display': 'Yes'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'cooler-2',
    name: 'Noctua NH-D15 Chromax',
    category: 'cooler',
    price: 109.99,
    image: 'https://www.linuxlookup.com/sites/default/files/styles/xl/public/noctua-nh-d15-chromax-black-cpu-cooler-0.jpg?itok=Sx-uqrv-',
    rating: 4.9,
    reviewCount: 2876,
    description: 'Premium air cooler with dual tower design and whisper-quiet operation.',
    specifications: {
      'Type': 'Air Cooler',
      'Height': '165mm',
      'Fan Speed': '300-1500 RPM',
      'Socket Support': 'Intel LGA 1700, AMD AM4/AM5',
      'Noise Level': '19.2 dB(A)'
    },
    inStock: true
  },

  // Cases
  {
    id: 'case-1',
    name: 'Fractal Design Define 7 XL',
    category: 'case',
    price: 199.99,
    originalPrice: 229.99,
    image: 'https://www.fractal-design.com/app/uploads/2020/10/Define_7_TGD_Black_XL_Left_Front-810x810.jpg',
    rating: 4.6,
    reviewCount: 1432,
    description: 'Full tower case with excellent airflow, sound dampening, and premium build quality.',
    specifications: {
      'Form Factor': 'Full Tower',
      'Motherboard Support': 'E-ATX, ATX, mATX, ITX',
      'GPU Clearance': '491mm',
      'CPU Cooler Height': '185mm',
      'Drive Bays': '11 x 3.5", 4 x 2.5"',
      'USB Ports': '2 x USB 3.0, 1 x USB-C'
    },
    inStock: true,
    featured: true
  },
  {
    id: 'case-2',
    name: 'NZXT H7 Flow',
    category: 'case',
    price: 129.99,
    image: 'https://www.makotekcomputers.com/cdn/shop/files/NZXT-H7-FLOW-RGB-MESH-FRONT-ATX-M-ATX-ITX-TEMPERED-GLASS-BLACK-PC-CASE.webp?v=1703116942&width=535',
    rating: 4.5,
    reviewCount: 823,
    description: 'Mid tower gaming case with optimized airflow and easy cable management.',
    specifications: {
      'Form Factor': 'Mid Tower',
      'Motherboard Support': 'ATX, mATX, ITX',
      'GPU Clearance': '413mm',
      'CPU Cooler Height': '165mm',
      'Drive Bays': '4 x 3.5", 2 x 2.5"',
      'USB Ports': '2 x USB 3.0, 1 x USB-C'
    },
    inStock: true
  }
];

export const categories = [
  { id: 'motherboard', name: 'Motherboards', icon: '🔌' },
  { id: 'gpu', name: 'Graphics Cards', icon: '🎮' },
  { id: 'ram', name: 'Memory (RAM)', icon: '💾' },
  { id: 'cpu', name: 'Processors', icon: '⚡' },
  { id: 'cooler', name: 'Cooling', icon: '❄️' },
  { id: 'case', name: 'Cases', icon: '🏠' }
] as const;

export const brands = [
  { id: 'asus', name: 'ASUS', count: 15 },
  { id: 'msi', name: 'MSI', count: 12 },
  { id: 'gigabyte', name: 'Gigabyte', count: 8 },
  { id: 'palit', name: 'Palit', count: 6 },
  { id: 'gskill', name: 'G.Skill', count: 10 },
  { id: 'coolermaster', name: 'Cooler Master', count: 9 }
] as const;