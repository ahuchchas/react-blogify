import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAxios } from "../../hooks/useAxios";
import { getFormattedHashTags } from "../../utils/getFormattedTags";

export default function YourFavourites() {
  const [favBlogs, setFavBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { api } = useAxios();

  useEffect(() => {
    const fetchFavBlogs = async () => {
      try {
        setLoading(true);
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
        );

        if (response.status === 200) {
          //   console.log(response.data?.blogs);
          setFavBlogs(response.data?.blogs);
        }
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(`Error loading favourite blogs. ${error.message}`);
      }
    };

    fetchFavBlogs();
  }, []);

  return (
    <div className="sidebar-card">
      <h3 className="text-slate-300 text-xl lg:text-2xl font-semibold">
        Your Favourites ❤️
      </h3>

      <ul className="space-y-5 my-5">
        {loading && <li>Loading favourite blogs...</li>}
        {error && <li>{error}</li>}
        {!error && favBlogs.length < 1 && <p>Favourite Blog list is empty!</p>}
        {favBlogs.map((blog) => (
          <li key={blog?.id}>
            <h3 className="text-slate-400 font-medium hover:text-slate-300 transition-all cursor-pointer">
              <Link to={`/blogDetails/${blog?.id}`}>{blog?.title}</Link>
            </h3>
            <p className="text-slate-600 text-sm">
              {getFormattedHashTags(blog?.tags)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
