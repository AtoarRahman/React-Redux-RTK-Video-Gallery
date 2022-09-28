import { likedVideo } from "./likeAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    videoLikes: 0,
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const updateVideoLikes = createAsyncThunk(
    "likedVideo/updateVideoLikes",
    async ({ id, likeValue }) => {
        const result = await likedVideo( id, likeValue );
        return result;
    }
);

const likeSlice = createSlice({
    name: "like",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(updateVideoLikes.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateVideoLikes.fulfilled, (state, action) => {
                state.videoLikes = action.payload.likes++;
                state.isLoading = false;
            })
            .addCase(updateVideoLikes.rejected, (state, action) => {
                state.isLoading = false;
                state.videoLikes = 0;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default likeSlice.reducer;
