const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
    tags: [],
    search: "",
    author:'',
};

const filterSlice = createSlice({
    name: "video",
    initialState,
    reducers: {
        tagSelected: (state, action) => {
            state.tags.push(action.payload);
        },
        tagSelecteRemoved: (state, action) => {
            state.tags = [];
        },
        tagRemoved: (state, action) => {
            const indexToRemove = state.tags.indexOf(action.payload);

            if (indexToRemove !== -1) {
                state.tags.splice(indexToRemove, 1);
            }
        },
        searched: (state, action) => {
            state.search = action.payload;
        },
        searchRemoved: (state, action) => {
            state.search = "";
        },
        authorSelected: (state, action) => {
            state.author = action.payload;
        },
        authorRemoved: (state, action) => {
            state.author = "";
        }
    },
});

export default filterSlice.reducer;
export const { tagSelected, tagSelecteRemoved, tagRemoved, searched, searchRemoved, authorSelected, authorRemoved } = filterSlice.actions;
