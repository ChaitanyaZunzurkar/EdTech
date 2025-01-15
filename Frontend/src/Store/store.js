import { configureStore } from "@reduxjs/toolkit";
import rootReducer from '../Store/reducer/index'


export default configureStore({
    reducer: {
        root: rootReducer
    }
})