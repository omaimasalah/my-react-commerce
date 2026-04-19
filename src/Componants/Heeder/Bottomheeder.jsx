import React, { useEffect, useState ,useRef, useContext} from 'react';
import { IoMenuSharp } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { CartContext } from "../../Page/CartConText";

const Links = [
    { id: 1, page: "Home", path: "/" },
    { id: 2, page: "About", path: "/About" },
    { id: 3, page: "AllProducts", path: "/AllProduct" }, 
    { id: 4, page: "Contact Us", path: "/ContactUs" }, 
];

const BottomHeader = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
    const [open , setopen]=useState(false);
const menuRef = useRef();
  const { user, logout } = useContext(CartContext);

  const handleLogout = async () => {
  await logout();
};
  // قفل القائمة عند تغيير الصفحة
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // قفل القائمة عند الضغط فى أى مكان 
useEffect(() => {
  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);





  useEffect(() => {
    fetch('https://sandbox.mockerito.com/ecommerce/api/products/categories')
      .then((res) => res.json())
      .then((data) => {
        setCategories(Array.isArray(data) ? data : []);
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  return (
    <div className='border-b bg-blue-500 shadow-md'>
      <div className='container mx-auto flex items-center justify-between gap-10 py-2 px-4'>
        
        {/* زر تصنيفات المنتجات */}
        <div className='relative' ref={menuRef}>
          <div 
            onClick={() => setIsOpen(!isOpen)}
            className='flex items-center gap-2 cursor-pointer px-4 py-2 rounded text-white hover:bg-blue-600 transition-all'
          >
            <IoMenuSharp size={20} />
            <p className="font-semibold select-none">Browse Categories</p>
            <IoIosArrowDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* قائمة الروابط المستخرجة من API */}
          {isOpen && (
            <nav className='absolute top-[110%] left-0 w-[220px] flex flex-col bg-white shadow-xl border border-gray-200 z-[999] p-1 rounded-lg overflow-hidden capitalize'>
              {categories.map((category, index) => (
                <Link 
                  key={category.id || index} 
                  to={`/category/${category.id || category}`} 
                  className="text-gray-700 hover:text-blue-600 hover:bg-blue-50 p-3 block border-b border-gray-50 last:border-0 font-medium transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {typeof category === 'string' ? category : category.name}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <ul className="hidden md:flex items-center gap-6 text-white text-lg font-medium">
          {Links.map((link) => (
            <li key={link.id}>
              <Link 
                to={link.path} 
                className={`px-3 py-2 transition duration-300 rounded-md ${location.pathname === link.path ? 'bg-blue-700 text-white' : 'hover:bg-blue-400'}`}
              >
                {link.page}
              </Link>
            </li>
          ))}
        </ul>

        {/* sign/reg icons */}
       <div className="flex text-white gap-6 items-center">

  {user ? (
    <>
      <span className="text-sm">
        {user.displayName || user.email}
      </span>

      <button
        onClick={handleLogout}
        className="hover:scale-125 transition"
      >
        <PiSignInBold size={22} />
      </button>
    </>
  ) : (
    <>
      <Link to="/Login">
        <PiSignInBold size={22} />
      </Link>

      <Link to="/Register">
        <FaUserPlus size={22} />
      </Link>
    </>
  )}

</div>
       {/* menu icons bars and close*/}
<div onClick={(()=>setopen(!open))} className="text-white md:hidden" >
    {!open ? <FaBars  className=" text-2xl text-white cursor-pointer"/>:<IoClose className="text-2xl text-white cursor-pointer" />
}
</div>

      </div>


      {/*links of menu  */}
   <div className={`fixed top-0 right-0 bg-inherit z-10 w-[120px] h-[60vh] transform duration-500 ${ open ? "translate-x-0" :"translate-x-full"}`}>
<div onClick={()=>setopen(false)}>
    <IoClose  className="text-2xl text-white cursor-pointer" />
    </div>
     <ul className=" flex flex-col items-center gap-8 text-white text-lg mt-16">
{Links.map((link)=>(
    < li className="px-2 py-1 hover:bg-blue-950 transition duration-500 rounded" key={link.id}>
        <a  href={link.path}>{link.page} </a>
    </li>
))}
     </ul>

    
     </div>
    </div>
  );
};

export default BottomHeader;