import { createSlice } from "@reduxjs/toolkit";
import { API_CALL } from "../../helper";

const produkSlice = createSlice({
  name: "produks",
  initialState: {
    produk: [],
  },
  reducers: {
    setProduk: (state, action) => {
        console.log("CEK PAYLOAD",action.payload);
      state.produk = action.payload;
    },
  },
});

export const { setProduk } = produkSlice.actions;
export default produkSlice.reducer;

// Middleware
export const getProduk = () => {
  return async (dispatch) => {
    try {
        const getProduk = await API_CALL.get("/api/produk/getkeep");
        console.log("FROM MIDDLEWARE", getProduk.data);
        dispatch(setProduk(getProduk.data))
    } catch (error) {
      console.log(error);
    }
  };
};
