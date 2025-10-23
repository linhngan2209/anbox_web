'use client';

export const BackgroundDecorations = () => {
  return (
    <>
      <div className="absolute inset-0 pointer-events-none backdrop-blur-sm">
        <div className="absolute top-10 left-10 text-orange-300 text-2xl opacity-70">×</div>
        <div className="absolute top-20 right-20 text-pink-300 text-xl opacity-70">
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-pink-300 rotate-45"></div>
            ))}
          </div>
        </div>

        <div className="absolute left-8 top-1/2 text-orange-300 opacity-70">
          <div className="flex flex-col gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex gap-1">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="w-0 h-0 border-l-2 border-r-2 border-b-2 border-orange-300"></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute right-8 top-1/3 text-orange-300 text-3xl opacity-70">×</div>

        <div className="absolute bottom-20 left-16 text-pink-300 opacity-70">
          <div className="grid grid-cols-6 gap-1">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-pink-300"></div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-32 right-32 text-yellow-300 opacity-70">
          <div className="grid grid-cols-5 gap-1">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="w-1 h-1 bg-yellow-300"></div>
            ))}
          </div>
        </div>

        <div className="absolute top-1/4 left-1/4 text-orange-300 text-xl opacity-70">
          <div className="flex flex-col gap-1">
            <div className="w-16 h-1 bg-orange-300 rounded-full"></div>
            <div className="w-16 h-1 bg-orange-300 rounded-full transform translate-x-2"></div>
            <div className="w-16 h-1 bg-orange-300 rounded-full"></div>
          </div>
        </div>

        <div className="absolute top-16 left-1/3 w-8 h-8 border-2 border-orange-300 rounded-full opacity-70"></div>
        <div className="absolute bottom-16 right-1/3 w-12 h-12 border-2 border-yellow-300 rounded-full opacity-70"></div>
        <div className="absolute top-1/2 right-16 w-6 h-6 border-2 border-pink-300 rounded-full opacity-70"></div>
      </div>

      <div className="absolute top-1/4 right-1/4 animate-bounce backdrop-blur-sm">
        <div className="w-4 h-4 bg-orange-300 rounded-full opacity-40"></div>
      </div>
      
      <div className="absolute bottom-1/4 left-1/3 animate-pulse backdrop-blur-sm">
        <div className="w-6 h-6 bg-pink-300 rounded-full opacity-30"></div>
      </div>
      
      <div className="absolute top-3/4 right-1/5 animate-bounce backdrop-blur-sm" style={{ animationDelay: '1s' }}>
        <div className="w-3 h-3 bg-yellow-300 rounded-full opacity-30"></div>
      </div>
    </>
  );
};