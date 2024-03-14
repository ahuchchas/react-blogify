import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/icons/delete.svg";
import { useAuth } from "../../hooks/useAuth";

/* eslint-disable react/prop-types */
export default function Comment({ comment, onDeleteComment }) {
  const { auth } = useAuth();
  const isMyComment = comment?.author?.id === auth?.user?.id;

  return (
    <div className="flex items-start space-x-4 my-8">
      <div className="avater-img text-white">
        {comment?.author?.avatar ? (
          <img
            className="rounded-full"
            src={`${import.meta.env.VITE_SERVER_BASE_URL}/uploads/avatar/${
              comment?.author?.avatar
            }`}
            alt={comment?.author?.firstName}
          />
        ) : (
          <span className="bg-orange-600">{comment?.author?.firstName[0]}</span>
        )}
      </div>
      <div className="w-full flex justify-between">
        <div>
          <h5 className="text-slate -500 font-bold">
            <Link to={`/profile/${comment?.author?.id}`}>
              {comment?.author?.firstName} {comment?.author?.lastName}
            </Link>
          </h5>
          <p className="text-slate-300">{comment?.content}</p>
        </div>
        {isMyComment && (
          <img
            className=" cursor-pointer"
            src={DeleteIcon}
            alt="delete"
            onClick={() => onDeleteComment(comment?.id)}
          />
        )}
      </div>
    </div>
  );
}
