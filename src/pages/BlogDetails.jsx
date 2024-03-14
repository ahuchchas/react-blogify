import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BlogInfo from "../components/blogDetails/BlogInfo";
import Comment from "../components/blogDetails/Comment";
import CommentBox from "../components/blogDetails/CommentBox";
import { useAuth } from "../hooks/useAuth";
import { useAxios } from "../hooks/useAxios";

import CommentIcon from "../assets/icons/comment.svg";
import HeartFilled from "../assets/icons/heart-filled.svg";
import HeartIcon from "../assets/icons/heart.svg";
import LikeIcon from "../assets/icons/like.svg";
import LikeFilled from "../assets/icons/likeFill.svg";

export default function BlogDetails() {
  const [blog, setBlog] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const { blogId } = useParams();
  const { api } = useAxios();
  const { auth } = useAuth();

  useEffect(() => {
    async function fetchBlog() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}`
        );

        if (response.status === 200) {
          // console.log(response.data);
          setBlog(response.data);
          //check isLiked?
          auth?.authToken &&
            response.data?.likes.map((u) => {
              if (u.id === auth?.user?.id) {
                setIsLiked(true);
              }
            });
        }
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(`Error loading blog details. ${error.message}`);
      }
    }
    fetchBlog();

    async function getFavs() {
      try {
        const response = await api.get(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/favourites`
        );

        if (response.status === 200) {
          // console.log(response.data?.blogs);
          response.data?.blogs.map((b) => {
            if (b.id === blogId) {
              setIsFav(true);
            }
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
    auth?.authToken && getFavs();
  }, []);

  async function handleDeleteComment(commentId) {
    const isSure = window.confirm("Delete the comment?");
    if (isSure) {
      try {
        const response = await api.delete(
          `${
            import.meta.env.VITE_SERVER_BASE_URL
          }/blogs/${blogId}/comment/${commentId}`
        );

        if (response.status === 200) {
          console.log(response.data);
          setBlog(response.data);
          alert("Comment Deleted.");
        }
      } catch (error) {
        console.log(error);
        alert(`Error deleting comment. ${error.message}`);
      }
    }
  }

  async function handleAddComment(commentText) {
    // console.log(commentText);
    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/comment`,
        { content: commentText }
      );

      if (response.status === 200) {
        // console.log(response.data);
        setBlog(response.data);
        alert("Comment Added.");
      }
    } catch (error) {
      console.log(error);
      alert(`Error adding comment. ${error.message}`);
    }
  }

  async function handleLike() {
    if (!auth?.authToken) {
      alert("Please log in to like the blog.");
      return;
    }

    try {
      const response = await api.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/like`
      );

      if (response.status === 200) {
        // console.log(response.data);
        setIsLiked(response.data.isLiked);
        setBlog({
          ...blog,
          likes: response.data.likes,
        });
      }
    } catch (error) {
      console.log(error);
      alert(`Error in like blog. ${error.message}`);
    }
  }

  async function handleFav() {
    if (!auth?.authToken) {
      alert("Please log in to toggle favorite.");
      return;
    }

    try {
      const response = await api.patch(
        `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blogId}/favourite`
      );

      if (response.status === 200) {
        // console.log(response.data);
        setIsFav(response.data.isFavourite);
      }
    } catch (error) {
      console.log(error);
      alert(`Error in toggle favorite. ${error.message}`);
    }
  }

  if (loading) {
    return <p className="text-center text-xl mt-12">Loading Blog Details...</p>;
  }
  if (error) {
    return <p className="text-center text-xl mt-12">{error}</p>;
  }

  return (
    <>
      <main>
        <BlogInfo blog={blog} />

        {/* <!-- Begin Comments --> */}
        <section id="comments">
          <div className="mx-auto w-full md:w-10/12 container">
            <h2 className="text-3xl font-bold my-8">
              Comments ({blog?.comments?.length})
            </h2>

            {auth?.authToken && <CommentBox onAddComment={handleAddComment} />}

            {blog?.comments &&
              blog?.comments.map((comment) => (
                <Comment
                  key={comment?.id}
                  comment={comment}
                  onDeleteComment={handleDeleteComment}
                />
              ))}
          </div>
        </section>
      </main>

      {/* <!-- Floating Actions--> */}
      <div className="floating-action">
        <ul className="floating-action-menus">
          <li onClick={handleLike}>
            <img src={isLiked ? LikeFilled : LikeIcon} alt="like" />
            <span>{blog?.likes?.length}</span>
          </li>

          <li onClick={handleFav}>
            <img src={isFav ? HeartFilled : HeartIcon} alt="Favourite" />
          </li>
          <a href="#comments">
            <li>
              <img src={CommentIcon} alt="Comments" />
              <span>{blog?.comments?.length}</span>
            </li>
          </a>
        </ul>
      </div>
    </>
  );
}
