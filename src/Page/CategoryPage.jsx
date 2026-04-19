import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { FaCheck, FaStar, FaCartArrowDown, FaShare } from "react-icons/fa"
import { FaStarHalfStroke } from "react-icons/fa6"
import { CiHeart } from "react-icons/ci"
import PageTransation from "../Componants/PageTransation";


const CategoryPage = () => {

  const { category } = useParams()

  const [categoryProducts, setCategoryProducts] = useState([])
  const [cart, setCart] = useState([])

  useEffect(() => {
    fetch(`https://sandbox.mockerito.com/ecommerce/api/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data)
      })
  }, [category])

  // إضافة للكارت
  const handleCart = (product) => {
    setCart((prev) => [...prev, product.id])
  }

  return (
    <PageTransation>
    <div className='container mx-auto'>

        <h2 className=' inline-block text-3xl font-bold mb-10 mt-10 capitalize text-blue-500 border-b-4 pb-4 border-blue-500  '>{category}</h2>

      <div className='flex  gap-10 items-center'>

<div className='flex flex-wrap  justify-between items-center  gap-4'>
        {categoryProducts.map((product) => {

          const isInCart = cart.includes(product.id)

          return (
            <div
              key={product.id}
              className='group relative w-[200px] bg-white py-[10px] px-[15px] border-2 rounded-xl hover:border-blue-500 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-lg'
            >

              <Link
                to={`/products/${product.id}`}
                className="relative z-10 block cursor-pointer"
              >

                {/* in cart */}
                <span className={`${isInCart ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} flex items-center pl-[70px] gap-2 text-blue-500`}>
                  <FaCheck className="text-green-500" /> in cart
                </span>

                {/* image */}
                <div className="relative h-[180px] px-[20px] mt-[30px] mb-[30px] flex justify-center items-center">
                  <img className="h-[140px]" src={product.image} alt={product.title} />
                </div>

                {/* title */}
                <h3
                  title={product.title}
                  className="mb-5 text-gray-600 px-2 truncate"
                >
                  {product.title}
                </h3>

                {/* stars */}
                <div className="my-[15px] flex gap-2 text-[#F5B027] text-[18px]">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStarHalfStroke />
                </div>

                {/* price */}
                <p className="font-bold text-[20px]">
                  <span className="text-blue-500">$ {product.price}</span>
                </p>

              </Link>

              {/* icons */}
              <div className="absolute top-1/2 -translate-y-1/2 right-[-60px] group-hover:right-[20px] flex flex-col gap-3 items-center transition-all duration-500 opacity-0 group-hover:opacity-100 z-10">

                {/* add to cart */}
                <span
                  onClick={() => handleCart(product)}
                  className={`w-[40px] h-[40px] text-xl rounded-full flex justify-center items-center cursor-pointer transition-all
                  ${isInCart
                      ? "bg-blue-500 text-white pointer-events-none"
                      : "bg-slate-200 text-blue-600 hover:bg-blue-500 hover:text-white"
                    }`}
                >
                  <FaCartArrowDown />
                </span>

                {/* wishlist */}
                <span className="w-[40px] h-[40px] text-xl text-blue-600 bg-slate-200 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all">
                  <CiHeart size={24} />
                </span>

                {/* share */}
                {/* <span className="w-[40px] h-[40px] text-xl text-blue-600 bg-slate-200 rounded-full flex justify-center items-center cursor-pointer hover:bg-blue-500 hover:text-white transition-all">
                  <FaShare />
                </span> */}

              </div>

            </div>
          )
        })}
</div>
      </div>

    </div>
    </PageTransation>
  )
}

export default CategoryPage