import { ReactNode, createContext, useContext, useState } from "react";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQtn: (id: number) => number;
  increaseCartQtn: (id: number) => void;
  decreaseCartQtn: (id: number) => void;
  removeFromCart: (id: number) => void;
};

type CartItem = {
  id: number;
  qtn: number;
};
const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  function getItemQtn(id: number) {
    return cartItems.find((item) => item.id === id)?.qtn || 0;
  }

  function increaseCartQtn(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, qtn: 1 }];
      } else {
        currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qtn: item.qtn + 1 };
          } else {
            item;
          }
        });
      }
    });
  }

  return (
    <ShoppingCartContext.Provider value={(getItemQtn, increaseCartQtn)}>
      {children}
    </ShoppingCartContext.Provider>
  );
}
