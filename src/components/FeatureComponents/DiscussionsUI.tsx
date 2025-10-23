import React from 'react';

const DiscussionsUISection = () => {
    return (
        <section className="flex flex-col md:flex-row-reverse items-center justify-between px-4 md:px-16 py-12 bg-white gap-16 mt-4">
            <div className="w-full md:w-1/2 xl:w-2/5 text-center md:text-left md:pr-24">
                <h2 className="text-3xl font-bold leading-snug text-indigo-900">
                    Chatbot AI
                </h2>
                <p className="text-[#696984] mt-4">
                    A friendly chatbot is always here to help!
                    Learners can ask questions, review vocabulary, practice short conversations, or get instant explanations — anytime, right inside the lesson.
                    It’s like having a virtual Vietnamese tutor 24/7.</p>
            </div>

            <div className="relative w-full md:w-1/2">
                <div className="relative p-2 xl:ml-16">
                    <img
                        src="/discussions.svg"
                        alt="Discussions"
                        className="rounded-md object-contain max-h-[460px] w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default DiscussionsUISection;