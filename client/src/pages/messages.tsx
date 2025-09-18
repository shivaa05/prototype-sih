import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Send, Phone, Video, MoreVertical, ArrowLeft, Star, MapPin, Users, Sprout } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/context/language-context";

interface User {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  location: string;
  isOnline: boolean;
}

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: Date;
  type: "text" | "offer" | "image";
  metadata?: {
    offerPrice?: number;
    quantity?: number;
    unit?: string;
    imageUrl?: string;
  };
}

interface Conversation {
  id: string;
  participant: User;
  lastMessage: Message;
  unreadCount: number;
  type: "marketplace" | "farming" | "community";
  itemTitle?: string;
  itemImage?: string;
  itemPrice?: number;
  topic?: string;
  groupName?: string;
  memberCount?: number;
}

const mockUsers: User[] = [
  {
    id: "user1",
    name: "Rajesh Kumar",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    rating: 4.8,
    location: "Pune, Maharashtra",
    isOnline: true
  },
  {
    id: "user2", 
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616c0763a5b?w=100&h=100&fit=crop&crop=face",
    rating: 4.9,
    location: "Amritsar, Punjab",
    isOnline: false
  },
  {
    id: "user3",
    name: "Amit Patel",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    rating: 4.6,
    location: "Nashik, Maharashtra", 
    isOnline: true
  }
];

const mockConversations: Conversation[] = [
  {
    id: "conv1",
    participant: mockUsers[0],
    type: "marketplace",
    lastMessage: {
      id: "msg1",
      senderId: "user1",
      content: "The tomatoes are still fresh. I can arrange delivery by tomorrow morning.",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      type: "text"
    },
    unreadCount: 2,
    itemTitle: "Fresh Organic Tomatoes",
    itemImage: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=200&h=200&fit=crop",
    itemPrice: 25
  },
  {
    id: "conv2",
    participant: mockUsers[1],
    type: "farming",
    lastMessage: {
      id: "msg2",
      senderId: "user2",
      content: "Try using neem oil spray every 3 days. It worked wonders for my cotton crop!",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      type: "text"
    },
    unreadCount: 1,
    topic: "Pest Control in Cotton"
  },
  {
    id: "conv3", 
    participant: mockUsers[2],
    type: "marketplace",
    lastMessage: {
      id: "msg3",
      senderId: "user3",
      content: "I can offer ₹35/kg for immediate pickup. Deal?",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      type: "offer",
      metadata: {
        offerPrice: 35,
        quantity: 20,
        unit: "kg"
      }
    },
    unreadCount: 1,
    itemTitle: "Fresh Green Chilies",
    itemImage: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&h=200&fit=crop",
    itemPrice: 40
  },
  {
    id: "conv4",
    participant: {
      id: "community1",
      name: "Maharashtra Farmers",
      avatar: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=100&h=100&fit=crop",
      rating: 0,
      location: "Maharashtra",
      isOnline: true
    },
    type: "community",
    lastMessage: {
      id: "msg4",
      senderId: "user5",
      content: "Weather report says heavy rain next week. Better harvest early!",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      type: "text"
    },
    unreadCount: 3,
    groupName: "Maharashtra Farmers",
    memberCount: 1247
  }
];

const mockMessages: { [key: string]: Message[] } = {
  "conv1": [
    {
      id: "1",
      senderId: "current-user",
      content: "Hi! I'm interested in your organic tomatoes. Are they still available?",
      timestamp: new Date(Date.now() - 1800000),
      type: "text"
    },
    {
      id: "2", 
      senderId: "user1",
      content: "Yes, they are! Fresh harvest from yesterday. How much quantity do you need?",
      timestamp: new Date(Date.now() - 1500000),
      type: "text"
    },
    {
      id: "3",
      senderId: "current-user", 
      content: "I need about 25kg for my restaurant. Can you deliver to Baner area?",
      timestamp: new Date(Date.now() - 1200000),
      type: "text"
    },
    {
      id: "4",
      senderId: "user1",
      content: "Perfect! I can deliver 25kg for ₹625 total. Delivery charge is ₹50 extra for Baner.",
      timestamp: new Date(Date.now() - 900000),
      type: "text"
    },
    {
      id: "5",
      senderId: "user1",
      content: "The tomatoes are still fresh. I can arrange delivery by tomorrow morning.",
      timestamp: new Date(Date.now() - 300000),
      type: "text"
    }
  ]
};

export default function Messages() {
  const { t, language } = useLanguage();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<'all' | 'marketplace' | 'farming' | 'community'>('all');
  const [conversations] = useState(mockConversations);

  const currentConversation = selectedConversation 
    ? conversations.find(c => c.id === selectedConversation)
    : null;

  const currentMessages = selectedConversation 
    ? mockMessages[selectedConversation] || []
    : [];

  const filteredConversations = conversations.filter(conv => {
    const matchesSearch = 
      conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.itemTitle?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.groupName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === 'all' || conv.type === activeTab;
    
    return matchesSearch && matchesTab;
  });

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    
    // In a real app, this would send the message to the backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    
    if (diff < 60000) return "Just now";
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return timestamp.toLocaleDateString();
  };

  const renderMessageContent = (message: Message) => {
    if (message.type === "offer" && message.metadata) {
      return (
        <div className="bg-accent/20 border border-accent/30 rounded-lg p-3 mt-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-accent">Price Offer</p>
              <p className="text-sm">₹{message.metadata.offerPrice}/{message.metadata.unit} for {message.metadata.quantity}{message.metadata.unit}</p>
            </div>
            <div className="space-x-2">
              <Button size="sm" variant="outline">Decline</Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90">Accept</Button>
            </div>
          </div>
        </div>
      );
    }
    
    return <p className="whitespace-pre-wrap">{message.content}</p>;
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />
      
      <div className="flex-1 flex h-[calc(100vh-4rem)]">
        {/* Conversations List */}
        <div className={`w-full lg:w-96 border-r border-border flex flex-col ${selectedConversation ? 'hidden lg:flex' : 'flex'}`}>
          {/* Search Header */}
          <div className="p-4 border-b border-border">
            <h1 className={`text-xl font-semibold mb-4 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' ? 'സന്ദേശങ്ങൾ' : 'Messages'}
            </h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === 'ml' ? 'സംഭാഷണങ്ങൾ തിരയുക...' : 'Search conversations...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                data-testid="search-conversations"
              />
            </div>

            {/* Tabs */}
            <div className="px-4 py-2 border-b border-border">
              <div className="flex space-x-1 bg-muted p-1 rounded-lg">
                {[
                  { id: 'all', label: language === 'ml' ? 'എല്ലാം' : 'All' },
                  { id: 'marketplace', label: language === 'ml' ? 'മാർക്കറ്റ്' : 'Market' },
                  { id: 'farming', label: language === 'ml' ? 'കൃഷി' : 'Farming' },
                  { id: 'community', label: language === 'ml' ? 'കമ്മ്യൂണിറ്റി' : 'Groups' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
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
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto">
            {filteredConversations.map((conversation) => (
              <motion.div
                key={conversation.id}
                className={`p-4 cursor-pointer border-b border-border hover:bg-muted/50 transition-colors ${
                  selectedConversation === conversation.id ? 'bg-muted' : ''
                }`}
                onClick={() => setSelectedConversation(conversation.id)}
                whileHover={{ x: 4 }}
                data-testid={`conversation-${conversation.id}`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={conversation.participant.avatar} />
                      <AvatarFallback>{conversation.participant.name[0]}</AvatarFallback>
                    </Avatar>
                    {conversation.participant.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-background rounded-full" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-medium text-sm truncate">{conversation.participant.name}</h3>
                      <span className="text-xs text-muted-foreground">{formatTime(conversation.lastMessage.timestamp)}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1 mb-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs text-muted-foreground">{conversation.participant.rating}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <MapPin className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{conversation.participant.location.split(',')[0]}</span>
                    </div>

                    {conversation.type === 'marketplace' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <img 
                          src={conversation.itemImage}
                          alt={conversation.itemTitle}
                          className="w-6 h-6 rounded object-cover"
                        />
                        <span className="text-xs text-muted-foreground truncate flex-1">{conversation.itemTitle}</span>
                        <span className="text-xs font-medium">₹{conversation.itemPrice}</span>
                      </div>
                    )}
                    
                    {conversation.type === 'farming' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Sprout className="w-4 h-4 text-green-500" />
                        <span className={`text-xs text-muted-foreground truncate flex-1 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                          {conversation.topic}
                        </span>
                      </div>
                    )}
                    
                    {conversation.type === 'community' && (
                      <div className="flex items-center space-x-2 mb-2">
                        <Users className="w-4 h-4 text-blue-500" />
                        <span className={`text-xs text-muted-foreground truncate flex-1 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                          {conversation.memberCount} {language === 'ml' ? 'അംഗങ്ങൾ' : 'members'}
                        </span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate flex-1">
                        {conversation.lastMessage.type === "offer" ? "💰 Price offer" : conversation.lastMessage.content}
                      </p>
                      {conversation.unreadCount > 0 && (
                        <Badge className="bg-primary text-primary-foreground text-xs ml-2">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`flex-1 flex flex-col ${selectedConversation ? 'flex' : 'hidden lg:flex'}`}>
          {selectedConversation && currentConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between bg-card">
                <div className="flex items-center space-x-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="lg:hidden"
                    onClick={() => setSelectedConversation(null)}
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                  
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentConversation.participant.avatar} />
                    <AvatarFallback>{currentConversation.participant.name[0]}</AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h2 className="font-semibold">{currentConversation.participant.name}</h2>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{currentConversation.participant.rating}</span>
                      </div>
                      <span>•</span>
                      <span>{currentConversation.participant.location}</span>
                      {currentConversation.participant.isOnline && (
                        <>
                          <span>•</span>
                          <span className="text-green-600">Online</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Video className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <MoreVertical className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Context Bar */}
              {currentConversation.type === 'marketplace' && (
                <div className="p-3 bg-muted/30 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={currentConversation.itemImage}
                      alt={currentConversation.itemTitle}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className={`font-medium text-sm ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {currentConversation.itemTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground">₹{currentConversation.itemPrice}/kg</p>
                    </div>
                    <Button variant="outline" size="sm" className={language === 'ml' ? 'font-malayalam' : ''}>
                      {language === 'ml' ? 'ഇനം കാണുക' : 'View Item'}
                    </Button>
                  </div>
                </div>
              )}
              
              {currentConversation.type === 'farming' && (
                <div className="p-3 bg-green-50 dark:bg-green-950/20 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-800 rounded-lg flex items-center justify-center">
                      <Sprout className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium text-sm ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {currentConversation.topic}
                      </h3>
                      <p className={`text-sm text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {language === 'ml' ? 'കാർഷിക ചർച്ച' : 'Farming Discussion'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {currentConversation.type === 'community' && (
                <div className="p-3 bg-blue-50 dark:bg-blue-950/20 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-medium text-sm ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {currentConversation.groupName}
                      </h3>
                      <p className={`text-sm text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                        {currentConversation.memberCount} {language === 'ml' ? 'അംഗങ്ങൾ' : 'members'}
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className={language === 'ml' ? 'font-malayalam' : ''}>
                      {language === 'ml' ? 'ഗ്രൂപ്പ് വിവരം' : 'Group Info'}
                    </Button>
                  </div>
                </div>
              )}

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {currentMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div className={`max-w-[70%] ${
                      message.senderId === 'current-user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border'
                    } rounded-2xl p-3`}>
                      {renderMessageContent(message)}
                      <p className={`text-xs mt-1 ${
                        message.senderId === 'current-user' 
                          ? 'text-primary-foreground/70' 
                          : 'text-muted-foreground'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border bg-card">
                <div className="flex items-center space-x-3">
                  <Input
                    type="text"
                    placeholder={language === 'ml' ? 'സന്ദേശം ടൈപ്പ് ചെയ്യുക...' : 'Type a message...'}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className={`flex-1 ${language === 'ml' ? 'font-malayalam' : ''}`}
                    data-testid="message-input"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    data-testid="send-message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* No Conversation Selected */
            <div className="flex-1 flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">💬</div>
                <h3 className={`text-xl font-semibold mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {language === 'ml' ? 'ഒരു സംഭാഷണം തിരഞ്ഞെടുക്കുക' : 'Select a conversation'}
                </h3>
                <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                  {language === 'ml' 
                    ? 'സന്ദേശമയയ്ക്കൽ ആരംഭിക്കാൻ ലിസ്റ്റിൽ നിന്ന് ഒരു സംഭാഷണം തിരഞ്ഞെടുക്കുക'
                    : 'Choose a conversation from the list to start messaging'
                  }
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}