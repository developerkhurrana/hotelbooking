import { createSlice } from '@reduxjs/toolkit'

const hotelSlice = createSlice({
    name: "user",
    initialState: {
        city: '',
        date: [],
        options: {
            adult: 1,
            children: 0,
            room: 1,
        },
    },
    reducers: {
        searchData: (state, action) => {
            console.log(action,"action")
                state.city = action.payload.destination,
                state.date = action.payload.date,
                state.options = {
                    adult: action.payload.options.adult,
                    children: action.payload.options.children,
                    room: action.payload.options.room,
                }
        }
    },

    extraReducers: {}
})

export default hotelSlice.reducer
export const {searchData} = hotelSlice.actions
