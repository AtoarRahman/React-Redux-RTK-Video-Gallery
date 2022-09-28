const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    startPage: 1,
    pageLimit: 8,
};


const paginationVideosSlice = createSlice({
    name: "paginationVideos",
    initialState,
    reducers: {
        pageNumberUpdate: (state, action) => {
            state.startPage = action.payload;
        },
        pageLimitUpdate: (state, action) => {
            state.pageLimit = action.payload;
        },
        prevPage: (state, action) => {
            state.startPage = state.startPage - 1;
        },
        nextPage: (state, action) => {
            state.startPage = state.startPage + 1;
        },
        resetPagination: (state, action) => {
            state.startPage = 1;
            state.pageLimit = 8;
        },
    },
});

export default paginationVideosSlice.reducer;
export const { pageNumberUpdate, pageLimitUpdate, resetPagination, prevPage, nextPage } = paginationVideosSlice.actions;
