import { combineReducers } from "@reduxjs/toolkit";
import auth from "../Slice/authSlice";
import profile from "../Slice/profileSlice";
import cart from "../Slice/cartSlice";

export const rootReducer = combineReducers({
    auth: auth,
    profile: profile,
    cart: cart,
});
