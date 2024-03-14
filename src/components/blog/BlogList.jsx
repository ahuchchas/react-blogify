/* eslint-disable react/prop-types */
import BlogCard from "./BlogCard";

export default function BlogList({ blogs, children, onRemove }) {
  return (
    <>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} blog={blog} onRemove={onRemove} />
      ))}

      {children}
    </>
  );
}
