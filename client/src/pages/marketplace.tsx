import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Heart, MessageCircle, Eye, MapPin, Star, Filter, Search, Plus } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import type { MarketplaceItemResponse } from "@shared/schema";

// Mock marketplace data
const mockMarketplaceItems: MarketplaceItemResponse[] = [
  {
    id: "1",
    sellerId: "seller1",
    sellerName: "Rajesh Kumar",
    sellerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    sellerRating: 4.8,
    title: "Fresh Organic Tomatoes - Premium Quality",
    description: "Freshly harvested organic tomatoes from my farm. No pesticides used. Perfect for cooking and salads.",
    category: "vegetables",
    cropType: "tomato",
    quantity: 50,
    unit: "kg",
    pricePerUnit: 25,
    totalPrice: 1250,
    images: [
      "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=400&h=400&fit=crop"
    ],
    location: "Pune, Maharashtra",
    harvestDate: "2024-09-10",
    expiryDate: "2024-09-25",
    isOrganic: true,
    status: "available",
    views: 234,
    likes: 45,
    createdAt: "2024-09-12"
  },
  {
    id: "2",
    sellerId: "seller2", 
    sellerName: "Priya Sharma",
    sellerAvatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a5b?w=100&h=100&fit=crop&crop=face",
    sellerRating: 4.9,
    title: "Premium Basmati Rice - 25kg Bags",
    description: "High-quality basmati rice directly from Punjab farms. Long grain, aromatic, perfect for special occasions.",
    category: "grains",
    cropType: "rice",
    quantity: 500,
    unit: "kg",
    pricePerUnit: 85,
    totalPrice: 42500,
    images: [
      "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&h=400&fit=crop"
    ],
    location: "Amritsar, Punjab",
    harvestDate: "2024-08-20",
    isOrganic: false,
    status: "available",
    views: 567,
    likes: 123,
    createdAt: "2024-09-08"
  },
  {
    id: "3",
    sellerId: "seller3",
    sellerName: "Amit Patel",
    sellerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", 
    sellerRating: 4.6,
    title: "Fresh Green Chilies - Spicy Variety",
    description: "Hot and fresh green chilies harvested this morning. Perfect for Indian cooking. Various heat levels available.",
    category: "vegetables",
    cropType: "chili",
    quantity: 20,
    unit: "kg",
    pricePerUnit: 40,
    totalPrice: 800,
    images: [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=400&h=400&fit=crop"
    ],
    location: "Nashik, Maharashtra",
    harvestDate: "2024-09-14",
    expiryDate: "2024-09-21",
    isOrganic: true,
    status: "available",
    views: 189,
    likes: 67,
    createdAt: "2024-09-14"
  },
  {
    id: "4",
    sellerId: "seller4",
    sellerName: "Sunita Devi",
    sellerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    sellerRating: 4.7,
    title: "Sweet Mangoes - Alphonso Variety",
    description: "Premium Alphonso mangoes from Konkan region. Sweet, juicy, and perfectly ripe. Limited stock available.",
    category: "fruits",
    cropType: "mango",
    quantity: 100,
    unit: "pieces",
    pricePerUnit: 50,
    totalPrice: 5000,
    images: [
      "https://images.unsplash.com/photo-1553279768-865429fa0078?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=400&h=400&fit=crop"
    ],
    location: "Ratnagiri, Maharashtra",
    harvestDate: "2024-09-12",
    expiryDate: "2024-09-20", 
    isOrganic: true,
    status: "available",
    views: 456,
    likes: 234,
    createdAt: "2024-09-13"
  },
  {
    id: "5",
    sellerId: "seller5",
    sellerName: "Karan Singh",
    sellerAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    sellerRating: 4.5,
    title: "Premium Wheat - Whole Grain",
    description: "High-quality wheat grains perfect for flour making. Clean, sorted, and ready for processing.",
    category: "grains",
    cropType: "wheat",
    quantity: 1000,
    unit: "kg",
    pricePerUnit: 25,
    totalPrice: 25000,
    images: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1559726161-ad960999fc6b?w=400&h=400&fit=crop"
    ],
    location: "Ludhiana, Punjab",
    harvestDate: "2024-08-25",
    isOrganic: false,
    status: "available", 
    views: 345,
    likes: 89,
    createdAt: "2024-09-10"
  },
  {
    id: "6",
    sellerId: "seller6",
    sellerName: "Meera Reddy",
    sellerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    sellerRating: 4.9,
    title: "Fresh Spinach Leaves - Organic",
    description: "Fresh, green, and nutritious spinach leaves. Grown without chemicals. Perfect for healthy cooking.",
    category: "vegetables",
    cropType: "spinach",
    quantity: 15,
    unit: "kg",
    pricePerUnit: 30,
    totalPrice: 450,
    images: [
      "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1542068829-1115f7259450?w=400&h=400&fit=crop"
    ],
    location: "Bengaluru, Karnataka",
    harvestDate: "2024-09-15",
    expiryDate: "2024-09-18",
    isOrganic: true,
    status: "available",
    views: 123,
    likes: 56,
    createdAt: "2024-09-15"
  }
];

const categories = [
  { id: "all", label: "All", count: mockMarketplaceItems.length },
  { id: "vegetables", label: "Vegetables", count: mockMarketplaceItems.filter(item => item.category === "vegetables").length },
  { id: "fruits", label: "Fruits", count: mockMarketplaceItems.filter(item => item.category === "fruits").length },
  { id: "grains", label: "Grains", count: mockMarketplaceItems.filter(item => item.category === "grains").length },
];

interface MarketplaceItemCardProps {
  item: MarketplaceItemResponse;
  onLike: (id: string) => void;
  onContact: (sellerId: string, itemId: string) => void;
}

function MarketplaceItemCard({ item, onLike, onContact }: MarketplaceItemCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(item.id);
  };

  return (
    <motion.div
      className="bg-card rounded-2xl overflow-hidden shadow-lg border border-border hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -4 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      data-testid={`marketplace-item-${item.id}`}
    >
      {/* Image Carousel */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover"
        />
        {item.isOrganic && (
          <Badge className="absolute top-3 left-3 bg-green-600 text-white">
            Organic
          </Badge>
        )}
        <div className="absolute top-3 right-3 flex items-center space-x-1 bg-black/50 text-white px-2 py-1 rounded-lg text-sm">
          <Eye className="w-3 h-3" />
          <span>{item.views}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Seller Info */}
        <div className="flex items-center space-x-3 mb-3">
          <img
            src={item.sellerAvatar}
            alt={item.sellerName}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">{item.sellerName}</p>
            <div className="flex items-center space-x-1">
              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              <span className="text-xs text-muted-foreground">{item.sellerRating}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-muted-foreground text-xs">
            <MapPin className="w-3 h-3" />
            <span>{item.location.split(',')[0]}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {item.description}
        </p>

        {/* Quantity & Price */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {item.quantity} {item.unit} available
            </p>
            <p className="text-lg font-bold text-primary">
              ₹{item.pricePerUnit}/{item.unit}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Total</p>
            <p className="text-xl font-bold text-foreground">
              ₹{item.totalPrice.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <motion.button
            className={`flex items-center space-x-1 px-3 py-1.5 rounded-lg transition-colors ${
              isLiked 
                ? "text-red-600 bg-red-50" 
                : "text-muted-foreground hover:text-red-600 hover:bg-red-50"
            }`}
            onClick={handleLike}
            whileTap={{ scale: 0.95 }}
            data-testid={`button-like-${item.id}`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{item.likes + (isLiked ? 1 : 0)}</span>
          </motion.button>

          <Button
            onClick={() => onContact(item.sellerId, item.id)}
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2"
            data-testid={`button-contact-${item.id}`}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Contact Seller
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState(mockMarketplaceItems);

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.cropType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLike = (itemId: string) => {
    setItems(prev => prev.map(item => 
      item.id === itemId 
        ? { ...item, likes: item.likes + 1 }
        : item
    ));
  };

  const handleContact = (sellerId: string, itemId: string) => {
    // In a real app, this would navigate to messages or open a chat
    console.log(`Contacting seller ${sellerId} about item ${itemId}`);
    alert(`Starting conversation with seller about this item!`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Fresh from Farm to You
          </h1>
          <p className="text-lg text-muted-foreground">
            Discover fresh crops directly from local farmers across India
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div 
          className="flex flex-col lg:flex-row gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search crops, farmers, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg"
              data-testid="search-input"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className="px-4 py-2"
                data-testid={`category-filter-${category.id}`}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
          <Button variant="outline" className="px-4 py-2">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </motion.div>

        {/* Add Listing CTA */}
        <motion.div 
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                Got crops to sell?
              </h3>
              <p className="text-muted-foreground">
                List your fresh produce and reach thousands of buyers directly
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 lg:mt-0">
              <Plus className="w-4 h-4 mr-2" />
              Add Listing
            </Button>
          </div>
        </motion.div>

        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <MarketplaceItemCard
                item={item}
                onLike={handleLike}
                onContact={handleContact}
              />
            </motion.div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="text-6xl mb-4">🌾</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No crops found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filters to find what you're looking for
            </p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}