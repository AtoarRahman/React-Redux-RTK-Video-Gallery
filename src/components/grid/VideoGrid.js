import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../../features/videos/videosSlice";

import Loading from "../ui/Loading";
import VideoGridItem from "./VideoGridItem";

export default function VideGrid() {
    const dispatch = useDispatch();
    const { videos, isLoading, isError, error } = useSelector(
        (state) => state.videos
    );
    const { tags, search, author } = useSelector((state) => state.filter);
    const { startPage, pageLimit } = useSelector((state) => state.paginationVideos);

    useEffect(() => {
        dispatch(fetchVideos({ tags, search, author }));
    }, [dispatch, tags, search, author]);


    // Get current videos
  const indexOfLasVideo = startPage * pageLimit;
  const indexOfFirsVideo = indexOfLasVideo - pageLimit;
  const currenVideos = videos.slice(indexOfFirsVideo, indexOfLasVideo);

    // decide what to render
    let content;

    if (isLoading) content = <Loading />;
    if (!isLoading && isError)
        content = <div className="col-span-12">{error}</div>;

    if (!isError && !isLoading && videos?.length === 0) {
        content = <div className="col-span-12">No videos found!</div>;
    }

    if (!isError && !isLoading && videos?.length > 0) {
        content = currenVideos.map((video) => (
            <VideoGridItem key={video.id} video={video} />
        ));
    }

    return (
        <section className="pt-8">
            <div className="grid grid-cols-12 gap-4 max-w-7xl mx-auto px-5 lg:px-0 min-h-[300px]">
                {content}
            </div>
        </section>
    );
}
