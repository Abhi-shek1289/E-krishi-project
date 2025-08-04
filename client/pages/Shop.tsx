import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Search, 
  Filter, 
  Leaf, 
  ArrowLeft, 
  Plus, 
  Minus,
  Package,
  Truck,
  Shield,
  Award,
  MapPin,
  Phone,
  Mail
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Shop = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL CATEGORIES');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    'ALL CATEGORIES',
    'GRAINS & CEREALS',
    'FRESH VEGETABLES',
    'FRUITS',
    'DAIRY PRODUCTS',
    'SPICES & HERBS',
    'ORGANIC PRODUCTS',
    'SEEDS & SAPLINGS',
    'FARM TOOLS'
  ];

  const products = [
    // Grains & Cereals
    {
      id: 1,
      name: 'Premium Basmati Rice',
      category: 'GRAINS & CEREALS',
      price: 180,
      originalPrice: 220,
      unit: 'kg',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/basmati-1ab217?format=webp&width=800',
      rating: 4.8,
      reviews: 324,
      discount: 18,
      inStock: true,
      description: 'Premium quality aged Basmati rice from Punjab. Perfect for biryanis and pulavs.',
      origin: 'Punjab, India'
    },
    {
      id: 2,
      name: 'Organic Wheat Flour',
      category: 'GRAINS & CEREALS',
      price: 45,
      originalPrice: 55,
      unit: 'kg',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/soilimg-d84f73?format=webp&width=800',
      rating: 4.6,
      reviews: 256,
      discount: 18,
      inStock: true,
      description: 'Stone-ground organic wheat flour, rich in nutrients and fiber.',
      origin: 'Haryana, India'
    },
    // Fresh Vegetables
    {
      id: 3,
      name: 'Fresh Tomatoes',
      category: 'FRESH VEGETABLES',
      price: 35,
      originalPrice: 45,
      unit: 'kg',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/tomato-303898?format=webp&width=800',
      rating: 4.4,
      reviews: 189,
      discount: 22,
      inStock: true,
      description: 'Fresh, juicy tomatoes directly from organic farms. Perfect for cooking.',
      origin: 'Karnataka, India'
    },
    {
      id: 4,
      name: 'Organic Onions',
      category: 'FRESH VEGETABLES',
      price: 25,
      originalPrice: 30,
      unit: 'kg',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g28-a2cec1?format=webp&width=800',
      rating: 4.3,
      reviews: 167,
      discount: 17,
      inStock: true,
      description: 'Premium red onions with rich flavor and long shelf life.',
      origin: 'Maharashtra, India'
    },
    {
      id: 5,
      name: 'Fresh Potatoes',
      category: 'FRESH VEGETABLES',
      price: 20,
      originalPrice: 25,
      unit: 'kg',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/potato-479446?format=webp&width=800',
      rating: 4.5,
      reviews: 234,
      discount: 20,
      inStock: true,
      description: 'Fresh potatoes perfect for all your cooking needs.',
      origin: 'Uttar Pradesh, India'
    },
    // Fruits
    {
      id: 6,
      name: 'Kashmir Apples',
      category: 'FRUITS',
      price: 150,
      originalPrice: 180,
      unit: 'kg',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/apple-2d2d61?format=webp&width=800',
      rating: 4.9,
      reviews: 445,
      discount: 17,
      inStock: true,
      description: 'Premium Kashmir apples, crispy and sweet. Rich in vitamins.',
      origin: 'Kashmir, India'
    },
    {
      id: 7,
      name: 'Fresh Corn',
      category: 'FRESH VEGETABLES',
      price: 30,
      originalPrice: 40,
      unit: 'kg',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g21-8c6dc8?format=webp&width=800',
      rating: 4.5,
      reviews: 189,
      discount: 25,
      inStock: true,
      description: 'Sweet and tender corn kernels, perfect for cooking and snacking.',
      origin: 'Karnataka, India'
    },
    // Dairy Products
    {
      id: 8,
      name: 'Pure Cow Milk',
      category: 'DAIRY PRODUCTS',
      price: 60,
      originalPrice: 70,
      unit: 'litre',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/g33-20c584?format=webp&width=800',
      rating: 4.7,
      reviews: 312,
      discount: 14,
      inStock: true,
      description: 'Fresh cow milk from local dairy farms. Rich in calcium and proteins.',
      origin: 'Punjab, India'
    },
    // Spices & Herbs
    {
      id: 9,
      name: 'Fresh Basil Leaves',
      category: 'SPICES & HERBS',
      price: 40,
      originalPrice: 50,
      unit: '100g',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/basil-e8b736?format=webp&width=800',
      rating: 4.5,
      reviews: 156,
      discount: 20,
      inStock: true,
      description: 'Fresh organic basil leaves, perfect for cooking and medicinal use.',
      origin: 'Kerala, India'
    },
    {
      id: 10,
      name: 'Organic Clover Seeds',
      category: 'SEEDS & SAPLINGS',
      price: 120,
      originalPrice: 150,
      unit: '500g',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/clover-0e75ac?format=webp&width=800',
      rating: 4.6,
      reviews: 98,
      discount: 20,
      inStock: true,
      description: 'High-quality clover seeds for nitrogen fixation and soil improvement.',
      origin: 'Himachal Pradesh, India'
    },
    // Organic Products
    {
      id: 11,
      name: 'Organic Black Beans',
      category: 'ORGANIC PRODUCTS',
      price: 85,
      originalPrice: 100,
      unit: 'kg',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/beans-96d4aa?format=webp&width=800',
      rating: 4.6,
      reviews: 198,
      discount: 15,
      inStock: true,
      description: 'Organic black beans rich in protein and fiber.',
      origin: 'Madhya Pradesh, India'
    },
    {
      id: 12,
      name: 'Cotton Seeds',
      category: 'SEEDS & SAPLINGS',
      price: 200,
      originalPrice: 250,
      unit: 'kg',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/cotton-fea1aa?format=webp&width=800',
      rating: 4.4,
      reviews: 134,
      discount: 20,
      inStock: true,
      description: 'High-quality cotton seeds for cotton cultivation.',
      origin: 'Gujarat, India'
    },
    // Farm Tools & Soil
    {
      id: 13,
      name: 'Organic Soil Mix',
      category: 'FARM TOOLS',
      price: 300,
      originalPrice: 400,
      unit: '50kg bag',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/soil-fdd45e?format=webp&width=800',
      rating: 4.3,
      reviews: 89,
      discount: 25,
      inStock: true,
      description: 'Premium organic soil mix perfect for all types of plants and vegetables.',
      origin: 'Maharashtra, India'
    },
    {
      id: 14,
      name: 'Natural Pesticides',
      category: 'FARM TOOLS',
      price: 180,
      originalPrice: 220,
      unit: '500ml',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/pesticides-c9e4e9?format=webp&width=800',
      rating: 4.5,
      reviews: 156,
      discount: 18,
      inStock: true,
      description: 'Eco-friendly natural pesticides for organic farming.',
      origin: 'Tamil Nadu, India'
    },
    {
      id: 15,
      name: 'Sunflower Oil',
      category: 'ORGANIC PRODUCTS',
      price: 140,
      originalPrice: 170,
      unit: '1 litre',
      image: 'https://cdn.builder.io/api/v1/assets/dfb5e725ea9b4054b96bcf132975dc54/oil-e0d16e?format=webp&width=800',
      rating: 4.7,
      reviews: 267,
      discount: 18,
      inStock: true,
      description: 'Pure cold-pressed sunflower oil, rich in vitamin E.',
      origin: 'Karnataka, India'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'ALL CATEGORIES' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center text-green-600 hover:text-green-500">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span className="font-medium">Back to E-krishi</span>
              </Link>
              <div className="flex items-center">
                <Package className="h-8 w-8 text-green-600 mr-2" />
                <span className="text-2xl font-bold text-gray-900">KRISHI STORE</span>
              </div>
            </div>
            
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-green-600 font-medium border-b-2 border-green-600 pb-2">Shop</a>
              <a href="#" className="text-gray-600 hover:text-green-600">About</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Blog</a>
            </nav>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <Heart className="h-4 w-4" />
                  {wishlist.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                      {wishlist.length}
                    </Badge>
                  )}
                </Button>
              </div>
              <div className="relative">
                <Button variant="outline" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4" />
                  {getTotalItems() > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                      {getTotalItems()}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-700 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Fresh Indian Agricultural Products</h1>
            <p className="text-xl text-green-100 mb-8">Direct from farms to your doorstep • 100% Organic • Best Prices</p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for fruits, vegetables, grains, spices..."
                  className="w-full px-4 py-3 pl-12 text-gray-900 bg-white rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-green-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-8 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div className="flex flex-col items-center">
              <Truck className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Free Delivery</h3>
              <p className="text-sm text-gray-600">On orders above ₹500</p>
            </div>
            <div className="flex flex-col items-center">
              <Shield className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Quality Assured</h3>
              <p className="text-sm text-gray-600">100% Fresh & Organic</p>
            </div>
            <div className="flex flex-col items-center">
              <Award className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Direct from Farms</h3>
              <p className="text-sm text-gray-600">No middlemen</p>
            </div>
            <div className="flex flex-col items-center">
              <Leaf className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="font-semibold text-gray-900">Organic Certified</h3>
              <p className="text-sm text-gray-600">Chemical-free products</p>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Categories */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-24">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content - Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory} ({filteredProducts.length} products)
              </h2>
              {getTotalItems() > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-medium">
                      Cart: {getTotalItems()} items
                    </span>
                    <span className="text-green-800 font-bold">
                      ₹{getTotalPrice().toFixed(2)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {product.discount > 0 && (
                      <Badge className="absolute top-2 left-2 bg-red-500">
                        -{product.discount}%
                      </Badge>
                    )}
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          wishlist.includes(product.id) 
                            ? 'fill-red-500 text-red-500' 
                            : 'text-gray-400'
                        }`} 
                      />
                    </button>
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg font-semibold line-clamp-1">
                        {product.name}
                      </CardTitle>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-xs text-gray-500">
                      <MapPin className="h-3 w-3 mr-1" />
                      {product.origin}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-xl font-bold text-green-600">
                          ₹{product.price}
                        </span>
                        <span className="text-sm text-gray-500">/{product.unit}</span>
                      </div>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ₹{product.originalPrice}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-gray-500">
                        {product.reviews} reviews
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {product.category.split(' ')[0]}
                      </Badge>
                    </div>
                    
                    <Button 
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Krishi Store</h3>
              <p className="text-green-100 text-sm">
                Premium Indian agricultural products delivered fresh from farms to your doorstep.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-green-100 hover:text-white">About Us</a>
                <a href="#" className="block text-green-100 hover:text-white">Contact</a>
                <a href="#" className="block text-green-100 hover:text-white">Privacy Policy</a>
                <a href="#" className="block text-green-100 hover:text-white">Terms & Conditions</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block text-green-100 hover:text-white">Fresh Vegetables</a>
                <a href="#" className="block text-green-100 hover:text-white">Fruits</a>
                <a href="#" className="block text-green-100 hover:text-white">Grains & Cereals</a>
                <a href="#" className="block text-green-100 hover:text-white">Organic Products</a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-sm text-green-100">
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2" />
                  +91 9473****34
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2" />
                  support@krishistore.com
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  Mumbai, Maharashtra
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-green-800 pt-8 mt-8 text-center">
            <p className="text-green-200 text-sm">
              © 2024 Krishi Store. All rights reserved. | Connecting Farmers to Consumers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Shop;
