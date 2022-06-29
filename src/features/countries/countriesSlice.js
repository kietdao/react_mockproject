import { createSlice } from "@reduxjs/toolkit";

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        countryList: null
    },
    reducers: {
        setCountrylist: (state,action) => {
            state.countryList = action.payload
        }
    }
})

export const { setCountrylist } = countriesSlice.actions

export default countriesSlice.reducer