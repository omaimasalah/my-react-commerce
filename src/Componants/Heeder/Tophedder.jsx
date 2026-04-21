import { useContext } from "react";
import { Link } from "react-router-dom";
import { logo } from "../../assets/img";
import { FaRegHeart, FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../../Page/CartConText";
import SearchBox from "/src/Componants/Heeder/SearchBox";

const Tophedder = () => {
  const { cartItems, favourites } = useContext(CartContext);

  return (
    <div className="container mx-auto  grid grid-cols-1  md:grid-col-2 lg:grid-cols-3 justify-between items-center">


        {/* logo */}
        <div className="w-60  md:w-[130px] ">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>

        {/* search */}
        <div className="sm:my-5"> 
          <SearchBox />
        </div>

        {/* icons */}
        
        <div className="hidden md:flex  justify-end gap-4 ">
          {/* heart */}
          <Link to="/Favourites">
            <div className="relative flex items-center text-[25px]">
              <FaRegHeart />
              <span className="absolute top-[-5px] right-[-10px] w-[20px] h-[20px] text-center text-[11px] rounded-full bg-red-500 text-white">
                {favourites.length}
              </span>
            </div>
          </Link>
          {/* cart */}
          <Link to="/Cart">
            <div className="relative flex items-center text-[25px]">
              <FaShoppingCart />
              <span className="absolute top-[-5px] right-[-10px] w-[20px] h-[20px] text-center text-[11px] rounded-full bg-red-500 text-white">
                {cartItems.length}
              </span>
            </div>
          </Link>
        </div>
        
        </div>
  );
};

export default Tophedder;
