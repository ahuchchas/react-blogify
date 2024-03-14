import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MostPopular() {
  const [popularBlogs, setPopularBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularBlogs = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/popular`
        );

        if (response.status === 200) {
          //   console.log(response.data?.blogs);
          setPopularBlogs(response.data?.blogs);
        }
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(`Error loading popular blogs. ${error.message}`);
      }
    };

    fetchPopularBlogs();
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Most Popular 👍️
      </h3>

      <ul className="space-y-5 my-5">
        {loading && <li>Loading popular blogs...</li>}
        {error && <li>{error}</li>}
        {!error && popularBlogs.length < 1 && (
          <p>Popular Blog list is empty!</p>
        )}
        {popularBlogs.map((blog) => (
          <li key={blog?.id}>
            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
              <Link to={`/blogDetails/${blog?.id}`}>{blog?.title}</Link>
            </h3>
            <p className="text-slate-600 text-sm">
              by{" "}
              <Link to={`/profile/${blog?.author?.id}`}>
                {blog?.author?.firstName} {blog?.author?.lastName}
              </Link>
              <span>·</span> {blog?.likes?.length} Likes
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
