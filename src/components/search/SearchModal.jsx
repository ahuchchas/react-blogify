/* eslint-disable react/prop-types */
import { useState } from "react";
import CloseIcon from "../../assets/icons/close.svg";
import { useAxios } from "../../hooks/useAxios";
import useDebounce from "../../hooks/useDebounce";
import ResultCard from "./ResultCard";

export default function SearchModal({ onClose }) {
  const [resultBlogs, setResultBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  const { api } = useAxios();

  const debouncedSearch = useDebounce(async (query) => {
    // console.log(query);
    if (query.trim() === "") {
      setResultBlogs([]);
      setLoading(false);
      return;
    }
    try {
      const response = await api.get(
        `${import.meta.env.VITE_SERVER_BASE_URL}/search?q=${query}`
      );

      if (response.status === 200) {
        // console.log(response.data.data);
        setResultBlogs(response.data.data);
      }
    } catch (error) {
      if (error.response.status === 404) {
        setResultBlogs([]);
      } else {
        console.log(`Error in searching blogs. ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  }, 500);

  const handleSearch = (query) => {
    setLoading(true);
    debouncedSearch(query);
  };

  return (
    <section className="fixed left-0 top-0 w-full h-full grid place-items-center bg-slate-800/50 backdrop-blur-sm z-50">
      <div className="relative w-6/12 mx-auto bg-slate-900 p-4 border border-slate-600/50 rounded-lg shadow-lg shadow-slate-400/10">
        <div>
          <h3 className="font-bold text-xl pl-2 text-slate-400 my-2">
            Search for Your Desired Blogs
          </h3>
          <input
            className="w-full bg-transparent p-2 text-base text-white outline-none border-none rounded-lg focus:ring focus:ring-indigo-600"
            placeholder="Start Typing to Search"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {/* <!-- Search Result --> */}
        <div className="">
          <h3 className="text-slate-400 font-bold mt-6">Search Results</h3>
          <div className="my-4 divide-y-2 divide-slate-500/30 max-h-[440px] overflow-y-scroll overscroll-contain">
            {loading && <p>Searching...</p>}
            {!loading && resultBlogs?.length < 1 && <p>No blogs found!</p>}
            {resultBlogs.map((blog) => (
              <ResultCard key={blog.id} blog={blog} onClose={onClose} />
            ))}
          </div>
        </div>
        {/* close search modal */}
        <img
          src={CloseIcon}
          alt="Close"
          className="absolute right-2 top-2 cursor-pointer w-8 h-8"
          onClick={onClose}
        />
      </div>
    </section>
  );
}
