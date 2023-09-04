import { ReactNode, createContext, useContext, useState } from "react";
import ShoppingCart from "../components/ShoppingCart";
import useLocalStorage from "../hooks/useLocalStorage";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type CartItem = {
  id: number;
  qtn: number;
};

type ShoppingCartContext = {
  openCart: () => void;
  closeCart: () => void;
  cartQtn: number;
  getItemQtn: (id: number) => number;
  increaseCartQtn: (id: number) => void;
  decreaseCartQtn: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartItems: CartItem[];
  isOpen: boolean;
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);

  const cartQtn = cartItems.reduce((qtn, item) => item.qtn + qtn, 0);

  function getItemQtn(id: number) {
    return cartItems.find((item) => item.id === id)?.qtn || 0;
  }

  function increaseCartQtn(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, qtn: 1 }];
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qtn: item.qtn + 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function decreaseCartQtn(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.qtn == 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, qtn: item.qtn - 1 };
          } else {
            return item;
          }
        });
      }
    });
  }

  function removeFromCart(id: number) {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  }

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        cartQtn,
        getItemQtn,
        increaseCartQtn,
        decreaseCartQtn,
        removeFromCart,
        openCart,
        closeCart,
        isOpen,
      }}
    >
      {children}
      <ShoppingCart />
    </ShoppingCartContext.Provider>
  );
}
