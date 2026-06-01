import React from 'react';

const imageCards = [
  {
    name: 'GitHub Streak',
    src: 'https://github-readme-streak-stats.herokuapp.com/?user=diwakar1706&theme=tokyonight',
    alt: 'Diwakar GitHub coding streak statistics',
  },
  {
    name: 'LeetCode Stats',
    src: 'https://leetcard.jacoblin.cool/Diwakar1706?theme=dark&ext=heatmap',
    alt: 'Diwakar LeetCode statistics and heatmap',
  },
];

const CodingStreak = () => {
  return (
    <div className="mx-auto w-full max-w-5xl">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {imageCards.map((card) => (
          <div
            key={card.name}
            className="flex min-h-48 items-center justify-center rounded-2xl border border-slate-800/80 bg-slate-900/70 p-3 shadow-lg transition duration-300 hover:scale-105 sm:p-4"
          >
            <img
              src={card.src}
              alt={card.alt}
              loading="lazy"
              className="h-auto w-full max-w-full rounded-xl object-contain"
            />
          </div>
        ))}
      </div>

      <p className="mt-6 text-center text-sm font-medium text-slate-300 sm:text-base">
        Solved 300+ DSA problems across platforms
      </p>
    </div>
  );
};

export default CodingStreak;
