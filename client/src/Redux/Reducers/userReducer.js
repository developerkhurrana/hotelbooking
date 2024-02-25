import { createSlice } from '@reduxjs/toolkit'
import { login, register} from '../Actions/userAction'

const userSlice = createSlice({
    name: "user",
    initialState:{
        currentUser:JSON.parse(localStorage.getItem("user") || null),
        loading: false,
        error: null
    },
    reducers:{
        userLogOut: (state)=>{
            state.currentUser = null
            localStorage.removeItem("user")
        }
    },

    extraReducers:{
        [login.pending]:(state)=>{
            state.loading = true
        },
        [login.fulfilled]:(state,action)=>{
            state.loading = false;
            state.currentUser = action.payload
            state.error = null
        },
        [login.rejected]:(state,action)=>{
            console.log(action.payload,"error in reducer")
            state.loading = false;
            state.error = action.payload
        },
        [register.pending]:(state)=>{
            state.loading = true;
        },
        [register.fulfilled]:(state,action)=>{
            state.loading = false;
            state.error = null
        },
        [register.rejected]:(state,action)=>{
            state.loading = false;
            state.error = action.payload
        }
    }
})

export const {userLogOut} = userSlice.actions   
export default userSlice.reducer