import React from "react";
import { Routes, Route } from "react-router-dom";
import Checkout from "./component/Checkout";
import Cardpage from "./component/Cardpage";
import Confirmation from "./component/Confirmation";
import SignUp from "./component/SignUp";
import LogIn from "./component/LogIn";
import Wishlist from "./component/Wishlist";
import { WishlistProvider } from "./component/WishlistContext";
import { CartProvider } from "./component/CartContext";
import Profile from "./component/Profile";  

function App() {
  return (
    <>
      {/* Wrap the whole Routes inside WishlistProvider */}
      <CartProvider>
      <WishlistProvider>
        <Routes>
          <Route path="/" element={<Cardpage />} />
          <Route path="/checkout" element={<Checkout />} /> 
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/SignUp" element={<SignUp />} /> 
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Wishlist" element={<Wishlist />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/CustomerSupport" element={<CustomerSupport />} />
        </Routes>
      </WishlistProvider>
      </CartProvider>
    </>
  );
}

export default App;
