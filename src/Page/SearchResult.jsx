import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import PageTransation from "../Componants/PageTransation";
import { FaCheck, FaStar, FaCartArrowDown, FaShare } from "react-icons/fa";
import { FaStarHalfStroke } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";

const SearchResult = () => {
  const [result, setresult] = useState([]);
  const [loading, setloading] = useState(true);
  
  // يفضل جلب السلة من الـ Context لو كانت موجودة
  const [cart, setCart] = useState([]); 
  const handleCart = (product) => { console.log("Added to cart", product) };

  const query = new URLSearchParams(useLocation().search).get("query");
useEffect(() => {
  const fetchResult = async () => {
    setloading(true);
    try {
      // 1. جلب كل المنتجات
      const res = await fetch(`https://sandbox.mockerito.com/ecommerce/api/products `);
      const data = await res.json();
      
      const allProducts = data.products || data;

      if (Array.isArray(allProducts)) {

        const filtered = allProducts.filter((product) => {
          const name = (product.name || product.title || "").toLowerCase();
          return name.includes(query.toLowerCase());
        });

        setresult(filtered);
      } else {
        setresult([]);
      }
    } catch (error) {
      console.error("Search logic error:", error);
    } finally {
      setloading(false);
    }
  };

  if (query) fetchResult();
}, [query]);


  return (
    <PageTransation key={query}>
      <div className="container mx-auto px-4">
         
        <h2 className="inline-block text-3xl font-bold mb-10 mt-10 capitalize text-blue-500 border-b-4 pb-4 border-blue-500">
          Results for: {query}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <p className="text-xl text-gray-500">Searching for products...</p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center md:justify-start gap-10 items-center">
            {result.length > 0 ? (
              result.map((product) => {
                const isInCart = cart.includes(product.id);

                return (
                  <div
                    key={product.id} // استخدم product وليس query
                    className="group relative w-[250px] bg-white py-[10px] px-[15px] border-2 rounded-xl hover:border-blue-500 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-lg"
                  >
                    <Link
                      to={`/products/${product.id}`} // استخدم product وليس query
                      className="relative z-10 block cursor-pointer"
                    >
                      <div
                        className={`${
                          isInCart ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"
                        } flex items-center gap-2 text-blue-500 transition-all duration-500`}
                      >
                        <FaCheck className="text-green-500" /> in cart
                      </div>

                      <div className="relative h-[180px] px-[20px] mt-[10px] mb-[10px] flex justify-center items-center">
                        <img
                          className="h-[140px] object-contain"
                          src={product.image} // استخدم product وليس query
                          alt={product.title}
                        />
                      </div>

                      <h3
                        title={product.title}
                        className="mb-2 text-gray-800 font-medium px-2 truncate"
                      >
                        {product.name || product.title}
                      </h3>

                      <div className="my-[10px] flex gap-1 text-[#F5B027] text-[16px]">
                        <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfStroke />
                      </div>

                      <p className="font-bold text-[20px]">
                        <span className="text-blue-500">$ {product.price}</span>
                      </p>
                    </Link>

                    <div className="absolute top-1/2 -translate-y-1/2 right-[-60px] group-hover:right-[15px] flex flex-col gap-3 items-center transition-all duration-500 opacity-0 group-hover:opacity-100 z-20">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleCart(product);
                        }}
                        className={`w-[40px] h-[40px] text-xl rounded-full flex justify-center items-center cursor-pointer transition-all ${
                          isInCart
                            ? "bg-blue-500 text-white pointer-events-none"
                            : "bg-slate-100 text-blue-600 hover:bg-blue-500 hover:text-white"
                        }`}
                      >
                        <FaCartArrowDown />
                      </button>

                      <button className="w-[40px] h-[40px] text-xl text-blue-600 bg-slate-100 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all">
                        <CiHeart size={24} />
                      </button>

                      <button className="w-[40px] h-[40px] text-xl text-blue-600 bg-slate-100 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all">
                        <FaShare size={18} />
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="w-full text-center py-20">
                <p className="text-gray-500 text-lg">No products found matching "{query}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </PageTransation>
  );
};

export default SearchResult;