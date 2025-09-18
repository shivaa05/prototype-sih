import { useState } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, Calendar, Bell, Users, BarChart3, 
  Thermometer, Droplets, Sun, Wind, AlertTriangle,
  Target, Lightbulb, Trophy, Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// Mock data for innovative features
const cropHealthData = [
  { name: "Tomatoes", health: 92, status: "Excellent", issues: 0, area: "Field A" },
  { name: "Onions", health: 78, status: "Good", issues: 1, area: "Field B" },
  { name: "Rice", health: 85, status: "Good", issues: 0, area: "Field C" },
  { name: "Wheat", health: 65, status: "Moderate", issues: 2, area: "Field D" }
];

const pricePredictions = [
  { crop: "Tomato", currentPrice: 25, predictedPrice: 32, change: "+28%", trend: "up", confidence: 87 },
  { crop: "Onion", currentPrice: 20, predictedPrice: 18, change: "-10%", trend: "down", confidence: 79 },
  { crop: "Rice", currentPrice: 85, predictedPrice: 92, change: "+8%", trend: "up", confidence: 91 },
  { crop: "Wheat", currentPrice: 25, predictedPrice: 28, change: "+12%", trend: "up", confidence: 83 }
];

const weatherInsights = {
  temperature: 28,
  humidity: 65,
  rainfall: "12mm expected",
  windSpeed: "15 km/h",
  recommendation: "Perfect conditions for harvesting tomatoes. Consider applying organic fertilizer to wheat crop."
};

const harvestCalendar = [
  { crop: "Tomatoes", daysLeft: 5, status: "ready", optimal: true },
  { crop: "Onions", daysLeft: 12, status: "almost", optimal: false },
  { crop: "Rice", daysLeft: 25, status: "growing", optimal: false },
  { crop: "Wheat", daysLeft: 45, status: "early", optimal: false }
];

const smartNotifications = [
  { 
    id: 1, 
    type: "warning", 
    title: "Disease Alert", 
    message: "Early blight detected in tomato crop - Field A", 
    time: "5 mins ago",
    urgent: true 
  },
  { 
    id: 2, 
    type: "info", 
    title: "Weather Update", 
    message: "Heavy rainfall expected tomorrow. Protect sensitive crops.", 
    time: "1 hour ago",
    urgent: false 
  },
  { 
    id: 3, 
    type: "success", 
    title: "Price Alert", 
    message: "Tomato prices increased by 15% in nearby markets", 
    time: "2 hours ago",
    urgent: false 
  }
];

const communityPosts = [
  {
    id: 1,
    author: "Rajesh K.",
    title: "Best practices for organic tomato farming?",
    replies: 12,
    likes: 24,
    time: "2 hours ago",
    category: "Organic Farming"
  },
  {
    id: 2,
    author: "Priya S.",
    title: "Dealing with pest control in monsoon season",
    replies: 8,
    likes: 16,
    time: "4 hours ago", 
    category: "Pest Control"
  },
  {
    id: 3,
    author: "Amit P.",
    title: "Market prices in Pune - Weekly update",
    replies: 15,
    likes: 31,
    time: "6 hours ago",
    category: "Market Info"
  }
];

export function CropHealthDashboard() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-green-600" />
          <span>Crop Health Monitor</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {cropHealthData.map((crop) => (
            <div key={crop.name} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{crop.name}</span>
                  <Badge variant={crop.health > 80 ? "default" : crop.health > 60 ? "secondary" : "destructive"}>
                    {crop.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <Progress value={crop.health} className="flex-1" />
                  <span className="text-sm font-medium">{crop.health}%</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{crop.area}</span>
                  <span>{crop.issues} issues detected</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function PricePredictionAnalytics() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span>AI Price Predictions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {pricePredictions.map((prediction) => (
            <div key={prediction.crop} className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{prediction.crop}</span>
                <Badge variant={prediction.trend === "up" ? "default" : "destructive"}>
                  {prediction.change}
                </Badge>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Current: ₹{prediction.currentPrice}</span>
                  <span>Predicted: ₹{prediction.predictedPrice}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Progress value={prediction.confidence} className="flex-1" />
                  <span className="text-xs">{prediction.confidence}% confidence</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function WeatherInsights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Sun className="w-5 h-5 text-yellow-600" />
          <span>Smart Weather Insights</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2">
            <Thermometer className="w-4 h-4 text-red-500" />
            <span className="text-sm">{weatherInsights.temperature}°C</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <span className="text-sm">{weatherInsights.humidity}%</span>
          </div>
          <div className="flex items-center space-x-2">
            <Droplets className="w-4 h-4 text-cyan-500" />
            <span className="text-sm">{weatherInsights.rainfall}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-gray-500" />
            <span className="text-sm">{weatherInsights.windSpeed}</span>
          </div>
        </div>
        <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <div className="flex items-start space-x-2">
            <Lightbulb className="w-4 h-4 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {weatherInsights.recommendation}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function HarvestCalendar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <span>Harvest Calendar</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {harvestCalendar.map((item) => (
            <div key={item.crop} className="flex items-center justify-between p-2 border rounded">
              <div>
                <span className="font-medium text-sm">{item.crop}</span>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant={item.optimal ? "default" : "outline"} className="text-xs">
                    {item.status}
                  </Badge>
                  {item.optimal && <Target className="w-3 h-3 text-green-600" />}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium">{item.daysLeft} days</span>
                <p className="text-xs text-muted-foreground">remaining</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function SmartNotifications() {
  const [notifications, setNotifications] = useState(smartNotifications);

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Bell className="w-5 h-5 text-orange-600" />
          <span>Smart Alerts</span>
          {notifications.filter(n => n.urgent).length > 0 && (
            <Badge className="bg-red-600 text-white">
              {notifications.filter(n => n.urgent).length} urgent
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`p-3 border rounded-lg ${
                notification.urgent ? 'border-red-200 bg-red-50 dark:bg-red-950' : 'border-border'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    {notification.type === 'warning' && <AlertTriangle className="w-4 h-4 text-orange-600" />}
                    {notification.type === 'success' && <Trophy className="w-4 h-4 text-green-600" />}
                    {notification.type === 'info' && <Bell className="w-4 h-4 text-blue-600" />}
                    <span className="font-medium text-sm">{notification.title}</span>
                    {notification.urgent && <Badge className="bg-red-600 text-white text-xs">Urgent</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Clock className="w-3 h-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">{notification.time}</span>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => dismissNotification(notification.id)}
                  className="ml-2"
                >
                  ×
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function CommunityForum() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-green-600" />
          <span>Farmer Community</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {communityPosts.map((post) => (
            <div key={post.id} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-medium text-sm mb-1">{post.title}</h4>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>by {post.author}</span>
                    <span>{post.time}</span>
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.replies} replies</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>{post.likes} likes</span>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Join Discussion
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function InnovativeFeatures() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <CropHealthDashboard />
      <WeatherInsights />
      <HarvestCalendar />
      <PricePredictionAnalytics />
      <SmartNotifications />
      <CommunityForum />
    </div>
  );
}