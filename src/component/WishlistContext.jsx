
import { createContext, useContext, useEffect, useMemo, useState } from "react";
//import { useCart } from "./CartContext"; // Optional, agar wishlist me move to cart chahiye

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const userId = "guest"; // Future: login se user id le lena
  const storageKey = useMemo(() => `wishlist_${userId}`, [userId]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      setWishlist(saved ? JSON.parse(saved) : []);
    } catch {
      setWishlist([]);
    }
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(wishlist));
  }, [storageKey, wishlist]);

  const isInWishlist = (id) => wishlist.some((it) => it.id === id);

  const addToWishlist = (product) => {
    setWishlist((prev) =>
      prev.some((p) => p.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((p) => p.id !== id));
  };

  const clearWishlist = () => setWishlist([]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
