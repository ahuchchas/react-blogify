/* eslint-disable react/prop-types */

import { useNavigate } from "react-router-dom";

export default function ResultCard({ blog, onClose }) {
  const navigate = useNavigate();
  return (
    <div className="flex gap-6 py-2">
      <img
        className="h-28 object-contain"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
          blog?.thumbnail
        }`}
        alt="blog thumb"
      />
      <div className="mt-2">
        <h3
          className="text-slate-300 text-xl font-bold cursor-pointer"
          onClick={() => {
            onClose();
            navigate(`/blogDetails/${blog?.id}`);
          }}
        >
          {blog?.title}
        </h3>

        <p className="mb-6 text-sm text-slate-500 mt-1">
          {blog?.content?.substring(0, 200) + "..."}
        </p>
      </div>
    </div>
  );
}
