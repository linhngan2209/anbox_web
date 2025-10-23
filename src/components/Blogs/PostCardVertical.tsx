"use client";

import React from "react";
import Link from "next/link";

interface PostCardProps {
    id: string;
    image: string;
    category?: string;
    title: string;
    description: string;
}

const PostCardVertical: React.FC<PostCardProps> = ({
    id,
    image,
    category,
    title,
    description,
}) => {
    return (
        <Link href={`/blog/${id}`}>
            <div className="group cursor-pointer rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 bg-white border border-gray-100 h-100 flex flex-col">
                <div className="w-full h-48 overflow-hidden flex-shrink-0">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    />
                </div>

                <div className="p-4 flex flex-col flex-1">
                    {category && (
                        <span className="text-xs text-[#592EA9] font-semibold mb-2 uppercase">
                            {category}
                        </span>
                    )}
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 flex-shrink-0">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3 overflow-hidden">{description}</p>
                </div>
            </div>
        </Link>
    );
};

export default PostCardVertical;