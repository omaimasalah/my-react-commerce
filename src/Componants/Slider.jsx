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
      <div className="h-[500px] flex justify-center items-center bg-gray-100">
        Loading Slider...
      </div>
    );

  return (
    <div className="w-full h-[500px] md:h-[600px] mb-10">
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
            <div className="relative  w-full h-full  items-center bg-slate-50">
              {/* محتوى النص */}
              <div className="container mx-auto px-10 flex flex-col md:flex-row items-center justify-between">
                <div className="w-full md:w-1/2 text-left z-10">
                  <span className="text-blue-500 font-bold uppercase tracking-widest mb-4 block">
                    New Arrival
                  </span>
                  <h1 className="text-4xl md:text-6xl font-extrabold text-gray-800 mb-6 leading-tight">
                    {item.title}
                  </h1>
                  <p className="text-gray-600 text-lg mb-8 max-w-md line-clamp-2">
                    {item.description}
                  </p>
                  <Link
                    to={`/products/${item.id}`}
                    className="bg-blue-600 text-white px-8 py-4 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200"
                  >
                    Shop Now - ${item.price}
                  </Link>
                </div>

                <div className="w-full md:w-1/2 flex justify-end mt-10 md:mt-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="max-h-[350px] md:max-h-[450px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/50 -skew-x-12 transform translate-x-20"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroSlider;
