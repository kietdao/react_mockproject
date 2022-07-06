import { createSlice } from "@reduxjs/toolkit";

export const newsSlice = createSlice({
    name: 'news',
    initialState: {
        newsList: null
    },
    reducers: {
        setNewsList: (state, action) => {
            state.newsList = action.payload
        },
    }
})

export const { setNewsList } = newsSlice.actions

export default newsSlice.reducer