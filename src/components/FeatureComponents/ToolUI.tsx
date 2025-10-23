import React from 'react';

const ToolUISection = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between px-4 md:px-16 py-12 bg-white gap-16 mt-4">
      <div className="w-full md:w-1/2 xl:w-2/5 text-center md:text-left md:pl-24">
        <h2 className="text-3xl font-bold leading-snug text-indigo-900">
          <span className="text-[#F48C06]">Tools</span> For Learners
        </h2>
        <p className="text-[#696984] mt-4">
          The platform automatically saves each learner’s progress, quiz results, and lessons completed.
Students can easily pick up where they left off and follow a personalized roadmap tailored to their level and goals.
        </p>
      </div>

      <div className="relative w-full md:w-1/2">
        <div className="relative p-2 xl:mx-16">
          <img
            src="/toolUI.svg"
            alt="Teacher Student"
            className="rounded-md object-contain max-h-[460px] w-full"
          />
        </div>
      </div>
    </section>
  );
};

export default ToolUISection;
