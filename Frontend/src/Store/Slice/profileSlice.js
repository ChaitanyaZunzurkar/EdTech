import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
}

export const profileReducer = createSlice({
    name:"profile",
    initialState,
    reducers :{
        setUser(state , value) {
            state.user = value.payload
        }
    }
})

export const { setUser } = profileReducer.actions
export default profileReducer.reducer
