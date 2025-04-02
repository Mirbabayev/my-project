import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon, CreditCard, Truck, Award, Mail, PhoneCall, Map } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white">
      {/* Footer üst qisim */}
      <div className="container mx-auto px-4 pt-8 pb-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Şirkət haqqında */}
          <div>
            <h3 className="font-didot text-xl mb-3">EasyParfum</h3>
            <p className="text-sm text-white/80 mb-3">
              Biz premium ətirlər və ətir məhsulları təklif edən Azərbaycanın ən keyfiyyətli ətir mağazasıyıq.
            </p>
            <div className="flex space-x-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-primary/20 hover:bg-primary/40 transition-colors rounded-sm">
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-primary/20 hover:bg-primary/40 transition-colors rounded-sm">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-primary/20 hover:bg-primary/40 transition-colors rounded-sm">
                <TwitterIcon className="w-4 h-4" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-1.5 bg-primary/20 hover:bg-primary/40 transition-colors rounded-sm">
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          {/* Əlaqə */}
          <div>
            <h3 className="font-didot text-xl mb-3">Əlaqə</h3>
            <ul className="space-y-1.5">
              <li className="flex items-center text-sm text-white/80">
                <PhoneCall className="w-4 h-4 mr-2 text-primary" />
                <a href="tel:+994512345678">+994 51 234 56 78</a>
              </li>
              <li className="flex items-center text-sm text-white/80">
                <Mail className="w-4 h-4 mr-2 text-primary" />
                <a href="mailto:info@easyparfum.az">info@easyparfum.az</a>
              </li>
              <li className="flex items-start text-sm text-white/80">
                <Map className="w-4 h-4 mr-2 text-primary flex-shrink-0 mt-1" />
                <span>Bakı şəhəri, Nizami küçəsi 203B</span>
              </li>
            </ul>
          </div>
          
          {/* Keçidlər */}
          <div>
            <h3 className="font-didot text-xl mb-3">Faydalı keçidlər</h3>
            <ul className="space-y-1.5">
              <li><Link to="/about" className="text-sm text-white/80 hover:text-primary transition-colors">Haqqımızda</Link></li>
              <li><Link to="/delivery" className="text-sm text-white/80 hover:text-primary transition-colors">Çatdırılma</Link></li>
              <li><Link to="/faq" className="text-sm text-white/80 hover:text-primary transition-colors">Tez-tez soruşulan suallar</Link></li>
              <li><Link to="/privacy-policy" className="text-sm text-white/80 hover:text-primary transition-colors">Məxfilik siyasəti</Link></li>
              <li><Link to="/terms" className="text-sm text-white/80 hover:text-primary transition-colors">İstifadə şərtləri</Link></li>
            </ul>
          </div>
          
          {/* Ödəniş metodları */}
          <div>
            <h3 className="font-didot text-xl mb-3">Ödəniş metodları</h3>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center justify-center p-1 border border-white/20 rounded-sm">
                <img src="/images/payment/visa.svg" alt="Visa" className="h-6" />
              </div>
              <div className="flex items-center justify-center p-1 border border-white/20 rounded-sm">
                <img src="/images/payment/mastercard.svg" alt="MasterCard" className="h-6" />
              </div>
              <div className="flex items-center justify-center p-1 border border-white/20 rounded-sm">
                <img src="/images/payment/paypal.svg" alt="PayPal" className="h-6" />
              </div>
            </div>
            
            <div className="flex flex-col mt-3 space-y-1.5">
              <div className="flex items-center text-sm text-white/80">
                <Truck className="w-4 h-4 mr-2 text-primary" />
                <span>Bakı üzrə pulsuz çatdırılma</span>
              </div>
              <div className="flex items-center text-sm text-white/80">
                <Award className="w-4 h-4 mr-2 text-primary" />
                <span>100% orijinal məhsullar</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer alt qisim */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-2">
          <div className="text-center text-sm text-white/60">
            <p>&copy; {currentYear} EasyParfum. Bütün hüquqlar qorunur.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};