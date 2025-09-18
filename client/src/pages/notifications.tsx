import { useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Cloud, DollarSign, Sprout, Calendar, Bell, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { useLanguage } from "@/context/language-context";

interface Notification {
  id: string;
  type: 'weather' | 'government' | 'market' | 'farming' | 'alert';
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
  urgency: 'low' | 'medium' | 'high';
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'weather',
    title: 'Heavy Rain Alert',
    message: 'Heavy rainfall expected in your area for the next 3 days. Take necessary precautions for your crops.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    isRead: false,
    urgency: 'high'
  },
  {
    id: '2',
    type: 'government',
    title: 'New Subsidy Scheme',
    message: 'Government has launched new fertilizer subsidy scheme. Apply before March 31st to avail benefits.',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000),
    isRead: false,
    urgency: 'medium'
  },
  {
    id: '3',
    type: 'market',
    title: 'Price Alert: Tomatoes',
    message: 'Tomato prices have increased by 25% in your local market. Good time to sell your harvest.',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000),
    isRead: true,
    urgency: 'medium'
  },
  {
    id: '4',
    type: 'farming',
    title: 'Pest Control Reminder',
    message: 'It\'s time to apply pest control measures for your cotton crop. Check our farming calendar for details.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    isRead: false,
    urgency: 'low'
  }
];

export default function Notifications() {
  const { t, language } = useLanguage();
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'weather':
        return <Cloud className="w-5 h-5 text-blue-500" />;
      case 'government':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'market':
        return <DollarSign className="w-5 h-5 text-green-500" />;
      case 'farming':
        return <Sprout className="w-5 h-5 text-green-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getUrgencyColor = (urgency: Notification['urgency']) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - timestamp.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return language === 'ml' ? 'ഇപ്പോൾ' : 'Just now';
    if (diffInHours < 24) return language === 'ml' ? `${diffInHours} മണിക്കൂർ മുമ്പ്` : `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return language === 'ml' ? `${diffInDays} ദിവസം മുമ്പ്` : `${diffInDays}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-2xl lg:text-3xl font-bold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {language === 'ml' ? 'അറിയിപ്പുകൾ' : 'Notifications'}
              </h1>
              <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                {language === 'ml' 
                  ? `${unreadCount} പുതിയ അറിയിപ്പുകൾ`
                  : `${unreadCount} unread notifications`
                }
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
              className={language === 'ml' ? 'font-malayalam' : ''}
              data-testid="mark-all-read"
            >
              {language === 'ml' ? 'എല്ലാം വായിച്ചതായി അടയാളപ്പെടുത്തുക' : 'Mark all as read'}
            </Button>
          </div>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {notifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`cursor-pointer hover:shadow-md transition-all duration-200 ${
                !notification.isRead ? 'border-primary/50 bg-primary/5' : 'border-border'
              }`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`font-semibold text-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
                            {notification.title}
                          </h3>
                          <Badge className={getUrgencyColor(notification.urgency)}>
                            {notification.urgency}
                          </Badge>
                          {!notification.isRead && (
                            <Badge className="bg-blue-500 text-white">
                              {language === 'ml' ? 'പുതിയത്' : 'New'}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-muted-foreground mb-3 ${language === 'ml' ? 'font-malayalam' : ''}`}>
                          {notification.message}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            {formatTime(notification.timestamp)}
                          </span>
                          <div className="flex space-x-2">
                            {!notification.isRead && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  markAsRead(notification.id);
                                }}
                                className={`text-xs ${language === 'ml' ? 'font-malayalam' : ''}`}
                                data-testid={`mark-read-${notification.id}`}
                              >
                                {language === 'ml' ? 'വായിച്ചു' : 'Mark as read'}
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteNotification(notification.id);
                              }}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                              data-testid={`delete-${notification.id}`}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {notifications.length === 0 && (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className={`text-xl font-semibold text-foreground mb-2 ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' ? 'അറിയിപ്പുകളില്ല' : 'No notifications'}
            </h3>
            <p className={`text-muted-foreground ${language === 'ml' ? 'font-malayalam' : ''}`}>
              {language === 'ml' 
                ? 'നിങ്ങൾക്ക് പുതിയ അറിയിപ്പുകളൊന്നുമില്ല'
                : 'You have no new notifications at the moment'
              }
            </p>
          </motion.div>
        )}
      </div>

      <Footer />
    </div>
  );
}