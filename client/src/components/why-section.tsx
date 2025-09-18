import { motion } from "framer-motion";
import { Globe, WifiOff, ShieldCheck, Star, Heart } from "lucide-react";

const benefits = [
  {
    icon: Globe,
    title: "Local Language Support",
    description: "Available in Hindi, Telugu, Tamil, Punjabi, and other regional languages for better understanding.",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: WifiOff,
    title: "Offline Friendly",
    description: "Core features work offline, ensuring you have access to important information even without internet.",
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    icon: ShieldCheck,
    title: "Trusted & Secure",
    description: "Data privacy focused with secure connections. Trusted by over 50,000 farmers across India.",
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
];

const stats = [
  { value: "50K+", label: "Active Farmers" },
  { value: "95%", label: "Accuracy Rate" },
  { value: "12+", label: "Languages" },
  { value: "24/7", label: "Support" },
];

export default function WhySection() {
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
            Why Choose Krishi Sahayi?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Built specifically for Indian farmers with local insights, trusted by thousands across the country.
          </p>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              className="bg-card rounded-2xl p-8 text-center shadow-lg border border-border"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              data-testid={`benefit-card-${index}`}
            >
              <div className={`w-16 h-16 ${benefit.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                <benefit.icon className={`w-8 h-8 ${benefit.iconColor}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-4">{benefit.title}</h3>
              <p className="text-muted-foreground">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-card rounded-3xl p-12 shadow-2xl border border-border">
            <div className="max-w-4xl mx-auto">
              <blockquote className="text-xl lg:text-2xl text-foreground italic mb-6">
                "Krishi Sahayi has transformed my farming. The weather predictions are accurate, and the AI disease detection saved my tomato crop last season."
              </blockquote>
              <div className="flex items-center justify-center space-x-2 mb-8">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <span className="text-muted-foreground">- Rajesh Kumar, Punjab</span>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    data-testid={`stat-${index}`}
                  >
                    <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
