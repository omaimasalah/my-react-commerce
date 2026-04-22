import React, { useContext } from 'react';
import { CartContext } from './CartConText';
import PageTransation from "../Componants/PageTransation";
import { Link } from 'react-router-dom'; // نسينا الـ Link
import { FaStarHalfStroke, FaShare, FaStar, FaCheck, FaCartArrowDown } from "react-icons/fa6"; // استيراد الأيقونات
import { CiHeart } from "react-icons/ci";

const Favourites = () => {
  // بنجيب البيانات من الـ Context
  const { favourites, cartItems, addToCart } = useContext(CartContext);

  return (
    <PageTransation>
      <div className='container mx-auto px-8 '>
        <h2 className='inline-block text-3xl font-bold mb-10 mt-10 capitalize text-blue-500 border-b-4 pb-4 border-blue-500'>
          your favourites
        </h2>

<div className="">  
          {/* 1. بداية الشرط: لو المفضلة فاضية */}
          {favourites.length === 0 ? (
            <p className="text-gray-500 text-xl">no favourites products</p>
          ) : (
            /* 2. لو فيه منتجات، بنعرض الـ div اللي جواه الـ map */
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 '>
              {favourites.map((product) => {
                // بنصلح الـ isInCart عشان تدور جوه الـ cartItems اللي في الـ Context
                const isInCart = cartItems?.some((item) => item.id === product.id);

                return (
                  <div
                    key={product.id}
className='group relative w-full bg-white py-6 px-6 border-2 rounded-xl hover:border-blue-500 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-lg'                  >
                    <Link to={`/products/${product.id}`} className="relative z-10 block cursor-pointer">
                      
                      {/* In Cart Label */}
                      <span className={`${isInCart ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"} flex items-center gap-2 text-blue-500 text-sm font-bold transition-all duration-500`}>
                        <FaCheck className="text-green-500" /> in cart
                      </span>

                      {/* Image */}
                      <div className="relative h-[160px] my-4 flex justify-center items-center">
                        <img className="h-full object-contain" src={product.image} alt={product.title} />
                      </div>

                      {/* Title */}
                      <h3 title={product.title} className="mb-3 text-gray-700 font-medium truncate">
                        {product.title}
                      </h3>

                      {/* Stars */}
                      <div className="flex gap-1 text-[#F5B027] text-sm mb-3">
                        <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfStroke />
                      </div>

                      {/* Price */}
                      <p className="font-bold text-xl text-blue-600">
                        $ {product.price}
                      </p>
                    </Link>

                    {/* Icons Side Bar */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-[-60px] group-hover:right-[15px] flex flex-col gap-3 items-center transition-all duration-500 opacity-0 group-hover:opacity-100 z-20">
                      <button 
                        onClick={() => addToCart(product)}
                        className={`w-[40px] h-[40px] text-xl rounded-full flex justify-center items-center shadow-md ${isInCart ? "bg-blue-500 text-white cursor-not-allowed" : "bg-white text-blue-500 hover:bg-blue-500 hover:text-white border"}`}
                      >
                        <FaCartArrowDown />
                      </button>
                      {/* <button className="w-[40px] h-[40px] text-xl bg-white text-red-500 border rounded-full flex justify-center items-center shadow-md">
                        <CiHeart size={24} />
                      </button> */}
                    </div>
                  </div>
                ); 
              })} 
            </div> 
          )} 
        </div>
      </div>
    </PageTransation>
  );
};

export default Favourites;