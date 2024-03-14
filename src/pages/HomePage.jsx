import axios from "axios";
import { useEffect, useRef, useState } from "react";
import BlogList from "../components/blog/BlogList";
import MostPopular from "../components/home/MostPopular";
import YourFavourites from "../components/home/YourFavourites";
import { useAuth } from "../hooks/useAuth";

const blogsPerPage = 10;

export default function HomePage() {
  const { auth } = useAuth();
  // console.log(auth.authToken);

  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  function onRemove(blogId) {
    const remainingBlogs = blogs.filter((blog) => blog.id !== blogId);
    setBlogs(remainingBlogs);
  }

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/blogs?page=${page}&limit=${blogsPerPage}`
        );

        const data = response.data;
        // console.log(data);
        if (data?.blogs?.length === 0) {
          setHasMore(false);
        } else {
          setBlogs((prevBlogs) => [...prevBlogs, ...data.blogs]);
          setPage((prevPage) => prevPage + 1);
        }
        setError(null);
      } catch (error) {
        console.log(error);
        setError(`Error loading blogs. ${error.message}`);
      }
    };

    const onIntersection = (items) => {
      const loaderItem = items[0];
      if (loaderItem.isIntersecting && hasMore) {
        fetchBlogs();
      }
    };

    const observer = new IntersectionObserver(onIntersection);

    if (observer && loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    //cleanup the observer
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [hasMore, page]);

  return (
    <main>
      <section>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
            <div className="space-y-3 md:col-span-5">
              <BlogList blogs={blogs} onRemove={onRemove}>
                <div ref={loaderRef} className="text-center text-lg py-2">
                  {hasMore && !error
                    ? "Loading more blogs..."
                    : "No more blogs to load."}
                </div>
                {error && <p>{error}</p>}
                {!error && blogs.length < 1 && <p>Blog list is empty!</p>}
              </BlogList>
            </div>

            <div className="md:col-span-2 h-full w-full space-y-5">
              <MostPopular />
              {auth?.authToken && <YourFavourites />}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
