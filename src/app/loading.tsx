import React from 'react';

export const LoadingOverlay: React.FC = () => {
    return (
        <div className="fixed inset-0 z-50  bg-opacity-30 flex items-center justify-center">
            <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-[#F48C06] rounded-full animate-spin" />
                <div className="absolute inset-0 w-12 h-12 bg-[#F48C06] rounded-full opacity-20 animate-ping" />
            </div>
        </div>
    );
};

export default LoadingOverlay;
