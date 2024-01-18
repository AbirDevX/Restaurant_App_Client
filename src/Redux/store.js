import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slice/authSclice";
import cartReducer from "./Slice/cartSlice";
import otpSlice from "./Slice/otpSlice";

export const store = configureStore({
  reducer: { authSlice, cart: cartReducer, otpSlice },
});
