import React, { useState, useEffect, useContext } from 'react';
import PageTransation from "../PageTransation";
import { Link, useNavigate } from 'react-router-dom'; // ضفت useNavigate
import { FaStar, FaStarHalfStroke, FaCheck, FaCartArrowDown, FaShare } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { CartContext } from "../../Page/CartConText";
import { toast } from "react-hot-toast"; // تأكدي إنك منزلة المكتبة دي

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const context = useContext(CartContext);
  

  const { 
    cartItems = [], 
    addToCart = () => {}, 
    favourites = [], 
    addTOfavourites = () => {}, 
    removeFavourites = () => {} 
  } = context || {};

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const res = await fetch('https://sandbox.mockerito.com/ecommerce/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllProducts();
  }, []);

  //الإضافة للسلة 
  const handleAddToCart = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product);
    toast.success(
      <div className="flex items-center gap-3 min-w-[280px]">
        <img src={product.image} className="w-10 h-10 object-contain rounded" alt="" />
        <div className="flex flex-col gap-1 flex-1">
          <strong className="text-xs truncate max-w-[150px]">{product.title}</strong>
          <p className="text-[10px] text-gray-500">Added to cart successfully</p>
          <button
            onClick={(e) => { e.stopPropagation(); navigate("/Cart"); }}
            className="w-fit mt-1 text-[10px] bg-blue-500 text-white px-2 py-1 rounded"
          >
            View Cart
          </button>
        </div>
      </div>
    );
  };

  // 3.  دالة المفضلة
  const handleFavourites = (e, product) => {
    e.preventDefault();
    e.stopPropagation();

    const isFavourite = favourites?.some((i) => i.id === product.id);

    if (!isFavourite) {
      addTOfavourites(product);
      toast.success("Added to favourites ❤️");
    } else {
      removeFavourites(product.id);
      toast.error("Removed from favourites ❌");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <PageTransation>
      <div className='container mx-auto px-4 py-10'>
        <h2 className='inline-block text-3xl font-bold mb-10 mt-10 capitalize text-blue-500 border-b-4 pb-4 border-blue-500'>
          All Products
        </h2>

        <div className='flex flex-wrap justify-center md:justify-start gap-8'>
          {products.map((product) => {

            
            const isInCart = cartItems?.some((i) => i.id === product.id);
            const isFav = favourites?.some((i) => i.id === product.id);

            return (
              <div
                key={product.id}
                className='group relative w-[220px] bg-white py-[20px] px-[15px] border-2 rounded-xl hover:border-blue-500 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-lg'
              >
                <Link to={`/products/${product.id}`} className="relative z-10 block cursor-pointer">
                  {/*  في السلة */}
                  <span className={`${isInCart ? "opacity-100" : "opacity-0"} flex items-center gap-2 text-blue-500 text-[12px] mb-2 transition-all font-bold`}>
                    <FaCheck className="text-green-500" /> in cart
                  </span>

                  <div className="relative h-[150px] mb-5 flex justify-center items-center">
                    <img className="h-full object-contain group-hover:scale-110 transition-transform duration-500" src={product.image} alt={product.title} />
                  </div>

                  <h3 title={product.title} className="mb-3 text-gray-700 font-medium truncate px-1">
                    {product.title}
                  </h3>

                  <div className="mb-3 flex gap-1 text-[#F5B027] text-[14px]">
                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfStroke />
                  </div>

                  <p className="font-bold text-[18px] text-blue-600">
                    $ {product.price}
                  </p>
                </Link>

                {/* أيقونات الجنب */}
                <div className="absolute top-1/2 -translate-y-1/2 right-[-60px] group-hover:right-[15px] flex flex-col gap-3 items-center transition-all duration-500 opacity-0 group-hover:opacity-100 z-10">
                  <span 
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-[40px] h-[40px] text-blue-600 bg-slate-100 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all shadow-md">
                    <FaCartArrowDown size={18} />
                  </span>
                  
                  <span 
                    onClick={(e) => handleFavourites(e, product)}
                    className={`w-[40px] h-[40px] rounded-full flex justify-center items-center cursor-pointer transition-all shadow-md ${isFav ? 'bg-red-500 text-white' : 'text-blue-600 bg-slate-100 hover:bg-red-500 hover:text-white'}`}>
                    <CiHeart size={22} />
                  </span>
                  
                  <span className="w-[40px] h-[40px] text-blue-600 bg-slate-100 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all shadow-md">
                    <FaShare size={16} />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </PageTransation>
  );
};

export default AllProducts;