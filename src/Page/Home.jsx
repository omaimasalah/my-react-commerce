import React, { useEffect, useState } from "react";
import Slider from "../Componants/Slider";
import PageTransation from "../Componants/PageTransation";
import FeaturedProducts from "../Componants/Products/FeaturedProducts"

const categories = ["electronics", "men's clothing", "women's clothing"];

const Home = () => {
  const [products, setproducts] = useState({});
  const [loading, setloading] = useState(true);

  useEffect(() => {
    const fetchProudects = async () => {
      try {
        const results = await Promise.all(
          categories.map(async (category) => {
       
            const res = await fetch(
              `https://sandbox.mockerito.com/ecommerce/api/products/category/${encodeURIComponent(category)}`,
            );
            const data = await res.json();

        
            const actualProducts = data.products || data;

            return { [category]: actualProducts };
          }),
        );

        const productsData = Object.assign({}, ...results);
        setproducts(productsData);
      } catch (error) {
        console.error("error fetching", error);
      } finally {
        setloading(false);
      }
    };
    fetchProudects();
  }, []);

  return (
    <PageTransation>
    <div>
      <Slider />

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-500">جاري تحميل المنتجات...</p>
        </div>
      ) : (
        <>
          {categories.map(
            (category) =>
              
              products[category] && (
                <FeaturedProducts
                  key={category}
                  data={products[category]}
                  title={category.toLowerCase()}
                />
              ),
          )}
        </>
      )}
    </div>
    </PageTransation>
  );
};

export default Home;
