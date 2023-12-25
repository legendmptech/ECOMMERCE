"use client";
import React from "react";
import store from "../store/configStore";
import { Provider as StoreProvider } from "react-redux";

const StoreWrapper = ({ children }) => {
  return <StoreProvider store={store}>{children}</StoreProvider>;
};

export default StoreWrapper;
