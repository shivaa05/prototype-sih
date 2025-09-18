import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Sprout, Droplets, Bug, Thermometer, Sun, Leaf, Clock, Star, Cloud } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/language-context";

interface CropActivity {
  id: string;
  crop: string;
  activity: string;
  month: string;
  season: 'kharif' | 'rabi' | 'zaid';
  importance: 'high' | 'medium' | 'low';
  description: string;
  tips: string[];
}

interface FarmingTip {
  id: string;
  category: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  season?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

const mockCropActivities: CropActivity[] = [
  {
    id: '1',
    crop: 'Rice',
    activity: 'Land Preparation',
    month: 'June',
    season: 'kharif',
    importance: 'high',
    description: 'Prepare paddy fields for kharif rice cultivation',
    tips: [
      'Deep ploughing to break hardpan',
      'Apply organic manure 15 days before sowing',
      'Ensure proper drainage channels'
    ]
  },
  {
    id: '2',
    crop: 'Wheat',
    activity: 'Sowing Time',
    month: 'November',
    season: 'rabi',
    importance: 'high',
    description: 'Optimal time for wheat sowing in Maharashtra',
    tips: [
      'Use certified seeds with 85% germination',
      'Maintain row spacing of 18-23 cm',
      'Apply basal fertilizers before sowing'
    ]
  },
  {
    id: '3',
    crop: 'Cotton',
    activity: 'Pest Control',
    month: 'August',
    season: 'kharif',
    importance: 'high',
    description: 'Critical pest control period for cotton',
    tips: [
      'Monitor for bollworm infestation',
      'Use pheromone traps for early detection',
      'Apply neem-based pesticides as first option'
    ]
  },
  {
    id: '4',
    crop: 'Sugarcane',
    activity: 'Irrigation',
    month: 'April',
    season: 'zaid',
    importance: 'medium',
    description: 'Summer irrigation schedule for sugarcane',
    tips: [
      'Irrigate every 7-10 days in summer',
      'Use drip irrigation to save water',
      'Mulching helps retain soil moisture'
    ]
  }
];

const mockFarmingTips: FarmingTip[] = [
  {
    id: '1',
    category: 'Soil Health',
    title: 'Organic Matter Enhancement',
    description: 'Improve soil fertility by adding organic matter regularly to boost crop yields.',
    icon: <Leaf className="w-6 h-6 text-green-500" />,
    difficulty: 'beginner'
  },
  {
    id: '2',
    category: 'Water Management',
    title: 'Efficient Irrigation Techniques',
    description: 'Learn drip irrigation and mulching techniques to conserve water effectively.',
    icon: <Droplets className="w-6 h-6 text-blue-500" />,
    difficulty: 'intermediate'
  },
  {
    id: '3',
    category: 'Pest Control',
    title: 'Integrated Pest Management',
    description: 'Natural pest control methods using beneficial insects and organic pesticides.',
    icon: <Bug className="w-6 h-6 text-orange-500" />,
    difficulty: 'advanced'
  },
  {
    id: '4',
    category: 'Weather',
    title: 'Climate-Smart Farming',
    description: 'Adapt farming practices based on weather patterns and climate change.',
    icon: <Cloud className="w-6 h-6 text-purple-500" />,
    difficulty: 'intermediate'
  }
];

export default function FarmingTips() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'calendar' | 'tips'>('calendar');
  const [selectedSeason, setSelectedSeason] = useState<'all' | 'kharif' | 'rabi' | 'zaid'>('all');

  const filteredActivities = selectedSeason === 'all' 
    ? mockCropActivities 
    : mockCropActivities.filter(activity => activity.season === selectedSeason);

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-2xl lg:text-3xl font-bold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {language === 'ml' ? 'കാർഷിക കലണ്ടറും നുറുങ്ങുകളും' : 'Farming Calendar & Tips'}
          </h1>
          <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {language === 'ml' 
              ? 'വിളകളുടെ കലണ്ടറും പ്രായോഗിക കാർഷിക നുറുങ്ങുകളും'
              : 'Crop calendar and practical farming tips for better yields'
            }
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg max-w-md mx-auto">
            {[
              { id: 'calendar', label: language === 'ml' ? 'കാർഷിക കലണ്ടർ' : 'Crop Calendar', icon: Calendar },
              { id: 'tips', label: language === 'ml' ? 'നുറുങ്ങുകൾ' : 'Tips', icon: Sprout }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                } ${language === 'ml' ? 'font-malayalam' : ''}`}
                data-testid={`tab-${tab.id}`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'calendar' && (
            <div>
              {/* Season Filter */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    { id: 'all', label: language === 'ml' ? 'എല്ലാം' : 'All Seasons' },
                    { id: 'kharif', label: language === 'ml' ? 'ഖരീഫ്' : 'Kharif (Jun-Oct)' },
                    { id: 'rabi', label: language === 'ml' ? 'റബി' : 'Rabi (Nov-Apr)' },
                    { id: 'zaid', label: language === 'ml' ? 'സൈദ്' : 'Zaid (Apr-Jun)' }
                  ].map((season) => (
                    <Button
                      key={season.id}
                      variant={selectedSeason === season.id ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSeason(season.id as any)}
                      className={language === 'ml' ? 'font-malayalam' : ''}
                      data-testid={`season-${season.id}`}
                    >
                      {season.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Calendar Activities */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="hover:shadow-lg transition-all duration-200 h-full">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge className={getImportanceColor(activity.importance)}>
                            {activity.importance}
                          </Badge>
                          <span className="text-sm text-muted-foreground">{activity.month}</span>
                        </div>
                        <CardTitle className={`text-lg ${language === 'ml' ? 'font-malayalam' : ''}`}>
                          {activity.crop} - {activity.activity}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-muted-foreground mb-4 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                          {activity.description}
                        </p>
                        <div className="space-y-2">
                          <h4 className={`font-medium text-sm ${language === 'ml' ? 'font-malayalam' : ''}`}>
                            {language === 'ml' ? 'നുറുങ്ങുകൾ:' : 'Tips:'}
                          </h4>
                          <ul className="space-y-1">
                            {activity.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className={`text-sm text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                                • {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="grid md:grid-cols-2 gap-6">
              {mockFarmingTips.map((tip, index) => (
                <motion.div
                  key={tip.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-200 h-full">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-muted rounded-lg">
                            {tip.icon}
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-2">
                              {tip.category}
                            </Badge>
                            <CardTitle className={`text-lg ${language === 'ml' ? 'font-malayalam' : ''}`}>
                              {tip.title}
                            </CardTitle>
                          </div>
                        </div>
                        <Badge className={getDifficultyColor(tip.difficulty)}>
                          {tip.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {tip.description}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={`mt-4 w-full ${language === 'ml' ? 'font-malayalam' : ''}`}
                        data-testid={`learn-more-${tip.id}`}
                      >
                        {language === 'ml' ? 'കൂടുതൽ അറിയുക' : 'Learn More'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {filteredActivities.length === 0 && activeTab === 'calendar' && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className={`text-xl font-semibold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' ? 'പ്രവർത്തനങ്ങളൊന്നുമില്ല' : 'No activities found'}
            </h3>
            <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' 
                ? 'തിരഞ്ഞെടുത്ത സീസണിൽ പ്രവർത്തനങ്ങളൊന്നുമില്ല'
                : 'No activities found for the selected season'
              }
            </p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}