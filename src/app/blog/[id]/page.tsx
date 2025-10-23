'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BlogService from "@/service/blogService";
import { Blog } from "@/types/blog";
import PostCardVertical from "@/components/Blogs/PostCardVertical";
import LoadingOverlay from "@/app/loading";

export default function BlogDetailPage() {
    const params = useParams();
    const id = params.id as string;

    const [blog, setBlog] = useState<Blog | null>(null);
    const [suggestedBlogs, setSuggestedBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedBlog = await BlogService.getBlogById(id);
                const allBlogs = await BlogService.getListBlogs();

                setBlog(fetchedBlog);
                setSuggestedBlogs(
                    allBlogs.filter((item: any) => item._id !== id).slice(0, 3)
                );
            } catch (err) {
                console.error("Error loading blog", err);
            }
        };
        if (id) fetchData();
    }, [id]);

    if (!blog) return <LoadingOverlay />;

    const formattedDate = blog.createdDate
        ? new Date(blog.createdDate).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "Unknown date";

    const displayImage = blog.sub_image || blog.image;
    const contentVNWithBreaks = blog.contentVN?.replace(/\n/g, "<br />") || "";
    const contentENWithBreaks = blog.contentEN?.replace(/\n/g, "<br />") || "";

    return (
        <div className="max-w-3xl mx-auto py-10">
            <img
                src={displayImage}
                alt={blog.titleVN}
                className="w-full h-96 object-cover rounded-lg mb-6"
            />

            <p className="text-sm text-gray-600 mb-6">
                By{" "}
                <span className="text-[#592EA9] font-semibold">
                    {blog.author || "Unknown author"}
                </span>{" "}
                | {formattedDate}
            </p>

            {/* Vietnamese Section */}
            <h1 className="text-3xl font-bold mb-4">{blog.titleVN}</h1>

            <div
                className="prose prose-lg leading-relaxed"
                style={{ lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: contentVNWithBreaks }}
            />

            {/* Divider */}
            <div className="h-px bg-gray-200 my-8" />

            {/* English Section */}
            <h1 className="text-3xl font-bold mb-4">{blog.titleEN}</h1>

            <div
                className="prose prose-lg leading-relaxed"
                style={{ lineHeight: '1.8' }}
                dangerouslySetInnerHTML={{ __html: contentENWithBreaks }}
            />

            <div className="h-px bg-gray-200 my-8" />
            <h3 className="text-2xl font-medium mb-8">What to read next</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {suggestedBlogs.map((item) => (
                    <PostCardVertical
                        key={item._id}
                        id={item._id}
                        image={item.image}
                        category={item.category}
                        title={item.titleEN}
                        description={item.summary}
                    />
                ))}
            </div>
        </div>
    );
}