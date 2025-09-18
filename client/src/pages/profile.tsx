import { useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, Phone, Mail, Calendar, TrendingUp, ShoppingBag, MessageCircle, Settings, Edit3, Camera } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user data
const mockUser = {
  id: "current-user",
  name: "Arjun Verma",
  avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
  rating: 4.7,
  totalRatings: 234,
  location: "Pune, Maharashtra",
  phone: "+91 98765 43210",
  email: "arjun.verma@email.com",
  joinDate: "2023-03-15",
  isSeller: true,
  isVerified: true,
  bio: "Passionate organic farmer with 15+ years of experience. Specializing in pesticide-free vegetables and fruits. Direct from farm to your table!",
  farmSize: "25 acres",
  cropTypes: ["Tomatoes", "Onions", "Rice", "Wheat", "Mangoes"],
  certifications: ["Organic Certification", "Good Agricultural Practices"],
  totalSales: 156,
  totalEarnings: 2450000,
  responseRate: 98,
  responseTime: "2 hours"
};

const mockListings = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop",
    price: 25,
    unit: "kg",
    quantity: 50,
    status: "active",
    views: 234,
    likes: 45
  },
  {
    id: "2", 
    title: "Sweet Onions - Premium Quality",
    image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=200&h=200&fit=crop",
    price: 20,
    unit: "kg",
    quantity: 100,
    status: "sold",
    views: 189,
    likes: 67
  },
  {
    id: "3",
    title: "Organic Rice - Basmati",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
    price: 85,
    unit: "kg", 
    quantity: 200,
    status: "active",
    views: 456,
    likes: 123
  }
];

const mockReviews = [
  {
    id: "1",
    buyerName: "Priya Sharma",
    buyerAvatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a5b?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Excellent quality tomatoes! Fresh, organic, and delivered on time. Highly recommend!",
    date: "2024-09-10",
    itemTitle: "Fresh Organic Tomatoes"
  },
  {
    id: "2",
    buyerName: "Rajesh Kumar", 
    buyerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop&crop=face",
    rating: 4,
    comment: "Good quality rice. Packaging was perfect and delivery was quick.",
    date: "2024-09-08",
    itemTitle: "Organic Rice - Basmati"
  },
  {
    id: "3",
    buyerName: "Meera Reddy",
    buyerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=50&h=50&fit=crop&crop=face",
    rating: 5,
    comment: "Amazing onions! Very fresh and sweet. Will definitely order again.",
    date: "2024-09-05",
    itemTitle: "Sweet Onions - Premium Quality"
  }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: mockUser.name,
    bio: mockUser.bio,
    phone: mockUser.phone,
    email: mockUser.email,
    location: mockUser.location
  });

  const handleSave = () => {
    // In a real app, this would save to backend
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'sold':
        return 'bg-gray-100 text-gray-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div 
          className="bg-card rounded-2xl p-8 shadow-lg border border-border mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center space-y-6 lg:space-y-0 lg:space-x-8">
            {/* Avatar Section */}
            <div className="relative">
              <Avatar className="w-32 h-32 lg:w-40 lg:h-40">
                <AvatarImage src={mockUser.avatar} />
                <AvatarFallback className="text-2xl">{mockUser.name[0]}</AvatarFallback>
              </Avatar>
              <Button 
                size="sm" 
                variant="outline"
                className="absolute bottom-2 right-2 rounded-full p-2"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>

            {/* User Info */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                <div>
                  {isEditing ? (
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="text-2xl font-bold mb-2"
                    />
                  ) : (
                    <h1 className="text-2xl lg:text-3xl font-bold mb-2">{mockUser.name}</h1>
                  )}
                  
                  <div className="flex items-center space-x-4 text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{mockUser.rating}</span>
                      <span>({mockUser.totalRatings} reviews)</span>
                    </div>
                    {mockUser.isVerified && (
                      <Badge className="bg-blue-600 text-white">Verified</Badge>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={formData.location}
                          onChange={(e) => setFormData({...formData, location: e.target.value})}
                          className="flex-1"
                        />
                      ) : (
                        <span>{mockUser.location}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          className="flex-1"
                        />
                      ) : (
                        <span>{mockUser.phone}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      {isEditing ? (
                        <Input
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="flex-1"
                        />
                      ) : (
                        <span>{mockUser.email}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Member since {new Date(mockUser.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  {isEditing ? (
                    <>
                      <Button onClick={handleSave} data-testid="save-profile">
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" onClick={() => setIsEditing(true)} data-testid="edit-profile">
                        <Edit3 className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                      <Button variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Settings
                      </Button>
                    </>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div>
                {isEditing ? (
                  <Textarea
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    placeholder="Tell buyers about yourself and your farming practices..."
                    className="min-h-[100px]"
                  />
                ) : (
                  <p className="text-muted-foreground leading-relaxed">{mockUser.bio}</p>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">₹{(mockUser.totalEarnings / 100000).toFixed(1)}L</p>
                  <p className="text-sm text-muted-foreground">Total Earnings</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-secondary/10 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockUser.totalSales}</p>
                  <p className="text-sm text-muted-foreground">Total Sales</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockUser.responseRate}%</p>
                  <p className="text-sm text-muted-foreground">Response Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockUser.rating}</p>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabbed Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs defaultValue="listings" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="listings">My Listings</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="farm">Farm Details</TabsTrigger>
            </TabsList>

            {/* Listings Tab */}
            <TabsContent value="listings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">My Listings</h2>
                <Button>
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Add New Listing
                </Button>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockListings.map((listing) => (
                  <Card key={listing.id} className="overflow-hidden">
                    <div className="relative">
                      <img 
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-48 object-cover"
                      />
                      <Badge className={`absolute top-3 right-3 ${getStatusColor(listing.status)}`}>
                        {listing.status}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{listing.title}</h3>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-lg font-bold">₹{listing.price}/{listing.unit}</span>
                        <span className="text-sm text-muted-foreground">{listing.quantity} {listing.unit}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm text-muted-foreground">
                        <span>{listing.views} views</span>
                        <span>{listing.likes} likes</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Reviews Tab */}
            <TabsContent value="reviews" className="space-y-6">
              <h2 className="text-xl font-semibold">Customer Reviews</h2>
              
              <div className="space-y-4">
                {mockReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={review.buyerAvatar} />
                          <AvatarFallback>{review.buyerName[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{review.buyerName}</h4>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">for {review.itemTitle}</span>
                          </div>
                          <p className="text-muted-foreground">{review.comment}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Farm Details Tab */}
            <TabsContent value="farm" className="space-y-6">
              <h2 className="text-xl font-semibold">Farm Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Farm Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Farm Size</label>
                      <p className="text-lg">{mockUser.farmSize}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Response Time</label>
                      <p className="text-lg">{mockUser.responseTime}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">Crop Types</label>
                      <div className="flex flex-wrap gap-2 mt-1">
                        {mockUser.cropTypes.map((crop) => (
                          <Badge key={crop} variant="outline">{crop}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Certifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockUser.certifications.map((cert) => (
                        <div key={cert} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span>{cert}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}