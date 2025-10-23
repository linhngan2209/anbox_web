import React from 'react';

const Loading: React.FC = () => {
    return (
        <div className="flex items-center justify-center py-8">
            <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                    <div className="w-12 h-12 border-2 border-gray-200 border-t-[#F48C06] rounded-full animate-spin" />
                    <div className="absolute inset-0 w-12 h-12 bg-[#F48C06] rounded-full opacity-20 animate-ping" />
                </div>


            </div>
        </div>
    );
};

export default Loading;