import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null
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
