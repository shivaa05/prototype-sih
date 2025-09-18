import { motion } from "framer-motion";
import { Link } from "wouter";
import { Sprout, Facebook, Twitter, Instagram, Youtube, Heart } from "lucide-react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/ai-mode", label: "AI Mode" },
  { href: "#", label: "About Us" },
];

const supportLinks = [
  { href: "#", label: "Help Center" },
  { href: "#", label: "Contact Us" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms of Service" },
];

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <Link href="/">
              <div className="flex items-center space-x-2 mb-4 cursor-pointer">
                <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                  <Sprout className="w-6 h-6 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">Krishi Sahayi</span>
              </div>
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering Indian farmers with cutting-edge technology for sustainable agriculture and increased productivity.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a 
                  key={social.label}
                  href={social.href} 
                  className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`social-link-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-primary transition-colors"
                    data-testid={`support-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground">© 2024 Krishi Sahayi. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-sm text-muted-foreground">Made with</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span className="text-sm text-muted-foreground">for Indian Farmers</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
