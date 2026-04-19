import { i } from "framer-motion/client";
import { createContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";


export const CartContext = createContext();

export default function CartProvider({ children }) {


  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
   return () => unsubscribe();
  }, []);

  const logout = async () => {
    await signOut(auth);
  };






// favourites
  const [favourites, setfavourites] = useState(() => {
    const savefavourites = localStorage.getItem("favouritesItems");
    return savefavourites ? JSON.parse(savefavourites) : [];
  });

const addTOfavourites =(item)=>{
  setfavourites((prevItem)=>{
if (prevItem.some((i)=>i.id ===item.id))return prevItem;
return [...prevItem , item]
  })
}

const removeFavourites = (id)=>{
  setfavourites((prevItem )=>prevItem.filter((item)=>item.id !== id));
};

 
useEffect(()=>{
  localStorage.setItem("favourites",JSON.stringify(favourites))
} ,[favourites]);




  // cart
  const [cartItems, setCartItems] = useState(() => {
    const saveCart = localStorage.getItem("cartItems");
    return saveCart ? JSON.parse(saveCart) : [];
  });
  // increament
  const increament = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };
  // decreament
  const decreament = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item,
      ),
    );
  };
  //  remove from cart
  const remvecart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, increament, decreament, remvecart,favourites,addTOfavourites ,removeFavourites,user,logout}}
    >
      {!loading && children}
    </CartContext.Provider>
  );
}
