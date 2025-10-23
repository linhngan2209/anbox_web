import React from 'react';

const ClassManagementSection = () => {
    return (
        <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-15 bg-white ">
            <div className="w-full md:w-1/2 xl:w-1/3 text-center md:text-left">
                <h2 className="text-3xl font-bold leading-snug text-indigo-900">
                    Culture & Places
                </h2>
                <p className="text-[#696984] mt-4">
                    Our content blends language learning with cultural discovery - including special destinations, street food and cultural activities.                </p>
            </div>

            <div className="relative w-full md:w-1/2">
                <div className="relative p-2 xl:mx-12">
                    <img
                        src="/classMana.svg"
                        alt="Teacher Student"
                        className="rounded-md object-contain max-h-[460px] w-full"
                    />
                </div>
            </div>
        </section>
    );
};

export default ClassManagementSection;
