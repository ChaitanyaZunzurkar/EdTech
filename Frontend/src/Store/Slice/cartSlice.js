import { createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';

const initialState = {
    totalItems : localStorage.getItem('totalItems') ? JSON.parse(localStorage.getItem('totalItems')) : 0,
    cart : []
}

export const cartReducer = createSlice({
    name: "cart",
    initialState,
    reducers : {
        setTotalItems(state , value) {
            state.totalItems = value.payload
        },

        add(state , value) {
            toast.success("Item added to cart.")
            state.cart.push(value.payload)
        }, 

        remove(state , value) {
            toast.error("Item removed from cart.")
            state.cart = state.cart.filter((item) => item.id !== value.payload.id)
        }, 

        resetCart(state) {
            toast.warn("Cart reset successfully.")
            state.cart = []
        }
    }
})

export const { add , remove ,resetCart, setTotalItems} = cartReducer.actions
export default cartReducer.reducer

