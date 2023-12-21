import { createSlice } from "@reduxjs/toolkit";
import { API_CALL } from "../../helper";

const accountSlice = createSlice({
  name: "accounts",
  initialState: {
    username: "",
    password: "",
  },
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.password = action.payload.password;
    },
    logout: (state, action) => {
      state = {
        username: "",
        password: "",
      };
    },
  },
});

export const {login, logout} = accountSlice.actions
export default accountSlice.reducer

export const checkDataAccount = () => {
    return async(dispatch) => {
        try {
            const token = localStorage.getItem("tokenAccount")
            if(token){
                const getAccount = await API_CALL.get('/account/keeplogin', {headers: {'Authorization': `Bearer ${token}`}})
                localStorage.setItem("tokenAccount", getAccount.data.result.token)

                dispatch(login(getAccount.data.result))
            }
        } catch (error) {
            localStorage.removeItem("tokenAccount")
        }
    }
}