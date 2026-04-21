import { useState, useEffect } from 'react' // ضفنا useEffect
import { FaSearch } from 'react-icons/fa'
import { useLocation, useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const [search, setSearch] = useState("") 
  const [suggest, setsuggest] = useState([])
  const [loading, setloading] = useState(false);
  const navigate = useNavigate() 
const location =useLocation()

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    if (search.trim()) {
      navigate(`/search?query=${encodeURIComponent(search.trim())}`) 
      setSearch("");
      setsuggest([]); // نخفي الاقتراحات بعد البحث
    }
  } 

  useEffect(() => {
    const fetchsuggest = async () => {
      if (search.trim().length < 1) { // ابدأ اقترح لو كتب حرف أو أكتر
        setsuggest([]);
        return;
      }

      setloading(true);
      try {
        const res = await fetch(`https://sandbox.mockerito.com/ecommerce/api/products`);
        const data = await res.json();
        const allProducts = data.products || data;

        if (Array.isArray(allProducts)) {
          const filtered = allProducts.filter((product) => {
            const name = ( product.title || "").toLowerCase();
             
            return name.startsWith(search.toLowerCase()); // استخدم search هنا
          }).slice(0, 5); // هات أول 5 اقتراحات بس عشان الزحمة

          setsuggest(filtered);
        }
      } catch (error) {
        console.error("Search error:", error);
        setsuggest([]);
      } finally {
        setloading(false);
      }
    };

    // Debouncing: استنى 300 ملي ثانية بعد ما المستخدم يبطل كتابة
    const delay = setTimeout(() => {
      fetchsuggest(); // استدعاء الدالة بالأقواس
    }, 300);

    return () => clearTimeout(delay);
  }, [search]); // البحث يعتمد على تغيير الـ search

useEffect (()=>{
setsuggest([])
},[location])


  return (
    <div className='relative w-full max-w-[450px]'>
      <form onSubmit={handleSubmit} className='relative flex items-center w-full'>
        <input
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          type='text'
          placeholder='search for products'
          className='z-0 border-2 border-blue-500 p-2 pr-12 rounded-full w-full outline-none focus:border-blue-700'
        />
        <button 
          type="submit" 
          className="absolute right-1 z-10 flex items-center justify-center w-[40px] h-[38px] bg-blue-600 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-all active:scale-90"
        >
          <FaSearch size={16} />
        </button>
      </form>

      {/* قائمة الاقتراحات */}
      {suggest.length > 0 && (
        <ul className='absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl z-50 overflow-hidden'>
          {suggest.map((item) => (
            <li 
              key={item.id} 
              onClick={() => {
                navigate(`/products/${item.id}`);
                setSearch("");
                setsuggest([]);
              }}
              className='p-3 hover:bg-blue-50 cursor-pointer border-b last:border-none transition-colors flex items-center gap-3'
            >
              <img src={item.image} className='w-8 h-8 object-contain' alt="" />
              <span className='text-gray-700 text-sm truncate'>{item.title}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBox