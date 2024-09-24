import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    return JSON.parse(localStorage.getItem("cart")) ?? [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const productExist = cart.find(({ _id }) => _id === product._id);
    if (productExist) {
      productExist.orderQuantity += 1;
      setCart([...cart]);
    } else {
      product.orderQuantity = 1;
      setCart([...cart, product]);
    }
  };

  //Student: Todo Delete product from cart, increment product, decrement product order qunatity
  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  return useContext(CartContext);
}
