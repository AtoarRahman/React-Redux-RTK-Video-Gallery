import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { nextPage, pageLimitUpdate, pageNumberUpdate, prevPage } from "../../features/pagination/paginationSlice";
import { fetchVideos } from "../../features/videos/videosSlice";

export default function Pagination() {
    const { startPage, pageLimit } = useSelector((state) => state.paginationVideos);
    const { videos } = useSelector((state) => state.videos);
    const { tags, search, author } = useSelector((state) => state.filter);
    const dispatch = useDispatch();
    const [totalVideos, setTotalVideos] = useState()

    useEffect(() => {
        setTotalVideos(videos.length)
    }, [videos])
    
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalVideos / pageLimit); i++) {
        pageNumbers.push(i);
    }

    const paginationHandler = (number) => {
        dispatch(fetchVideos({ tags, search, author }));
        dispatch(pageNumberUpdate(number)); 
    }

    const pageLimitHendler = (value) =>{
        dispatch(pageLimitUpdate(value));
        dispatch(fetchVideos({ tags, search, author }));
    }

    return (
        <section className="pt-12">
            <div className="max-w-7xl mx-auto px-5 py-6 lg:px-0 flex gap-2 justify-end">
                <div>
                    <select className="bg-gray-10 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-300 focus:border-blue-500 block w-full p-1  dark:border-gray-400 dark:placeholder-gray-400 dark:text-gray dark:focus:ring-blue-500 dark:focus:border-blue-300"
                     onChange={(e)=>pageLimitHendler(e.target.value)} value={pageLimit} >
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="12">12</option>
                        <option value="16">16</option>
                        <option value="20">20</option>
                        <option value="24">24</option>
                    </select>
                </div>
                <button className="bg-blue-500 text-white px-4 py-1 rounded-full cursor-pointer" disabled ={startPage === 1 && "disabled"} onClick={()=>dispatch(prevPage())} >{"< Prev"} </button>
                {pageNumbers.map(number => (
                    <div key={number} className={`${ startPage === number ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600'} px-4 py-1 rounded-full cursor-pointer`}
                     onClick={()=>paginationHandler(number)}>
                        {number}
                    </div>
                ))}
                <button className="bg-blue-500 text-white px-4 py-1 rounded-full cursor-pointer" disabled ={startPage === pageNumbers.length && "disabled"} onClick={()=>dispatch(nextPage())} >{"Next >"} </button>
            </div>
        </section>
    );
}
