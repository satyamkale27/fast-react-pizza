import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: "Mediterranean",
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalprice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload); // we used .push because use want to push in array, the payload recived //
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantaty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++; // in redux we dont have to use ...(spread)operator to mutate any quantity or element in state, we can directly mutate it//
      item.totalprice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantaty(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--; // in redux we dont have to use ...(spread)operator to mutate any quantity or element in state, we can directly mutate it//
      item.totalprice = item.quantity * item.unitPrice;
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantaty,
  decreaseItemQuantaty,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart; // we made getcart for reusibility purpose and if use have to make changes we can make directly here insted of changing in all files //

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0); // reduce method used only on array //  // redux reccomends to do this kind of data manipulation, right indide the selector function, and out outside the function // it is also good practice to do this in slice like here caerSlice //

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalprice, 0);
