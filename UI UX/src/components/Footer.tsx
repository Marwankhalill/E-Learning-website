import React from 'react';
import { 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Linkedin
} from 'lucide-react';
import { useApp } from '../App';

export const Footer = () => {
  const { navigate } = useApp();

  const footerLinks = {
    platform: [
      { name: 'About Us', href: '#' },
      { name: 'How it Works', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Success Stories', href: '#' }
    ],
    courses: [
      { name: 'All Courses', action: () => navigate('courses') },
      { name: 'Programming', href: '#' },
      { name: 'Business', href: '#' },
      { name: 'Design', href: '#' }
    ],
    support: [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Support', href: '#' },
      { name: 'System Status', href: '#' },
      { name: 'Resources', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Accessibility', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  return (
    <footer className="bg-muted border-t border-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 rounded-lg p-2">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-semibold text-foreground">EduPlatform</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering learners worldwide with high-quality online education. 
              Join thousands of students and instructors in our growing community.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>support@eduplatform.com</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Platform</h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Courses Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Courses</h3>
            <ul className="space-y-3">
              {footerLinks.courses.map((link, index) => (
                <li key={index}>
                  {link.action ? (
                    <button 
                      onClick={link.action}
                      className="text-muted-foreground hover:text-primary transition-colors text-left"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-border mt-12 pt-8">
          <div className="max-w-md">
            <h3 className="font-semibold text-foreground mb-2">Stay Updated</h3>
            <p className="text-muted-foreground mb-4">
              Get the latest courses and updates delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-muted-foreground text-center md:text-left">
              <p>&copy; 2024 EduPlatform. All rights reserved.</p>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-end gap-6">
              {footerLinks.legal.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Social Media */}
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};