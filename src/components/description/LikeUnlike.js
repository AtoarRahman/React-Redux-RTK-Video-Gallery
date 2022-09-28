import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import likeImage from "../../assets/like.svg";
import unlikeImage from "../../assets/unlike.svg";
import { updateVideoLikes } from "../../features/like/likeSlice";
import { updateVideoUnlikes } from "../../features/unlike/unlikeSlice";

export default function LikeUnlike({id, likes, unlikes}) {
    const dispatch = useDispatch();
    const {videoLikes} = useSelector((state) => state.videoLikes);
    const {videoUnlikes} = useSelector((state) => state.videoUnlikes);

    const likeValue = videoLikes > 0 ? videoLikes : likes
    const unlikeValue = videoUnlikes > 0 ? videoUnlikes : unlikes

    const likedVideo = useCallback(() => {
        dispatch(updateVideoLikes({ id, likeValue }));
    }, [dispatch, id, likeValue]);

    const unlikedVideo = useCallback(() => {
        dispatch(updateVideoUnlikes({ id, unlikeValue }));
    }, [dispatch, id, unlikeValue]);

    return (
        <div className="flex gap-10 w-48">
            <div className="flex gap-1">
                <div className="shrink-0">
                    <img className="w-5 block cursor-pointer" src={likeImage} alt="Like" onClick={likedVideo} />
                </div>
                <div className="text-sm leading-[1.7142857] text-slate-600">
                    { likeValue}
                </div>
            </div>
            <div className="flex gap-1"  >
                <div className="shrink-0">
                    <img className="w-5 block cursor-pointer" src={unlikeImage} alt="Unlike" onClick={unlikedVideo}/>
                </div>
                <div className="text-sm leading-[1.7142857] text-slate-600">
                    {unlikeValue}
                </div>
            </div>
        </div>
    );
}
