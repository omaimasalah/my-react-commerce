import { Routes, Route, Outlet ,useLocation} from "react-router-dom";
import Tophedder from "./Componants/Heeder/Tophedder";
import Bottomheeder from "./Componants/Heeder/Bottomheeder";
import Home from "./Page/Home";
import ProductDetails from "./Page/ProductDetails";
import Cart from "./Page/Cart";
import { Toaster } from "react-hot-toast";
import CategoryPage from "./Page/CategoryPage";
import SearchResult from "./Page/SearchResult";
import Favourites from "./Page/Favourites";
import AllProducts from "./Componants/Products/AllProducts";
import About from "./Page/About";
import Footer from "./Componants/footer/Footer";
import ContactUs from "./Page/ContactUs"
import ScrollToTop from "./Componants/Heeder/ScrollToTop"
import { AnimatePresence } from "framer-motion";
import Register from "./Page/Register";
import Login from "./Page/Login";
const HeaderLayout = () => (
  <>
  <ScrollToTop />
    <header>
      <Tophedder />
      <Bottomheeder />
    </header>

    <main>
    <Outlet />
    </main>
      <Footer/>
  </>
);

const App = () => {

const location = useLocation(); 


  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/*  الصفحات التي بها هيدر */}
          <Route element={<HeaderLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/ContactUs" element={<ContactUs />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Search" element={<SearchResult />} />
            <Route path="/AllProduct" element={<AllProducts />} />{" "}
            <Route path="/Favourites" element={<Favourites />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/Category/:category" element={<CategoryPage />} />
          </Route>


  <Route path="/Register" element={<Register />} />
<Route path="/Login" element={<Login />} />
        </Routes>




      </AnimatePresence>
    </>
  );
};

export default App;
