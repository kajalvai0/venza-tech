
import React from 'react';
import { Facebook, Instagram, Youtube, Twitter, MapPin, Mail, Phone } from 'lucide-react';
import { SiteSettings } from '../types';

interface FooterProps {
  settings: SiteSettings;
}

const Footer: React.FC<FooterProps> = ({ settings }) => {
  return (
    <footer className="bg-white text-slate-900 border-t">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <div>
              <span className="text-3xl font-bold text-blue-600 tracking-tight">{settings.logoText || 'VENZA'}</span>
              <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                {settings.footerAbout}
              </p>
            </div>
            <div className="flex gap-4">
              {settings.facebookUrl && (
                <a href={settings.facebookUrl} className="p-2 bg-slate-100 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                  <Facebook size={20} />
                </a>
              )}
              {settings.instagramUrl && (
                <a href={settings.instagramUrl} className="p-2 bg-slate-100 rounded-lg hover:bg-pink-600 hover:text-white transition-all">
                  <Instagram size={20} />
                </a>
              )}
              {settings.youtubeUrl && (
                <a href={settings.youtubeUrl} className="p-2 bg-slate-100 rounded-lg hover:bg-red-600 hover:text-white transition-all">
                  <Youtube size={20} />
                </a>
              )}
              {settings.twitterUrl && (
                <a href={settings.twitterUrl} className="p-2 bg-slate-100 rounded-lg hover:bg-blue-400 hover:text-white transition-all">
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">গুরুত্বপূর্ণ লিংক</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              {settings.importantLinks.map((link, idx) => (
                <li key={idx}><a href={link.url} className="hover:text-blue-600 transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-6">পপুলার ক্যাটাগরি</h4>
            <ul className="space-y-4 text-sm text-slate-500 font-medium">
              {settings.popularCategories.map((link, idx) => (
                <li key={idx}><a href={link.url} className="hover:text-blue-600 transition-colors">{link.label}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-6">যোগাযোগ</h4>
            <ul className="space-y-5 text-sm text-slate-600">
              <li className="flex gap-3">
                <MapPin className="text-blue-600 shrink-0" size={18} />
                <span>{settings.address}</span>
              </li>
              <li className="flex gap-3">
                <Mail className="text-blue-600 shrink-0" size={18} />
                <span>{settings.email}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="text-blue-600 shrink-0" size={18} />
                <span>{settings.contactNumber}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment & Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-sm text-slate-400 font-medium">
            © {new Date().getFullYear()} {settings.logoText || 'ভেনজা'}. সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex flex-wrap gap-4 items-center grayscale opacity-70">
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
            <span className="text-xl font-bold italic text-pink-500">bKash</span>
            <span className="text-xl font-bold italic text-orange-600">Nagad</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
