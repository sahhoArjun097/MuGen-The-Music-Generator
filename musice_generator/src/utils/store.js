import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authslice";

const Store = configureStore({
  reducer: {
    authSlice
  },
});

export default Store;
