import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


export const login = createAsyncThunk("login", async(payload, {rejectWithValue})=>{
    
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/login`,payload,{withCredentials:true});
        const result = response.data.data.details
        console.log(result,"user login action")
            localStorage.setItem("user", JSON.stringify(result))
            // localStorage.setItem("token", JSON.stringify(result))
        return result
    } catch (error) {
        // console.log(rejectWithValue(error))
        return rejectWithValue(error.response.data.message)
    }
})

export const register = createAsyncThunk("register", async(payload, {rejectWithValue})=>{
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,payload);
    try {
        const result = response.data.data
        console.log(result,"user register action")
        return result
        
    } catch (error) {
        console.log(error.response.data.message,"error bta")
        return rejectWithValue(error.response.data.message)
    }
});