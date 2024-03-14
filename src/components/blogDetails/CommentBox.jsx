/* eslint-disable react/prop-types */
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useAvatar } from "../../hooks/useAvatar";

export default function CommentBox({ onAddComment }) {
  const [commentText, setCommentText] = useState("");

  const { avatar } = useAvatar();
  const { auth } = useAuth();

  return (
    <div className="flex items -center space-x-4">
      <div className="avater-img  text-white">
        {avatar ? (
          <img
            className="rounded-full"
            src={`${
              import.meta.env.VITE_SERVER_BASE_URL
            }/uploads/avatar/${avatar}`}
            alt={"user"}
          />
        ) : (
          <span className="bg-indigo-600">{auth?.user?.firstName[0]}</span>
        )}
      </div>

      <div className="w-full">
        <textarea
          className="w-full bg-[#030317] border border-slate-500 text-slate-300 p-4 rounded-md focus:outline-none"
          placeholder="Write a comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>

        <div className="flex justify-end mt-4">
          <button
            className={`bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200 ${
              commentText.trim() === "" && "opacity-40"
            }`}
            disabled={commentText.trim() === ""}
            onClick={() => onAddComment(commentText)}
          >
            Comment
          </button>
        </div>
      </div>
    </div>
  );
}
