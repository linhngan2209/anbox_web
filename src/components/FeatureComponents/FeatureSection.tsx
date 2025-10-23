import React from 'react';
import { FaTh, FaUserTie, FaUsers } from 'react-icons/fa';
import ClassroomUISection from './ClassroomUI';
import ToolUISection from './ToolUI';
import QuizzesUISection from './QuizzesUI';
import ClassManagementSection from './ClassManagementUI';
import DiscussionsUISection from './DiscussionsUI';
import StudyUISection from './StudyUI';

const ClassroomFeatures = () => {
    return (
        <section className="bg-white py-16 px-6 md:px-20 dark:bg-white">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold">
                    <span className="text-indigo-900">Our </span>
                    <span className="text-[#F48C06]">Features</span>
                </h2>
                <p className="text-gray-500 mt-2 md:mt-4 text-lg">
                    This very extraordinary feature, can make learning activities more efficient
                </p>
            </div>

            <div className="space-y-2 md:space-y-2">
                <ClassroomUISection />
                <ToolUISection />
                <QuizzesUISection />
                <ClassManagementSection />
                <DiscussionsUISection />
                <StudyUISection />
            </div>

            <div className="text-center mt-16">
                <button className="bg-white hover:bg-[#E07F06] border-2 border-[#E07F06] text-[#E07F06] hover:text-white font-normal py-3 px-8 rounded-full transition-colors duration-200 text-lg shadow-md hover:shadow-lg transform hover:-translate-y-1">
                    See More Features
                </button>
            </div>
        </section>
    );
};

export default ClassroomFeatures;