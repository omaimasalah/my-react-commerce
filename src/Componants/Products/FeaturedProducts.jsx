import React from 'react';
import SlideProducts from './SlideProducts';
import { Scrollbar, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// استيراد الـ Styles
import 'swiper/css';

const Products = ({ data, title }) => {
  
  // إذا كانت البيانات لم تصل بعد أو المصفوفة فارغة، نظهر رسالة بسيطة أو Spinner
  // if (!data || data.length === 0) {
  //   return <div className="text-center py-10 text-gray-400">Loading {title}...</div>;
  // }

  return (
    <div className='py-10'>
      <div className='container mx-auto px-4'>
        
        {/* Header Section */}
        <div className='flex items-end justify-between mb-8 border-b border-gray-100 pb-4 relative'>
          <div className='relative'>
            <h2 className='text-3xl font-bold text-blue-500 relative z-10 capitalize'>
              {title}
            </h2>
            <div className='absolute bottom-[-17px] left-0 w-1/2 h-[3px] bg-blue-500 z-20'></div>
          </div>
          {/* <button className='text-blue-600 font-medium hover:underline'>View All</button> */}
        </div>

        {/* Swiper Section */}
        <Swiper 
          modules={[Scrollbar, Autoplay]}
          spaceBetween={20}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="pb-10" // مسافة للسكرول بار في الأسفل
        >
          {data.map((item) => (
            <SwiperSlide key={item.id}>
               {/* نمرر المنتج للمكون الفرعي */}
               <SlideProducts item={item} />
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </div>
  );
};

export default Products;