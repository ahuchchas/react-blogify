import { useProfile } from "../../hooks/useProfile";
import BlogList from "../blog/BlogList";

export default function ProfileBlogs() {
  const { profile, setProfile } = useProfile();
  const blogs = profile?.user?.blogs;

  function onRemove(blogId) {
    const remainingBlogs = blogs.filter((blog) => blog.id !== blogId);
    setProfile({
      ...profile,
      user: {
        ...profile.user,
        blogs: remainingBlogs,
      },
    });
  }

  return (
    <>
      <h4 className="mt-6 text-xl lg:mt-8 lg:text-2xl">My Blogs</h4>
      <div className="my-6 space-y-4">
        {blogs && (
          <BlogList blogs={blogs} onRemove={onRemove}>
            {blogs.length < 1 && <p>My Blog list is empty!</p>}
          </BlogList>
        )}
      </div>
    </>
  );
}
