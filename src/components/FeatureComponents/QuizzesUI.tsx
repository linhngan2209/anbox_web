import React from 'react';

const QuizzesUISection = () => {
    return (
        <section className="flex flex-col md:flex-row-reverse items-center justify-between px-4 md:px-16 py-12 bg-white gap-16 mt-4">
            <div className="w-full md:w-1/2 xl:w-2/5 text-center md:text-left md:pr-24">
                <h2 className="text-3xl font-bold leading-snug text-indigo-900">
                    Assessments, <br />
                    <span className="text-[#F48C06]">Quizzes</span>, Tests
                </h2>
                <p className="text-[#696984] mt-4">
                    Flashcard illustrates with images and sounds. Smart review algorithm helps remember the vocabulary longer (Spaced Repetition).        </p>
            </div>

            <div className="relative w-full md:w-1/2">
                <div className="relative p-2 xl:ml-16">
                    <img
                        src="/quizzesUI.svg"
                        alt="Quiz Interface"
                        className="rounded-md object-contain max-h-[460px] w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default QuizzesUISection;