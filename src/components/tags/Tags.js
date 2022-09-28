import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authorRemoved, searchRemoved, tagSelecteRemoved } from "../../features/filter/filterSlice";
import { resetPagination } from "../../features/pagination/paginationSlice";
import { fetchTags } from "../../features/tags/tagsSlice";
import { fetchVideos } from '../../features/videos/videosSlice';
import Tag from "./Tag";

export default function Tags() {
    const { tags } = useSelector((state) => state.tags);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTags());
    }, [dispatch]);

    const resetHandler = () =>{
        dispatch(fetchVideos({tags: [], search: "", author: ""}));
        dispatch(tagSelecteRemoved());
        dispatch(authorRemoved());
        dispatch(searchRemoved());
        dispatch(resetPagination());
    }

    return tags?.length > 0 ? (
        <section>
            <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 border-b overflow-y-auto relative">
                {tags.map((tag) => (
                    <Tag key={tag.id} title={tag.title} />
                ))}

                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full absolute right-0"
                onClick={resetHandler}>
                    Reset All
                </button>
            </div>
            
        </section>
    ) : null;
}
