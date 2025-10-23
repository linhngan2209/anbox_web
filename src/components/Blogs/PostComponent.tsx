"use client";

import { Blog } from '@/types/blog';
import { slugify } from '@/utils/slugify';
import React from 'react';
import { useRouter } from 'next/navigation';
type PostFeaturesProps = {
  blog: Blog;
};

const PostFeatures: React.FC<PostFeaturesProps> = ({ blog }) => {
  const router = useRouter();
  const formattedDate = new Date(blog.createdDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleReadMore = () => {
    router.push(`/blog/${blog._id}`);
  };
  return (
    <section className="bg-[#F4F0F8] py-16 px-6 md:px-24">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4">
        <div className="w-full md:w-1/2 xl:w-1/2 text-center md:text-left">
          <p className="text-[#232536] text-sm font-medium uppercase mb-2">{"Featured Post"}</p>
          <h3 className="text-2xl md:text-3xl font-bold leading-snug text-[#232536] mb-4">
            {blog.titleEN || "Untitled Blog"}
          </h3>
          <p className="text-sm text-[#696984] mb-2">
            By <span className="text-[#592EA9] font-semibold">{blog.author}</span> | {formattedDate}
          </p>
          <p className="text-[#6D6E76] mb-6">
            {blog.summary}
          </p>

          <button
            onClick={handleReadMore}
            className="bg-[#FBA333] hover:bg-orange-500 text-black font-semibold py-2 px-6 rounded-lg flex items-center gap-1 transition duration-200 mx-auto md:mx-0">
            Read More <span className="text-lg">{'>'}</span>
          </button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center">
          <div className="w-full max-w-md p-2">
            <img
              src={blog.image}
              alt="Post"
              className="rounded-md object-cover w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PostFeatures;
