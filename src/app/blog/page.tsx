import PostFeatures from '@/components/Blogs/PostComponent';
import PostCard from '@/components/Blogs/PostCard';
import BlogService from '@/service/blogService';
import { Blog } from "@/types/blog";

const BlogPage = async () => {
  const response = await BlogService.getListBlogs();
  const blogs: Blog[] = response;

  const featuredBlog = blogs[0];

  return (
    <div>
      {featuredBlog && <PostFeatures blog={featuredBlog} />}

      <div className="py-10 bg-white dark:bg-white">
        <h1 className="text-3xl font-bold text-gray-800 mx-24">All posts</h1>
        <div className="h-px bg-gray-200 my-4 mx-16" />

        {blogs.slice(1).map((blog) => (
          <PostCard
            id={blog._id}
            key={blog.titleEN}
            image={blog.image}
            category={blog.category}
            title={blog.titleEN}
            description={blog.summary}
            topic={blog.topic}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
