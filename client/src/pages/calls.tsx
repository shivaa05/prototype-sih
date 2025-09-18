import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, PhoneCall, PhoneOff, Video, Mic, MicOff, Clock, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/language-context";

interface CallContact {
  id: string;
  name: string;
  avatar: string;
  specialty: string;
  location: string;
  rating: number;
  isOnline: boolean;
  lastCall?: Date;
}

interface CallHistory {
  id: string;
  contactId: string;
  contactName: string;
  type: 'incoming' | 'outgoing' | 'missed';
  duration?: number;
  timestamp: Date;
}

const mockContacts: CallContact[] = [
  {
    id: '1',
    name: 'Dr. Rajesh Kumar',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
    specialty: 'Crop Disease Expert',
    location: 'Mumbai, Maharashtra',
    rating: 4.8,
    isOnline: true,
    lastCall: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: '2',
    name: 'Priya Sharma',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616c0763a5b?w=100&h=100&fit=crop&crop=face',
    specialty: 'Organic Farming Consultant',
    location: 'Pune, Maharashtra',
    rating: 4.9,
    isOnline: false,
    lastCall: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  },
  {
    id: '3',
    name: 'Amit Patel',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    specialty: 'Soil Health Specialist',
    location: 'Nashik, Maharashtra',
    rating: 4.7,
    isOnline: true,
    lastCall: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
  }
];

const mockCallHistory: CallHistory[] = [
  {
    id: '1',
    contactId: '1',
    contactName: 'Dr. Rajesh Kumar',
    type: 'outgoing',
    duration: 1245, // seconds
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
  },
  {
    id: '2',
    contactId: '3',
    contactName: 'Amit Patel',
    type: 'incoming',
    duration: 890,
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)
  },
  {
    id: '3',
    contactId: '2',
    contactName: 'Priya Sharma',
    type: 'missed',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000)
  }
];

export default function Calls() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'contacts' | 'history'>('contacts');
  const [searchQuery, setSearchQuery] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [currentCall, setCurrentCall] = useState<CallContact | null>(null);

  const filteredContacts = mockContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatCallTime = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60));
      return language === 'ml' ? `${diffInMinutes} മിനിറ്റ് മുമ്പ്` : `${diffInMinutes}m ago`;
    }
    if (diffInHours < 24) {
      return language === 'ml' ? `${diffInHours} മണിക്കൂർ മുമ്പ്` : `${diffInHours}h ago`;
    }
    const diffInDays = Math.floor(diffInHours / 24);
    return language === 'ml' ? `${diffInDays} ദിവസം മുമ്പ്` : `${diffInDays}d ago`;
  };

  const initiateCall = (contact: CallContact) => {
    setCurrentCall(contact);
    setIsInCall(true);
  };

  const endCall = () => {
    setIsInCall(false);
    setCurrentCall(null);
  };

  const getCallTypeIcon = (type: CallHistory['type']) => {
    switch (type) {
      case 'incoming':
        return <PhoneCall className="w-4 h-4 text-green-500" />;
      case 'outgoing':
        return <PhoneCall className="w-4 h-4 text-blue-500" />;
      case 'missed':
        return <PhoneCall className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      {/* Active Call Overlay */}
      {isInCall && currentCall && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="w-96 text-center">
            <CardContent className="p-8">
              <div className="mb-6">
                <img
                  src={currentCall.avatar}
                  alt={currentCall.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className={`text-xl font-bold ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {currentCall.name}
                </h2>
                <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {currentCall.specialty}
                </p>
              </div>
              
              <div className="flex justify-center space-x-4 mb-6">
                <Button variant="outline" size="lg" className="rounded-full w-12 h-12 p-0">
                  <Mic className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full w-12 h-12 p-0">
                  <Video className="w-5 h-5" />
                </Button>
              </div>
              
              <Button 
                onClick={endCall}
                className="bg-red-500 hover:bg-red-600 text-white rounded-full w-16 h-16 p-0"
                data-testid="end-call-button"
              >
                <PhoneOff className="w-8 h-8" />
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className={`text-2xl lg:text-3xl font-bold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {language === 'ml' ? 'കോൾകൾ' : 'Calls'}
          </h1>
          <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
            {language === 'ml' 
              ? 'കാർഷിക വിദഗ്ധരുമായി ബന്ധപ്പെടുക'
              : 'Connect with farming experts and other farmers'
            }
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder={language === 'ml' ? 'വിദഗ്ധരെ തിരയുക...' : 'Search experts...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              data-testid="search-contacts"
            />
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {[
              { id: 'contacts', label: language === 'ml' ? 'വിദഗ്ധർ' : 'Experts' },
              { id: 'history', label: language === 'ml' ? 'കോൾ ചരിത്രം' : 'Call History' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  activeTab === tab.id
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
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'contacts' && (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredContacts.map((contact, index) => (
                <motion.div
                  key={contact.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-all duration-200">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={contact.avatar}
                            alt={contact.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          {contact.isOnline && (
                            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className={`font-semibold ${language === 'ml' ? 'font-malayalam' : ''}`}>
                              {contact.name}
                            </h3>
                            <Badge className="bg-primary/10 text-primary">
                              ⭐ {contact.rating}
                            </Badge>
                          </div>
                          
                          <p className={`text-sm text-muted-foreground mb-1 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                            {contact.specialty}
                          </p>
                          <p className={`text-xs text-muted-foreground mb-3 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                            {contact.location}
                          </p>

                          {contact.lastCall && (
                            <p className={`text-xs text-muted-foreground mb-3 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                              {language === 'ml' ? 'അവസാന കോൾ: ' : 'Last call: '} 
                              {formatCallTime(contact.lastCall)}
                            </p>
                          )}

                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              onClick={() => initiateCall(contact)}
                              className="flex-1"
                              disabled={!contact.isOnline}
                              data-testid={`call-${contact.id}`}
                            >
                              <Phone className="w-4 h-4 mr-2" />
                              {contact.isOnline 
                                ? (language === 'ml' ? 'കോൾ ചെയ്യുക' : 'Call')
                                : (language === 'ml' ? 'ഓഫ്‌ലൈൻ' : 'Offline')
                              }
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <Card>
              <CardHeader>
                <CardTitle className={language === 'ml' ? 'font-malayalam' : ''}>
                  {language === 'ml' ? 'കോൾ ചരിത്രം' : 'Call History'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCallHistory.map((call, index) => (
                    <motion.div
                      key={call.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 hover:bg-muted/50 rounded-lg transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {getCallTypeIcon(call.type)}
                        <div>
                          <div className={`font-medium ${language === 'ml' ? 'font-malayalam' : ''}`}>
                            {call.contactName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatCallTime(call.timestamp)}
                            {call.duration && (
                              <span> • {formatDuration(call.duration)}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <Button size="sm" variant="ghost">
                        <Phone className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </motion.div>

        {filteredContacts.length === 0 && activeTab === 'contacts' && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Phone className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className={`text-xl font-semibold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' ? 'വിദഗ്ധരെ കണ്ടെത്തിയില്ല' : 'No experts found'}
            </h3>
            <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' 
                ? 'മറ്റ് തിരയൽ പദങ്ങൾ ഉപയോഗിച്ച് ശ്രമിക്കുക'
                : 'Try searching with different keywords'
              }
            </p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}