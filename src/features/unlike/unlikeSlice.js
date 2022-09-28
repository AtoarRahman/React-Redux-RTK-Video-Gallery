import { unlikedVideo } from "./unlikeAPI";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
    videoUnlikes: 0,
    isLoading: false,
    isError: false,
    error: "",
};

// async thunk
export const updateVideoUnlikes = createAsyncThunk(
    "unlikedVideo/updateVideoUnlikes",
    async ({ id, unlikeValue }) => {
        const result = await unlikedVideo( id, unlikeValue );
        return result;
    }
);

const unlikeSlice = createSlice({
    name: "unlike",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(updateVideoUnlikes.pending, (state) => {
                state.isError = false;
                state.isLoading = true;
            })
            .addCase(updateVideoUnlikes.fulfilled, (state, action) => {
                state.videoUnlikes = action.payload.unlikes++;
                state.isLoading = false;
            })
            .addCase(updateVideoUnlikes.rejected, (state, action) => {
                state.isLoading = false;
                state.videoUnlikes = 0;
                state.isError = true;
                state.error = action.error?.message;
            });
    },
});

export default unlikeSlice.reducer;
