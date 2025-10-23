import React from 'react';
import { FaTh, FaUserTie, FaUsers } from 'react-icons/fa';

const ClassroomUISection = () => {
    return (
        <div className="flex flex-col lg:flex-row items-center gap-8 xl:gap-12 mt-4">
            <div className="relative flex justify-center w-full lg:w-[58%] xl:w-3/5">
                
                <div className="absolute bottom-18 sm:bottom-0 right-27 sm:right-52 md:right-72 lg:right-56 xl:right-84 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#F56666] transform translate-x-1/2 translate-y-1/2 z-0"></div>
                <div className="relative z-10 w-[80%]">
                    <img
                        src="/classroom-cropped.svg"
                        alt="Classroom UI"
                        className="w-full h-[400px] sm:h-[450px] md:h-[500px] object-contain"
                    />
                </div>
            </div>

            <div className="space-y-4 sm:space-y-6 w-full lg:w-[42%] xl:w-2/5 px-4 sm:px-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-indigo-900">
                    A <span className="text-[#F48C06]">user-friendly interface</span> that makes learning effortless
                </h3>

                <div className="flex items-start gap-2 sm:gap-3">
                    <img
                        src="/feature-view.svg"
                        alt="Grid view icon"
                        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0"
                    />
                    <p className="text-[#696984] text-sm sm:text-base mx-4">
                        Modern video learning interface, bilingual subtitles, custom speed.                    </p>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                    <img
                        src="/feature-user-profile.svg"
                        alt="Presenter icon"
                        className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0"
                    />
                    <p className="text-[#696984] text-sm sm:text-base mx-4">
                        Students can repeat the conversation and practice pronunciation directly on the video player.
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ClassroomUISection;