import { combineReducers } from "@reduxjs/toolkit";
import auth from "../Slice/authSlice";
import profile from "../Slice/profileSlice";
import cart from "../Slice/cartSlice";
import course from '../Slice/courseSlice';

export const rootReducer = combineReducers({
    auth: auth,
    profile: profile,
    cart: cart,
    course: course
});
