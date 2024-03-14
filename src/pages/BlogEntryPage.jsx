import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

export default function BlogEntryPage() {
  const [thumbnail, setThumbnail] = useState(null);
  const [thumError, setThumbError] = useState(null);
  const imageRef = useRef(null);
  const { api } = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const isEditing = !!location?.state;
  const blog = location?.state;

  // console.log(isEditing, blog);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function handleImageChange(e) {
    // console.log(imageRef.current.files[0]);
    setThumbnail(e.target.files[0]);
    setThumbError(null);
  }
  async function submitForm(data) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("tags", data.tags);
    formData.append("content", data.content);

    if (thumbnail) {
      formData.append("thumbnail", thumbnail);
    }

    // console.log([...formData.entries()]);

    if (!isEditing) {
      // create blog request
      if (!thumbnail) {
        setThumbError("A Thumbnail is required");
        return;
      }
      try {
        const response = await api.post(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/`,
          formData
        );

        if (response.status === 201) {
          const newBlogId = response.data?.blog?.id;
          alert(`Blog Successfully created.`);
          navigate(`/blogDetails/${newBlogId}`);
        }
      } catch (error) {
        console.log(error);
        alert(`Error Creating the blog. ${error.message}`);
      }
    } else {
      //update blog request
      try {
        const response = await api.patch(
          `${import.meta.env.VITE_SERVER_BASE_URL}/blogs/${blog?.id}`,
          formData
        );

        if (response.status === 200) {
          alert(`Blog Successfully Updated.`);
          navigate(-1);
        }
      } catch (error) {
        console.log(error);
        alert(`Error Updating the blog. ${error.message}`);
      }
    }
  }

  return (
    <main>
      <section>
        <div className="container">
          <form className="createBlog" onSubmit={handleSubmit(submitForm)}>
            <div className="grid place-items-center bg-slate-600/20 h-[150px] rounded-md my-4 overflow-hidden">
              <div className="flex items-center gap-4 hover:scale-110 transition-all cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                <p onClick={() => imageRef.current.click()}>
                  Upload Your Image
                </p>
              </div>
              {thumbnail && (
                <p className=" ">Current Selection: {thumbnail.name}</p>
              )}
            </div>
            <div className="mb-6">
              <input
                ref={imageRef}
                onChange={handleImageChange}
                type="file"
                name="thumbnail"
                id="thumbnail"
                hidden
              />
              {thumError && <p className="text-red-500">{thumError}</p>}
            </div>

            <div className="mb-6">
              <input
                {...register("title", { required: "title is required" })}
                defaultValue={blog?.title}
                type="text"
                id="title"
                name="title"
                placeholder="Enter your blog title"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="mb-6">
              <input
                {...register("tags", { required: "tags are required" })}
                defaultValue={blog?.tags}
                type="text"
                id="tags"
                name="tags"
                placeholder="Your Comma Separated Tags Ex. JavaScript, React, Node, Express,"
              />
              {errors.tags && (
                <p className="text-red-500">{errors.tags.message}</p>
              )}
            </div>

            <div className="mb-6">
              <textarea
                {...register("content", { required: "content is required" })}
                defaultValue={blog?.content}
                id="content"
                name="content"
                placeholder="Write your blog content"
                rows="8"
              ></textarea>
              {errors.content && (
                <p className="text-red-500">{errors.content.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="bg-indigo-600 text-white px-6 py-2 md:py-3 rounded-md hover:bg-indigo-700 transition-all duration-200"
            >
              {isEditing ? "Save Edits" : "Create Blog"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
