import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Cloud, Sun, CloudRain, Wind, Droplets, Eye, Thermometer, 
  Compass, Sunrise, Sunset, AlertTriangle, Calendar, MapPin 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/language-context";

interface WeatherData {
  location: string;
  current: {
    temperature: number;
    condition: string;
    icon: string;
    humidity: number;
    windSpeed: number;
    windDirection: string;
    visibility: number;
    pressure: number;
    uvIndex: number;
    feels_like: number;
  };
  forecast: Array<{
    date: string;
    day: string;
    high: number;
    low: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
  hourly: Array<{
    time: string;
    temperature: number;
    condition: string;
    icon: string;
    precipitation: number;
  }>;
  alerts: Array<{
    type: string;
    message: string;
    severity: 'low' | 'medium' | 'high';
  }>;
  farming: {
    soilMoisture: string;
    pestActivity: string;
    recommendation: string;
  };
}

// Mock weather data
const mockWeatherData: WeatherData = {
  location: "Pune, Maharashtra",
  current: {
    temperature: 28,
    condition: "Partly Cloudy",
    icon: "partly-cloudy",
    humidity: 65,
    windSpeed: 12,
    windDirection: "NE",
    visibility: 10,
    pressure: 1013,
    uvIndex: 6,
    feels_like: 31
  },
  forecast: [
    {
      date: "2024-09-15",
      day: "Today",
      high: 32,
      low: 22,
      condition: "Partly Cloudy",
      icon: "partly-cloudy",
      precipitation: 20
    },
    {
      date: "2024-09-16",
      day: "Tomorrow",
      high: 29,
      low: 20,
      condition: "Light Rain",
      icon: "rain",
      precipitation: 80
    },
    {
      date: "2024-09-17",
      day: "Tuesday",
      high: 26,
      low: 19,
      condition: "Heavy Rain",
      icon: "heavy-rain",
      precipitation: 95
    },
    {
      date: "2024-09-18",
      day: "Wednesday",
      high: 25,
      low: 18,
      condition: "Cloudy",
      icon: "cloudy",
      precipitation: 40
    },
    {
      date: "2024-09-19",
      day: "Thursday",
      high: 30,
      low: 21,
      condition: "Sunny",
      icon: "sunny",
      precipitation: 5
    }
  ],
  hourly: [
    { time: "12:00", temperature: 28, condition: "Partly Cloudy", icon: "partly-cloudy", precipitation: 20 },
    { time: "13:00", temperature: 30, condition: "Sunny", icon: "sunny", precipitation: 10 },
    { time: "14:00", temperature: 32, condition: "Sunny", icon: "sunny", precipitation: 5 },
    { time: "15:00", temperature: 31, condition: "Partly Cloudy", icon: "partly-cloudy", precipitation: 15 },
    { time: "16:00", temperature: 29, condition: "Cloudy", icon: "cloudy", precipitation: 30 },
    { time: "17:00", temperature: 27, condition: "Light Rain", icon: "rain", precipitation: 70 }
  ],
  alerts: [
    {
      type: "Heavy Rain Warning",
      message: "Heavy rainfall expected for next 48 hours. Take precautions for your crops.",
      severity: "high"
    }
  ],
  farming: {
    soilMoisture: "Optimal",
    pestActivity: "Low",
    recommendation: "Good conditions for spraying pesticides. Heavy rain expected, so plan accordingly."
  }
};

export default function Weather() {
  const { t, language } = useLanguage();
  const [weatherData] = useState<WeatherData>(mockWeatherData);
  const [selectedTab, setSelectedTab] = useState<'today' | 'forecast' | 'farming'>('today');

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny':
        return <Sun className="w-8 h-8 text-yellow-500" />;
      case 'partly-cloudy':
      case 'partly cloudy':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'cloudy':
        return <Cloud className="w-8 h-8 text-gray-500" />;
      case 'light rain':
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-500" />;
      case 'heavy rain':
      case 'heavy-rain':
        return <CloudRain className="w-8 h-8 text-blue-700" />;
      default:
        return <Sun className="w-8 h-8 text-yellow-500" />;
    }
  };

  const getAlertColor = (severity: string) => {
    switch (severity) {
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center space-x-2 mb-2">
            <MapPin className="w-5 h-5 text-primary" />
            <h1 className={`text-2xl lg:text-3xl font-bold text-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {weatherData.location}
            </h1>
          </div>
          <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {language === 'ml' ? 'കാലാവസ്ഥ പ്രവചനവും കാർഷിക ഉപദേശവും' : 'Weather forecast and farming guidance'}
          </p>
        </motion.div>

        {/* Weather Alerts */}
        {weatherData.alerts.length > 0 && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {weatherData.alerts.map((alert, index) => (
              <Card key={index} className="border-l-4 border-l-red-500 bg-red-50">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <h3 className={`font-semibold text-red-800 mb-1 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {alert.type}
                      </h3>
                      <p className={`text-red-700 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Current Weather */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-gradient-to-br from-primary/10 to-secondary/10">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center space-x-4 mb-4">
                    {getWeatherIcon(weatherData.current.condition)}
                    <div>
                      <div className="text-4xl font-bold text-foreground">
                        {weatherData.current.temperature}°C
                      </div>
                      <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {weatherData.current.condition}
                      </p>
                    </div>
                  </div>
                  <p className={`text-sm text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {language === 'ml' 
                      ? `തോന്നുന്നത് ${weatherData.current.feels_like}°C പോലെ`
                      : `Feels like ${weatherData.current.feels_like}°C`
                    }
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Droplets className="w-4 h-4 text-blue-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'ml' ? 'ആർദ്രത' : 'Humidity'}
                      </div>
                      <div className="font-semibold">{weatherData.current.humidity}%</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4 text-gray-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'ml' ? 'കാറ്റ്' : 'Wind'}
                      </div>
                      <div className="font-semibold">{weatherData.current.windSpeed} km/h</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4 text-green-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {language === 'ml' ? 'ദൃശ്യത' : 'Visibility'}
                      </div>
                      <div className="font-semibold">{weatherData.current.visibility} km</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Thermometer className="w-4 h-4 text-red-500" />
                    <div>
                      <div className="text-sm text-muted-foreground">UV Index</div>
                      <div className="font-semibold">{weatherData.current.uvIndex}</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {[
              { id: 'today', label: language === 'ml' ? 'ഇന്ന്' : 'Today' },
              { id: 'forecast', label: language === 'ml' ? 'പ്രവചനം' : 'Forecast' },
              { id: 'farming', label: language === 'ml' ? 'കാർഷികം' : 'Farming' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id as any)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  selectedTab === tab.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                } ${language === 'ml' ? 'font-malayalam' : ''}`}
                data-testid={`tab-${tab.id}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={selectedTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {selectedTab === 'today' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Hourly Forecast */}
              <Card>
                <CardHeader>
                  <CardTitle className={language === 'ml' ? 'font-malayalam' : ''}>
                    {language === 'ml' ? 'മണിക്കൂറുകളിൽ' : 'Hourly Forecast'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {weatherData.hourly.map((hour, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="w-12 text-sm text-muted-foreground">{hour.time}</span>
                          {getWeatherIcon(hour.condition)}
                          <span className="font-medium">{hour.temperature}°C</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Droplets className="w-3 h-3 text-blue-500" />
                          <span className="text-sm text-muted-foreground">{hour.precipitation}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Additional Details */}
              <Card>
                <CardHeader>
                  <CardTitle className={language === 'ml' ? 'font-malayalam' : ''}>
                    {language === 'ml' ? 'വിശദാംശങ്ങൾ' : 'Details'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {language === 'ml' ? 'സൂര്യോദയം' : 'Sunrise'}
                      </span>
                      <span>6:25 AM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {language === 'ml' ? 'സൂര്യാസ്തമയം' : 'Sunset'}
                      </span>
                      <span>6:45 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {language === 'ml' ? 'വായുമർദ്ദം' : 'Pressure'}
                      </span>
                      <span>{weatherData.current.pressure} hPa</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {language === 'ml' ? 'കാറ്റിന്റെ ദിശ' : 'Wind Direction'}
                      </span>
                      <span>{weatherData.current.windDirection}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {selectedTab === 'forecast' && (
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              {weatherData.forecast.map((day, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="p-6">
                    <div className="mb-2 font-medium">{day.day}</div>
                    <div className="mb-4">
                      {getWeatherIcon(day.condition)}
                    </div>
                    <div className="space-y-1">
                      <div className="font-bold">{day.high}°</div>
                      <div className="text-muted-foreground text-sm">{day.low}°</div>
                    </div>
                    <div className="flex items-center justify-center space-x-1 mt-2">
                      <Droplets className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-muted-foreground">{day.precipitation}%</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedTab === 'farming' && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className={language === 'ml' ? 'font-malayalam' : ''}>
                    {language === 'ml' ? 'മണ്ണിന്റെ അവസ്ഥ' : 'Soil Conditions'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {language === 'ml' ? 'മണ്ണിലെ ഈർപ്പം' : 'Soil Moisture'}
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        {weatherData.farming.soilMoisture}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {language === 'ml' ? 'കീടങ്ങളുടെ പ്രവർത്തനം' : 'Pest Activity'}
                      </span>
                      <Badge className="bg-green-100 text-green-800">
                        {weatherData.farming.pestActivity}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className={language === 'ml' ? 'font-malayalam' : ''}>
                    {language === 'ml' ? 'കാർഷിക ഉപദേശം' : 'Farming Recommendation'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                    {weatherData.farming.recommendation}
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}