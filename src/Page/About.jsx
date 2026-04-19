import React from 'react';
import PageTransation from "../Componants/PageTransation";

const About = () => {
  return (
    <PageTransation>
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Hero Section */}
        <div className="bg-blue-600 py-24 text-white text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">About Our Store</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto px-6 font-light">
            Your ultimate destination for modern fashion and smart home solutions, all in one place.
          </p>
        </div>

        <div className="container mx-auto px-4 -mt-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-16">
            
            {/* Story Section */}
            <section className="mb-20">
              <div className="flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                  <h2 className="text-3xl font-bold text-gray-800 mb-6 relative">
                    Who We Are
                    <span className="absolute bottom-0 left-0 w-20 h-1 bg-blue-500 rounded"></span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed text-lg mb-4">
                    Founded in 2024, our store was built on a simple idea: bringing together high-quality products from vastly different worlds. We bridge the gap between world-class fashion and cutting-edge technology.
                  </p>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Whether you are looking for the latest trends in **Men's and Women's wear** or powerful **Electrical Appliances** to upgrade your lifestyle, we provide a curated selection designed to meet your every need.
                  </p>
                </div>
                <div className="md:w-1/2 bg-blue-100 h-64 rounded-2xl flex items-center justify-center text-blue-500 font-bold italic text-xl p-10 text-center">
                  "Empowering your lifestyle with style and innovation."
                </div>
              </div>
            </section>

            {/* Categories Section */}
            <div className="grid md:grid-cols-3 gap-10 mb-20">
              <div className="bg-white p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all text-center group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">👔</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Men's Fashion</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Classic and contemporary styles curated for the modern man, ensuring confidence in every step.
                </p>
              </div>
              <div className="bg-white p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all text-center group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">👗</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Women's Fashion</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  Elegant and trendy collections picked to suit sophisticated tastes, from daily wear to special occasions.
                </p>
              </div>
              <div className="bg-white p-8 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-all text-center group">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">🔌</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">Electronics</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  State-of-the-art appliances from global brands to bring efficiency and comfort to your home.
                </p>
              </div>
            </div>

            {/* Values Section */}
            <section className="bg-gray-900 text-white p-10 md:p-16 rounded-3xl">
              <h2 className="text-3xl font-bold text-center mb-12">Why Shop With Us?</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div className="text-center">
                  <h4 className="text-blue-400 font-bold text-lg mb-2">Premium Quality</h4>
                  <p className="text-gray-400 text-sm">Every item is rigorously tested to meet our high standards.</p>
                </div>
                <div className="text-center">
                  <h4 className="text-blue-400 font-bold text-lg mb-2">Fast Shipping</h4>
                  <p className="text-gray-400 text-sm">Reliable delivery service reaching your doorstep in record time.</p>
                </div>
                <div className="text-center">
                  <h4 className="text-blue-400 font-bold text-lg mb-2">Secure Payment</h4>
                  <p className="text-gray-400 text-sm">Multiple safe payment methods for a worry-free shopping experience.</p>
                </div>
                <div className="text-center">
                  <h4 className="text-blue-400 font-bold text-lg mb-2">24/7 Support</h4>
                  <p className="text-gray-400 text-sm">Our friendly team is always here to assist you at any time.</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageTransation>
  );
};

export default About;