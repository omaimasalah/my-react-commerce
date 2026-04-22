import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import { Link } from "react-router-dom";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const HeroSlider = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroProducts = async () => {
      try {
        const res = await fetch(
          "https://sandbox.mockerito.com/ecommerce/api/products",
        );
        const data = await res.json();
        setProducts(data.slice(0, 5));
      } catch (error) {
        console.error("Slider Fetch Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroProducts();
  }, []);

  if (loading)
    return (
      <div className="h-[350px] sm:h-[450px] md:h-[550px] flex justify-center items-center bg-gray-100">
        Loading Slider...
      </div>
    );

  return (
    <div className="w-full h-[600px] sm:h-[600px] md:h-[600px] lg:h-[600px] mb-10 overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade" // تأثير التلاشي يعطي فخامة للموقع
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="h-full w-full"
      >
        {products.map((item) => (
          <SwiperSlide key={item.id} >
            <div className="relative w-full h-full bg-gradient-to-r from-slate-50 to-blue-50 flex items-center">
              {/* محتوى النص */}
              <div className="container mx-auto px-4 sm:px-8 grid grid-cols-1 md:grid-cols-2 items-center gap-6 h-full">
                <div className="w-full md:w-1/2 text-left z-10">
                  <span className="text-blue-500 text-xl sm:text-2xl font-bold uppercase tracking-widest block mb-3">
                    New Arrival
                  </span>
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-gray-800 mb-4 leading-tight line-clamp-2">
                    {item.title}
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 mb-6 line-clamp-2 max-w-lg mx-auto md:mx-0">
                    {item.description}
                  </p>
                  <Link
                    to={`/products/${item.id}`}
                    className="inline-block bg-blue-600 text-white px-5  py-3 mx-10 rounded-full font-bold hover:bg-blue-700 hover:scale-105 duration-300"
                  >
                    Shop Now - ${item.price}
                  </Link>
                </div>

                <div className="order-1 md:order-2 flex justify-center md:justify-end">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-[180px] sm:max-h-[250px] md:max-h-[380px] object-contain"
                  />
                </div>
              </div>

              <div className="hidden md:block absolute top-0 right-0 w-1/3 h-full bg-blue-100/50 -skew-x-12 translate-x-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
