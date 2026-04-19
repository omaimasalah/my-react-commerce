import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // دي اللي بترجع الصفحة لصفر (أول فوق)
    window.scrollTo(0, 0);
  }, [pathname]); // هتشتغل كل ما الـ path (العنوان) يتغير

  return null;
};

export default ScrollToTop;