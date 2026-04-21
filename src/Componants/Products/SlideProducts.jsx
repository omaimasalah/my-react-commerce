import { FaStarHalfStroke, FaShare, FaStar, FaCheck } from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../Page/CartConText";
import toast from "react-hot-toast";

const Products = ({ item }) => {
  const navigate = useNavigate();
  const context = useContext(CartContext) || {};
  const { cartItems , addToCart, favourites , addTOfavourites,removeFavourites } = context;

  const isInCart = cartItems?.some((i) => i?.id === item?.id);
  const isFavourite = favourites?.some((i) => i?.id === item?.id);

  // 1. إضافة للسلة
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!item) return;
    addToCart(item);

    toast.success(
      <div className="flex items-center gap-3 min-w-[300px]">
        <img src={item.image} className="w-12 h-12 object-contain rounded" alt="" />
        <div className="flex flex-col gap-1 flex-1">
          <strong className="text-sm truncate max-w-[150px]">{item.title}</strong>
          <p className="text-xs text-gray-500">Added to cart successfully</p>
          <button
            onClick={(e) => { e.stopPropagation(); navigate("/Cart"); }}
            className="w-fit mt-1 text-[10px] bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            View Cart
          </button>
        </div>
      </div>,
      { duration: 3000 }
    );
  };
  
  const handleFavourites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!item) return;

    if (!isFavourite) {
    addTOfavourites(item);
      toast.success(
        <div className="flex items-center gap-3 min-w-[300px]">
          <img src={item.image} className="w-12 h-12 object-contain rounded" alt="" />
          <div className="flex flex-col gap-1 flex-1">
            <strong className="text-sm truncate max-w-[150px]">{item.title}</strong>
            <p className="text-xs text-gray-500">Added to favourites</p>
            <button
              onClick={(e) => { e.stopPropagation(); navigate("/favourites"); }}
              className="w-fit mt-1 text-[10px] bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              View Favourites
            </button>
          </div>
        </div>,
        { duration: 3000, icon: "❤️" }
      );
 } else {



      // حذف من المفضلة
      removeFavourites(item.id);
      toast.error(
        <div className="flex items-center gap-3">
          <img src={item.image} className="w-8 h-8 object-contain" alt="" />
          <span>Removed from favourites</span>
        </div>,
        { duration: 3000, icon: "❌" }
      );
  
    }
  };
  if (!item) return null;

  return (
    <div className="group relative w-[250px] bg-white py-[25px] px-[15px] border-2 rounded-xl hover:border-blue-500 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-lg mx-auto">
      <Link to={`/products/${item.id}`} className="relative z-10 block cursor-pointer">
        <span className={`${isInCart ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} flex items-center pl-[20px] gap-2 text-blue-500 transition-all duration-500 font-bold text-sm h-6`}>
          <FaCheck className="text-green-500" /> in cart
        </span>

        <div className="relative h-[180px] py-0 px-[20px] mt-[20px] mb-[20px] flex justify-center items-center overflow-hidden">
          <img className="h-[140px] w-auto object-contain group-hover:scale-110 transition-transform duration-500" src={item.image} alt={item.title} />
        </div>

        <h3 title={item.title} className="mb-4 text-gray-700 px-2 truncate font-medium text-base">{item.title}</h3>

        <div className="mb-4 flex gap-1 text-[#F5B027] text-[16px]">
          <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStarHalfStroke />
        </div>

        <p className="font-bold text-[20px]">
          <span className="text-blue-500">$ {item.price.toFixed(2)}</span>
        </p>
      </Link>

      {/* Buttons side bar */}
      <div className="absolute top-1/2 -translate-y-1/2 right-[-60px] group-hover:right-[15px] flex flex-col gap-3 items-center transition-all duration-500 opacity-0 group-hover:opacity-100 z-20">
        <button
          onClick={handleAddToCart}
          className={`w-[45px] h-[45px] text-xl rounded-full flex justify-center items-center cursor-pointer transition-all border shadow-md ${
            isInCart ? "bg-blue-500 text-white pointer-events-none border-blue-500" : "bg-white text-blue-600 border-slate-200 hover:bg-blue-500 hover:text-white"
          }`}
        >
          <FaCartArrowDown />
        </button>

        <button
          onClick={handleFavourites}
          className={`w-[45px] h-[45px] text-xl rounded-full flex justify-center items-center cursor-pointer transition-all border shadow-md ${
            isFavourite ? "bg-red-500 text-white border-red-500" : "bg-white text-red-500 border-slate-200 hover:bg-red-500 hover:text-white"
          }`}
        >
          <CiHeart size={26} />
        </button>

        {/* <button className="w-[45px] h-[45px] text-xl text-gray-600 bg-white border border-slate-200 rounded-full flex justify-center items-center cursor-pointer hover:bg-gray-100 transition-all shadow-md">
          <FaShare size={18} />
        </button> */}
      </div>
    </div>
  );
};

export default Products; 