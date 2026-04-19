import React from 'react';
import PageTransation from "../Componants/PageTransation";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Contact = () => {
  return (
    <PageTransation>
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Header Section */}
        <div className="bg-blue-600 py-20 text-white text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg opacity-90">We are here to help and answer any question you might have.</p>
        </div>

        <div className="container mx-auto px-4 -mt-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Contact Info Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-8 rounded-xl shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 p-4 rounded-lg text-blue-600 text-xl"><FaPhoneAlt /></div>
                <div>
                  <h3 className="font-bold text-gray-800">Phone Number</h3>
                  <p className="text-gray-600 mt-1">+1 234 567 890</p>
                  <p className="text-gray-400 text-sm italic">Mon-Fri from 9am to 6pm</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 p-4 rounded-lg text-blue-600 text-xl"><FaEnvelope /></div>
                <div>
                  <h3 className="font-bold text-gray-800">Email Address</h3>
                  <p className="text-gray-600 mt-1">support@yourstore.com</p>
                  <p className="text-gray-400 text-sm italic">We reply within 24 hours</p>
                </div>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-md flex items-start gap-4 hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 p-4 rounded-lg text-blue-600 text-xl"><FaClock /></div>
                <div>
                  <h3 className="font-bold text-gray-800">Working Hours</h3>
                  <p className="text-gray-600 mt-1">Daily: 10:00 AM - 10:00 PM</p>
                  <p className="text-gray-400 text-sm italic">Friday: 2:00 PM - 10:00 PM</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800 mb-8">Send Us a Message</h2>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Full Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address</label>
                    <input type="email" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="example@mail.com" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Subject</label>
                    <input type="text" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="How can we help you?" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 text-sm font-semibold mb-2">Message</label>
                    <textarea rows="5" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all" placeholder="Write your message here..."></textarea>
                  </div>
                  <div className="md:col-span-2 text-right">
                    <button type="submit" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-200">
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Map Placeholder */}
        <div className="container mx-auto px-4 mt-12">
           <div className="w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center text-gray-400 overflow-hidden shadow-inner">
             {/* هنا يمكنك وضع iframe من Google Maps */}
             <p className="text-lg italic font-medium">Google Maps Integration Placeholder</p>
           </div>
        </div>
      </div>
    </PageTransation>
  );
};

export default Contact;