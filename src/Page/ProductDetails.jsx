import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { FaStarHalfStroke, FaShare } from "react-icons/fa6";
import { CiHeart } from "react-icons/ci";
import { CartContext } from "./CartConText";
import toast from "react-hot-toast";
import PageTransation from "../Componants/PageTransation";

const ProductDetails = () => {
  const { id } = useParams();
  const {
    cartItems,
    addToCart,
    favourites,
    addTOfavourites,
    removeFavourites,
  } = useContext(CartContext);
  const navegate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const isInCart = cartItems?.some((item) => item.id === Number(id));
const isFavourite = favourites?.some(item => item.id === Number(id));

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://sandbox.mockerito.com/ecommerce/api/products/${id}`,
        );
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!product) return <p>No product found</p>;

  const handelcart = () => {
    if (isInCart) return; // يمنع التكرار

    addToCart(product);

    // toast
    toast.success(
      <div className="flex items-center gap-3 min-w-[400px]">
        <img
          src={product.images?.[0] || product.image}
          className="w-12 h-12 object-contain"
          alt=""
        />

        <div className="flex flex-col gap-1 flex-1">
          <strong className="text-sm truncate max-w-[180px]">
            {product.title}
          </strong>
          <p className="text-xs text-gray-500">Added to cart</p>

          <button
            onClick={() => navegate("/Cart")}
            className={` w-[150px] mt-1 text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-white hover:text-blue-500 border border-blue-500 transition`}
          >
            view cart
          </button>
        </div>
      </div>,
      {
        duration: 3000,
      },
    );
  };

  // 2. دالة المفضلة (تم وضع المنطق داخل الدالة لحل الـ Infinite Loop)
  const handleFavourites = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product) return;

    if (!isFavourite) {
      addTOfavourites(product);
      toast.success(
        <div className="flex items-center gap-3 min-w-[300px]">
          <img
            src={product.image}
            className="w-12 h-12 object-contain rounded"
            alt=""
          />
          <div className="flex flex-col gap-1 flex-1">
            <strong className="text-sm truncate max-w-[150px]">
              {product.title}
            </strong>
            <p className="text-xs text-gray-500">Added to favourites</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/favourites");
              }}
              className="w-fit mt-1 text-[10px] bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
            >
              View Favourites
            </button>
          </div>
        </div>,
        { duration: 3000, icon: "❤️" },
      );
    } else {
      removeFavourites(product.id);
      toast.error(
        <div className="flex items-center gap-3">
          <img src={product.image} className="w-8 h-8 object-contain" alt="" />
          <span>Removed from favourites</span>
        </div>,
        { duration: 3000, icon: "❌" },
      );
    }
  };
  return (
    <PageTransation key={id}>
      <div className="py-[50px] ">
        <div className="container mx-auto ">
          <div className="flex justify-between items-center ">
            <div className="w-[40%]">
              <img className=" " src={product.image} />
            </div>

            <div className="w-[58%]">
              <h2 className="mb-[30px] text-blue-500 text-2xl font-bold">
                {product.title}
              </h2>
              <p className="text-xl text-black font-bold capitalize mb-[30px]">
                {product.category}
              </p>
              <p className="text-xl text-gray-500 mb-[30px]">
                {product.description}
              </p>
              <p className="text-2xl text-blue-500 font-bold mb-[30px]">
                Price: {product.price}$
              </p>
              <div className="flex gap-1 text-yellow-400 mb-6">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfStroke />
              </div> 



               <div className="flex gap-4 mt-[30px]">
              
              <button
                onClick={handelcart}
                className={`text-[18px] rounded-xl border-2 flex items-center justify-between w-[160px] p-2 transition duration-300 hover:scale-105

  ${
    isInCart
      ? "bg-blue-600 border-blue-600 text-white hover:bg-blue-700"
      : "bg-transparent border-blue-500 text-blue-500"
  }`}
              >
                {isInCart ? "Item in Cart" : "Add to Cart"}
                <FaShoppingCart />
              </button>
              
                <button
                  onClick={handleFavourites}
                  className={`w-[40px] h-[40px] text-2xl rounded-full flex justify-center items-center cursor-pointer transition-all border shadow-sm ${
                    isFavourite
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white text-red-500 border-slate-200 hover:bg-red-500 hover:text-white"
                  }`}
                >
                  <CiHeart />
                </button>
                </div>
                </div>
                {/* <span className="w-[40px] h-[40px] text-xl text-blue-600 bg-slate-200 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all">
                  <FaShare />
                </span> */}
              </div>
            </div>
          </div>
        
    
    </PageTransation>
  );
};

export default ProductDetails;
