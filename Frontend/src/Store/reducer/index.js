import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "../Slice/authSlice";

export const rootReducer = combineReducers({
    auth: authReducer
})