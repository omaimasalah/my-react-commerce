import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white mt-10">
      <div className="container mx-auto px-6 py-8"> 
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          {/* العمود الأول: Brand */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">
              STORE<span className="text-blue-950">LOGO</span>
            </h2>
            <p className="text-sm text-blue-100 leading-relaxed max-w-xs">
              Your one-stop shop for fashion and electronics. Innovation right to your doorstep.
            </p>
            <div className="flex gap-3">
              <Link to={"https://www.facebook.com/?locale=ar_AR"} className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-950 hover:text-white transition-all text-sm"><FaFacebookF /></Link>
              <Link  className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all text-sm"><FaInstagram /></Link>
              <Link className="w-8 h-8 rounded-full bg-white text-blue-600 flex items-center justify-center hover:bg-blue-400 hover:text-white transition-all text-sm"><FaTwitter /></Link>
            </div>
          </div>

          {/* العمود الثاني: Quick Links */}
          <div className="md:justify-self-center">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-950 w-fit pb-1">Quick Links</h3>
            <ul className="space-y-2 text-sm"> {/* صغرنا المسافات space-y-2 */}
              <li><Link to="/" className="hover:text-yellow-400 transition-colors">Home</Link></li>
              <li><Link to="/AllProduct" className="hover:text-blue-950 transition-colors">All Products</Link></li>
              <li><Link to="/About" className="hover:text-blue-950 transition-colors">About Us</Link></li>
              <li><Link to="/ContactUs" className="hover:text-blue-950 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* العمود الثالث: Contact Info (الآن سيظهر بجانبهم) */}
          <div className="md:justify-self-end">
            <h3 className="text-lg font-bold mb-4 border-b-2 border-blue-950 w-fit pb-1">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-blue-950 shrink-0" />
                <span className="text-blue-50">123 Street Name, City</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-blue-950 shrink-0" />
                <span className="text-blue-50">+1 234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-blue-950 shrink-0" />
                <span className="text-blue-50">support@store.com</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright الصغير */}
      <div className="bg-blue-700 py-4 border-t border-blue-500/30">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="opacity-70">&copy; {new Date().getFullYear()} YourStore. All rights reserved.</p>
          <div className="flex gap-4 grayscale opacity-60">
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-3" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" alt="Paypal" className="h-3" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;