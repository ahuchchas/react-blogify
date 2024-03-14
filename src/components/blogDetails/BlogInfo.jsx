import { Link } from "react-router-dom";
import { getFormattedDate } from "../../utils/getFormattedDate";
import { getTagsArray } from "../../utils/getFormattedTags";

/* eslint-disable react/prop-types */
export default function BlogInfo({ blog }) {
  return (
    <section>
      <div className="container text-center py-8">
        <h1 className="font-bold text-3xl md:text-5xl">{blog?.title}</h1>
        <div className="flex justify-center items-center my-4 gap-4">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img text-white">
              {blog?.author?.avatar ? (
                <img
                  className="rounded-full"
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/uploads/avatar/${blog?.author?.avatar}`}
                  alt={blog?.author?.firstName}
                />
              ) : (
                <span className="bg-indigo-600">
                  {blog?.author?.firstName[0]}
                </span>
              )}
            </div>
            <h5 className="text-slate-500 text-sm">
              <Link to={`/profile/${blog?.author?.id}`}>
                {blog?.author?.firstName} {blog?.author?.lastName}
              </Link>
            </h5>
          </div>
          <span className="text-sm text-slate-700 dot">
            {getFormattedDate(blog?.createdAt)}
          </span>
          <span className="text-sm text-slate-700 dot">
            {blog?.likes?.length} Likes
          </span>
        </div>
        <img
          className="mx-auto w-full md:w-8/12 object-cover h-80 md:h-96"
          src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
            blog?.thumbnail
          }`}
          alt="blog thumbnail"
        />

        <ul className="tags">
          {blog?.tags &&
            getTagsArray(blog?.tags).map((tag) => <li key={tag}>{tag}</li>)}
        </ul>

        <div className="mx-auto w-full md:w-10/12 text-slate-300 text-base md:text-lg leading-8 py-2 !text-left">
          {blog?.content}
        </div>
      </div>
    </section>
  );
}
