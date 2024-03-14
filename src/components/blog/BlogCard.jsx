/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ThreeDot from "../../assets/icons/3dots.svg";
import DeleteIcon from "../../assets/icons/delete.svg";
import EditIcon from "../../assets/icons/edit.svg";
import { useAuth } from "../../hooks/useAuth";
import { useAxios } from "../../hooks/useAxios";
import { getFormattedDate } from "../../utils/getFormattedDate";

export default function BlogCard({ blog, onRemove }) {
  const [showAction, setShowAction] = useState(false);
  const { auth } = useAuth();
  const { api } = useAxios();
  const navigate = useNavigate();
  const isMyBlog = auth?.user?.id === blog?.author?.id;

  const handleDelete = async () => {
    const isSure = window.confirm(`Are you sure to delete '${blog.title}'?`);

    if (isSure) {
      try {
        const response = await api.delete(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog.id}`
        );

        if (response.status === 200) {
          setShowAction(false);
          onRemove(blog.id);
          alert("Succesfully deleted the blog.");
        }
      } catch (error) {
        console.log(error);
        alert(`Error deleting the blog. ${error.message}`);
      }
    }
  };

  return (
    <div
      className="blog-card"
      onClick={() => {
        navigate(`/blogDetails/${blog?.id}`);
      }}
    >
      <img
        className="blog-thumb"
        src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/blog/${
          blog?.thumbnail
        }`}
        alt="blog-thumb"
      />
      <div className="mt-2 relative">
        <h3 className="text-slate-300 text-xl lg:text-2xl">{blog?.title}</h3>

        <p className="mb-6 text-base text-slate-500 mt-1">
          {blog?.content?.substring(0, 200) + "..."}
        </p>

        {/* <!-- Meta Informations --> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center capitalize space-x-2">
            <div className="avater-img bg-indigo-600 text-white">
              {blog?.author?.avatar ? (
                <img
                  className="rounded-full"
                  src={`${
                    import.meta.env.VITE_SERVER_BASE_URL
                  }/uploads/avatar/${blog?.author?.avatar}`}
                  alt={blog?.author?.firstName}
                />
              ) : (
                <span>{blog?.author?.firstName[0]}</span>
              )}
            </div>

            <div>
              <h5
                className="text-slate-500 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/profile/${blog?.author?.id}`);
                }}
              >
                {blog?.author?.firstName} {blog?.author?.lastName}
              </h5>
              <div className="flex items-center text-xs text-slate-700">
                <span>{getFormattedDate(blog?.createdAt)}</span>
              </div>
            </div>
          </div>

          <div className="text-sm px-2 py-1 text-slate-700">
            <span>{blog?.likes.length} Likes</span>
          </div>
        </div>

        <div className="absolute right-0 top-0">
          {isMyBlog && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowAction(!showAction);
              }}
            >
              <img src={ThreeDot} alt="3dots of Action" />
            </button>
          )}
          {showAction && (
            <div className="action-modal-container">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/blogEntry`, { state: blog });
                }}
                className="action-menu-item hover:text-lwsGreen"
              >
                <img src={EditIcon} alt="Edit" />
                Edit
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                className="action-menu-item hover:text-red-500"
              >
                <img src={DeleteIcon} alt="Delete" />
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
