import { createSlice } from "@reduxjs/toolkit";

export const countriesSlice = createSlice({
    name: 'countries',
    initialState: {
        allData: null,
        chartData: null,
        countryList: null
    },
    reducers: {
        setCountrylist: (state,action) => {
            state.countryList = action.payload
        },
        setAllData: (state, action) => {
            state.allData = action.payload
        },
        setChartData: (state, action) => {
            state.chartData = action.payload
        }
    }
})

export const { setCountrylist,  setAllData, setChartData } = countriesSlice.actions

export default countriesSlice.reducer