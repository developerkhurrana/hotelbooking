import { configureStore } from "@reduxjs/toolkit";
import  HotelReducer  from './Reducers/HotelReducer';
import userReducer from "./Reducers/userReducer";

export const store = configureStore({
    reducer: {
        hotels: HotelReducer,
        user : userReducer
    }
})
