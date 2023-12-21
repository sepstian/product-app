import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./slice/accountSlice";
import produkSlice from "./slice/produkSlice";

export const globalState = configureStore({
  reducer: {
    accountSlice,
    produkSlice
  },
});
