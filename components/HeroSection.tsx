import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onLuckyClick: () => void;
  isGenerating: boolean;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onLuckyClick, isGenerating }) => {
  return (
    <div className="text-center max-w-2xl mx-auto px-6 py-20">
      <div className="mb-8 flex justify-center">
        <div className="bg-indigo-100 p-4 rounded-full">
          <Sparkles className="w-10 h-10 text-indigo-600" />
        </div>
      </div>
      <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
        Discover the <span className="text-indigo-600">Hidden Figures</span> of Mathematics
      </h1>
      <p className="text-lg text-slate-600 mb-10 leading-relaxed">
        Mathematics is a global endeavor. Explore the lives, legacies, and theorems of lesser-known mathematicians who shaped our understanding of the universe.
      </p>
      
      <button
        onClick={onLuckyClick}
        disabled={isGenerating}
        className={`
          group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white transition-all duration-200 
          bg-slate-900 rounded-full hover:bg-indigo-600 hover:shadow-lg hover:-translate-y-1
          disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none
        `}
      >
        {isGenerating ? (
          <span>Searching...</span>
        ) : (
          <span className="flex items-center gap-2">
            I'm Feeling Lucky <Sparkles className="w-4 h-4" />
          </span>
        )}
      </button>
    </div>
  );
};

export default HeroSection;
