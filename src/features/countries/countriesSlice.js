import { createSlice } from "@reduxjs/toolkit";

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        allData: null,
        countryList: null
    },
    reducers: {
        setCountrylist: (state,action) => {
            state.countryList = action.payload
        },
        setAllData: (state, action) => {
            state.allData = action.payload
        }
    }
})

export const { setCountrylist,  setAllData } = countriesSlice.actions

export default countriesSlice.reducer