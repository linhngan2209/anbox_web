import React from 'react';

const StudyUISection = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-15 bg-white mt-4">
            <div className="w-full md:w-1/2 xl:w-1/3 text-center md:text-left">
                <h2 className="text-3xl font-bold leading-snug text-indigo-900">
                    Personalize <br />
                    <span className="text-[#F48C06]">the path of Study </span>
                </h2>
                <p className="text-[#696984] mt-4">
                    Personalize the path of study to match each learner's needs and goals
                </p>
            </div>

            <div className="relative w-full md:w-1/2">
                <div className="relative p-2 xl:mx-12">
                    <img
                        src="/studyUI.svg"
                        alt="Study UI"
                        className="rounded-md object-contain max-h-[460px] w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default StudyUISection;
