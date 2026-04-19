import React, { useContext } from "react";
import { CartContext } from "./CartConText";
import { FaTrash } from "react-icons/fa";
import PageTransation from "../Componants/PageTransation";


const Cart = () => {
  const { cartItems, increament, decreament, remvecart } =
    useContext(CartContext);
  const total = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * item.quantity,
    0,
  );



  return (
    <PageTransation>
    <div className=" my-[50px]">
      <div className="w-full sm:w-[90%] md:w-[75%] lg:w-[55%] xl:w-[45%] px-[20px] border  border-gray-400 rounded m-auto">
        <h1 className="  border-b py-5 mb-5 text-blue-500 text-3xl font-bold">
          order summary
        </h1>
        {/* items */}
        <div className="h-[350px] overflow-y-auto">
          {cartItems.length === 0 ? (
            <p>your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                className="flex gap-5 items-center justify-between h-[125px] border-b-2 last:border-b-0  pr-[20px] last"
                key={index}
              >
                <div className="flex items-center  gap-[20px]">
                  <div className="w-[100px] flex justify-center items-center">
                    <img className="h-[80px] w-auto" src={item.image} alt="" />
                  </div>
                  <div>
                    <h1 className="mb-[10px] font-bold text-xl truncate w-[200px] text-blue-400 ">
                      {item.title}
                    </h1>
                    <p>$ {item.price}</p>
                    {/* button */}
                    <div className="flex items-center mt-[10px] gap-2">
                      <button
                        onClick={() => decreament(item.id)}
                        className="flex items-center justify-center w-[27px] h-[27px] cursor-pointer text-[20px] border rounded"
                      >
                        -
                      </button>
                      <span className="text-[18px] min-w-[40px] flex justify-center items-center bg-gray-400 border">
                        {" "}
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increament(item.id)}
                        className="flex items-center justify-center w-[27px] h-[27px] cursor-pointer text-[20px] border rounded"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                {/* delete item */}

                <button
                  onClick={() => remvecart(item.id)}
                  className="text-[20px] cursor-pointer text-red-600 
hover:scale-125 hover:text-red-700 
transition-all duration-300"
                >
                  <FaTrash />
                </button>
              </div>
            ))
          )}
        </div>

        <div className="border-t-2 pt-[25px]">
          <div className="flex justify-between items-center mb-[20px]">
            <p className="text-[20px] ">total</p>
            {/* total price */}
            <span className="text-[20px] font-bold text-blue-500">
              ${total.toFixed(2)}
            </span>
          </div>
          <div className="border-t-2 py-[30px] ">
            <button
              className="w-[100%] bg-blue-500 text-white py-[15px] outline-none rounded-lg text-xl font-bold cursor-pointer hover:bg-transparent hover:text-blue-500 border-4 border-blue-500"
              type="submit"
            >
              place order
            </button>
          </div>
        </div>
      </div>
    </div>
    </PageTransation>
  );
};

export default Cart;
