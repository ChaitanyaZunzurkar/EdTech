import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
}

export const authReducer = createSlice({
    name:"authReducer",
    initialState,
    reducers :{
        setToken(state , value) {
            state.token = value.payload
        }
    }
})

export const { setToken } = authReducer.actions
export default authReducer.reducer
