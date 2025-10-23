import React from 'react';
import Link from 'next/link';

interface PostCardProps {
    id: string;
    image: string;
    category?: string;
    topic?: string;
    title: string;
    description: string;
}

const PostCard: React.FC<PostCardProps> = ({
    id,
    image,
    title,
    category,
    topic,
    description,
}) => {
    return (
        <Link href={`/blog/${id}`}>
            <div className="px-4 sm:px-6 md:px-12 lg:px-24 w-full py-6">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-200 overflow-hidden flex flex-col md:flex-row h-auto md:h-64 border border-gray-100 cursor-pointer">
                    <div className="w-full md:w-1/3 h-60 md:h-full min-w-[120px] overflow-hidden flex justify-center items-center">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-full object-cover object-center rounded-md"
                        />
                    </div>
                    <div className="w-full md:w-2/3 p-4 flex flex-col justify-between">
                        <div>
                            {category && (
                                <span className="inline-block px-2 py-1 bg-[#F4F0F8] text-[#592EA9] text-xs font-medium rounded mb-3 tracking-widest">
                                    {topic?.toLocaleUpperCase()}
                                </span>
                            )}
                            <h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2 mb-3">
                                {title}
                            </h3>
                            <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                                {description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default PostCard;
