import React, { createContext, useContext, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
// import { Toast } from 'react-toastify/dist/components';
  import 'react-toastify/dist/ReactToastify.css';
const Context = createContext();
export const StateContext = ({ children }) => {
 
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);
  let foundProduct;
  let index;

  const onAdd = (product, quantity) => {
    const checkProductInCArt = cartItems.find((item) => item._id === product._id);
    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
    setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);
    if (checkProductInCArt) {
      const updatedCartItems = cartItems.map((cartProduct) => {
        if (cartProduct._id === product._id) return {
          ...cartProduct,
          quantity: cartProduct.quantity + quantity
        }
      }
      )
      setCartItems(updatedCartItems);

    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast(`${qty} ${product.name} added to cart.`);// need to resolve 
    alert(`${qty} ${product.name} added to cart.`);
  }
const onRemove = (product)=>{
  foundProduct = cartItems.find((item)=>item._id === product._id);
  const newCartItems = cartItems.filter((item)=>item._id !== product._id);
  setTotalPrice((prevTotalPrice)=>prevTotalPrice - foundProduct.price * foundProduct.quantity);
  setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
  setCartItems(newCartItems);
}
  const toggleCartItemQuantity=(id,value)=>{
foundProduct = cartItems.find((item)=>item._id === id);
index = cartItems.findIndex((product)=>product._id === id);
const nCartItems = cartItems.filter((item)=>item._id !== id);
if(value === "inc"){
  
  let newCartItems = [...nCartItems , {...foundProduct,quantity : foundProduct.quantity +1}]

setCartItems(newCartItems);
setTotalPrice((prevTotalPrice)=> prevTotalPrice + foundProduct.price);
setTotalQuantities(prevTotalQuantities => prevTotalQuantities +1);

}else if(value ==='dec'){
  if(foundProduct.quantity >1){
    let newCartItems = [...nCartItems , {...product,quantity : product.quantity -1}]

    setCartItems(newCartItems);
    setTotalPrice((prevTotalPrice)=> prevTotalPrice - foundProduct.price);
    setTotalQuantities(prevTotalQuantities => prevTotalQuantities -1);
  }

  
}
  }
  const incQty = () => {
    setQty((prevQty) => prevQty + 1)
  }

  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;

      return prevQty - 1
    })
  }

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd ,
        setShowCart,
        toggleCartItemQuantity,
        onRemove

      }}>
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);