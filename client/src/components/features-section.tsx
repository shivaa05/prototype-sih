import { motion } from "framer-motion";
import { CloudRain, Leaf, TrendingUp, Building2, Brain, ArrowRight } from "lucide-react";

const features = [
  {
    icon: CloudRain,
    title: "Weather Forecasting & Alerts",
    description: "Get accurate 7-day weather forecasts, rainfall predictions, and severe weather alerts tailored to your location.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Leaf,
    title: "Crop Advisory",
    description: "Receive personalized crop recommendations, planting schedules, and farming best practices for your region.",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: TrendingUp,
    title: "Market Insights & Mandi Prices",
    description: "Stay updated with real-time commodity prices, market trends, and optimal selling times for maximum profit.",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    icon: Building2,
    title: "Government Schemes & Subsidies",
    description: "Discover available government schemes, subsidies, and financial assistance programs for farmers.",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    icon: Brain,
    title: "AI Mode – Disease Detection",
    description: "Upload plant images for instant AI-powered disease detection with treatment recommendations.",
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comprehensive Farming Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to make informed farming decisions, increase productivity, and maximize profits.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-card rounded-2xl p-8 shadow-lg card-hover border border-border group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.02 }}
              data-testid={`feature-card-${index}`}
            >
              <div className={`w-16 h-16 ${feature.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className={`w-8 h-8 ${feature.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">
                {feature.description}
              </p>
              <div className="flex items-center text-primary font-medium group-hover:translate-x-2 transition-transform duration-300">
                <span>Learn more</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
