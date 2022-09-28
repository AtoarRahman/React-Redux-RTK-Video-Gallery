import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "../features/filter/filterSlice";
import likeReducer from "../features/like/likeSlice";
import paginationVideosReducer from "../features/pagination/paginationSlice";
import relatedVideosReducer from "../features/relatedVideos/relatedVideosSlice";
import tagsReducer from "../features/tags/tagsSlice";
import unlikeReducer from "../features/unlike/unlikeSlice";
import videoReducer from "../features/video/videoSlice";
import videosReducer from "../features/videos/videosSlice";

export const store = configureStore({
    reducer: {
        videos: videosReducer,
        tags: tagsReducer,
        video: videoReducer,
        relatedVideos: relatedVideosReducer,
        filter: filterReducer,
        videoLikes: likeReducer,
        videoUnlikes: unlikeReducer,
        paginationVideos: paginationVideosReducer,
    },
});
