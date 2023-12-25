import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  list: [],
  itemCount: 0,
  totalAmt: 0,
};
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartUpdated: (state, action) => {
      const list = JSON.parse(localStorage.getItem("cartList")) || [];
      return { ...state, list: list, itemCount: list.length };
    },
    cartItemAdded: (state, action) => {
      const list = JSON.parse(localStorage.getItem("cartList")) || [];
      let newList = list;
      // to check whether an item present with the given id and size
      let checker = true;
      newList = list.map((item) => {
        if (isItemFound(item, action)) {
          checker = false;
          return { ...item, ...action.payload };
        }
        return item;
      });
      if (checker) {
        newList = [...list, { ...action.payload }];
      }
      localStorage.setItem("cartList", JSON.stringify(newList));
      return { ...state, list: newList, itemCount: newList.length };
    },
    cartItemUpdated: (state, action) => {
      const list = JSON.parse(localStorage.getItem("cartList")) || [];
      const listFilter = list.map((item) => {
        if (item.id !== action.payload.id && item.size != action.payload.size) {
          return { ...item, ...action.payload };
        } else {
          return item;
        }
      });
      const newList = [...listFilter, { ...action.payload }];
      localStorage.setItem("cartList", JSON.stringify(newList));
      return { ...state, list: newList };
    },
    cartItemQIncremented: (state, action) => {
      const list = JSON.parse(localStorage.getItem("cartList")) || [];
      const newList = list.map((item) => {
        if (isItemFound(item, action)) {
          const newQ = Math.min(item.quantity + 1, 20);
          return { ...item, quantity: newQ };
        } else {
          return item;
        }
      });
      localStorage.setItem("cartList", JSON.stringify(newList));
      return { ...state, list: newList };
    },
    cartItemQDecremented: (state, action) => {
      const list = JSON.parse(localStorage.getItem("cartList")) || [];
      const newList = list.map((item) => {
        if (isItemFound(item, action)) {
          const newQ = Math.max(item.quantity - 1, 1);
          return { ...item, quantity: newQ };
        } else {
          return item;
        }
      });
      localStorage.setItem("cartList", JSON.stringify(newList));
      return { ...state, list: newList };
    },
    cartItemDeleted: (state, action) => {
      const list = JSON.parse(localStorage.getItem("cartList")) || [];
      const newList = list.filter((item) => !isItemFound(item, action));
      localStorage.setItem("cartList", JSON.stringify(newList));
      return { ...state, list: newList, itemCount: newList.length };
    },
    cartAmtUpdated: (state, action) => {
      const list = JSON.parse(localStorage.getItem("cartList")) || [];
      const sum = list.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.quantity * currentItem.discountPrice;
      }, 0);
      return { ...state, totalAmt: sum };
    },
    cartEmptied: (state, item) => {
      localStorage.setItem("cartList", JSON.stringify([]));
      return { list: [], itemCount: 0, totalAmt: 0 };
    },
  },
});
export const {
  cartUpdated,
  cartItemAdded,
  cartItemUpdated,
  cartItemQIncremented,
  cartItemQDecremented,
  cartItemDeleted,
  cartAmtUpdated,
  cartEmptied,
} = slice.actions;
export default slice.reducer;
export const getCartList = (state) => state.entities.cart.list;
export const getCartitemCount = (state) => state.entities.cart.itemCount;
export const getCartTotalAmt = (state) => state.entities.cart.totalAmt;
const isItemFound = (item, action) =>
  item.id === action.payload.id && item.size === action.payload.size;
