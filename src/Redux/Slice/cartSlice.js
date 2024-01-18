import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  gst: 5,
};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState,
  reducers: {
    addToCart(state, { payload }) {
      // finding index
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === payload._id
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartItemQuantity += 1;
      } else {
        const tempItem = { ...payload, cartItemQuantity: 1 };
        state.cartItems.push(tempItem);
      }
      // cartTotalAmount
      let totalAmount = [];
      let totalQuantity = 0;

      state.cartItems.forEach((item, i) => {
        const price = parseInt(item.shallPrice);
        totalAmount.push(price * item.cartItemQuantity);
        totalQuantity += 1;
      });
      const sum = totalAmount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      state.cartTotalAmount = sum; // SET TOTAL Amount OF CART
      state.cartTotalQuantity = totalQuantity; // SET Total Quantity OF CART
    },
    decrementCartItem(state, { payload }) {
      // finding index
      const itemIndex = state.cartItems.findIndex(
        (item) => item._id === payload._id
      );
      if (state.cartItems[itemIndex].cartItemQuantity <= 1) return;
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartItemQuantity -= 1;
      }
      // cartTotalAmount;
      let totalAmount = [];
      let totalQuantity = 0;

      state.cartItems.forEach((item, i) => {
        const price = parseInt(item.shallPrice);
        totalAmount.push(price * item.cartItemQuantity);
        totalQuantity -= 1;
      });
      const sum = totalAmount.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      state.cartTotalAmount = sum; // SET TOTAL Amount OF CART
      state.cartTotalQuantity = totalQuantity; // SET Total Quantity OF CART
    },
    removeCartItem(state, { payload }) {
      // finding index
      const updateData = state.cartItems.filter(
        (item) => item._id !== payload._id
      );
      if (updateData.length === 0) {
        state.cartTotalAmount = 0;
        state.cartTotalQuantity = 0;
      }
      state.cartItems = updateData;
    },
    resetCart(state, payload) {
      state.cartItems = [];
      state.cartTotalAmount = 0;
      state.cartTotalQuantity = 0;
    },
  },
});

export const { addToCart, removeCartItem, decrementCartItem, resetCart } =
  cartSlice.actions;
export default cartSlice.reducer;
