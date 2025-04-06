import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
}

export const profileReducer = createSlice({
    name:"profile",
    initialState,
    reducers :{
        setUser(state , value) {
            state.user = value.payload
        } ,
        setLoading(state , value) {
            state.loading = value.payload
        }
    }
})

export const { setUser , setLoading } = profileReducer.actions
export default profileReducer.reducer
