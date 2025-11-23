import React, { useState } from 'react';
import { GeneratedContent } from '../types';
import { Quote, MapPin, Calendar, BookOpen, Award, ExternalLink, Image as ImageIcon, Sparkles } from 'lucide-react';

interface MathematicianCardProps {
  content: GeneratedContent;
  onReset: () => void;
}

const MathematicianCard: React.FC<MathematicianCardProps> = ({ content, onReset }) => {
  const { textData, renditionUrl, sources } = content;
  const [showRendition, setShowRendition] = useState(false);

  // If we don't have a real image, we shouldn't show the rendition either per requirements,
  // but let's handle the UI gracefully if realImageUrl is missing.
  const hasRealImage = !!textData.realImageUrl;

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 animate-fade-in-up">
      {/* Top Banner (Mobile Title) */}
      <div className="md:hidden p-6 bg-slate-900 text-white">
        <h2 className="text-3xl font-bold font-serif">{textData.name}</h2>
        <p className="opacity-80 mt-1">{textData.years}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
        
        {/* Left Column: Images */}
        <div className="lg:col-span-5 bg-slate-100 flex flex-col">
          <div className="relative aspect-[3/4] lg:h-full lg:aspect-auto">
             {hasRealImage ? (
                <img 
                  src={showRendition ? renditionUrl : textData.realImageUrl} 
                  alt={showRendition ? `AI Rendition of ${textData.name}` : `Historical portrait of ${textData.name}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
             ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-200 text-slate-400 p-8 text-center">
                  <div>
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>No historical portrait found in archives.</p>
                  </div>
                </div>
             )}
             
             {/* Toggle Button - Only if we have both */}
             {hasRealImage && renditionUrl && (
               <button 
                 onClick={() => setShowRendition(!showRendition)}
                 className="absolute bottom-4 right-4 bg-black/60 hover:bg-black/80 text-white text-xs px-3 py-1.5 rounded-full backdrop-blur-sm transition-all flex items-center gap-2"
               >
                 {showRendition ? (
                    <>Show Historical Photo <ImageIcon className="w-3 h-3" /></>
                 ) : (
                    <>Show AI Tribute <Sparkles className="w-3 h-3" /></>
                 )}
               </button>
             )}

             {/* Caption */}
             <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase ${showRendition ? 'bg-indigo-600 text-white' : 'bg-slate-900 text-white'}`}>
                  {showRendition ? 'Digital Tribute' : 'Historical Image'}
                </span>
             </div>
          </div>
        </div>

        {/* Right Column: Content */}
        <div className="lg:col-span-7 p-8 lg:p-10 flex flex-col">
          <div className="hidden md:block mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold font-serif text-slate-900 mb-3">{textData.name}</h2>
            <div className="flex items-center gap-6 text-sm text-slate-500 font-medium uppercase tracking-wider">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-indigo-500" /> {textData.years}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-indigo-500" /> {textData.origin}</span>
            </div>
          </div>

          <div className="space-y-8 flex-grow">
            <div className="relative">
                <Quote className="absolute -left-2 -top-2 w-8 h-8 text-indigo-100 -z-10 transform -scale-x-100" />
                <p className="text-lg text-slate-700 leading-relaxed italic border-l-4 border-indigo-500 pl-4 py-1">
                    {textData.bio}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 rounded-xl">
                  <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">
                    <BookOpen className="w-4 h-4 text-indigo-600" /> Famous Result
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{textData.famousResult}</p>
                </div>

                <div className="bg-slate-50 p-5 rounded-xl">
                  <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-2 text-sm uppercase tracking-wide">
                    <Award className="w-4 h-4 text-indigo-600" /> Legacy
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{textData.impact}</p>
                </div>
            </div>

            {/* Sources Section */}
            {sources.length > 0 && (
              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Verified Sources</h4>
                <ul className="space-y-1">
                  {sources.slice(0, 3).map((source, idx) => (
                    <li key={idx} className="text-sm truncate">
                      <a 
                        href={source.uri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1"
                      >
                        {source.title || source.uri}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          
          <div className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center">
             <button 
               onClick={onReset}
               className="group inline-flex items-center gap-2 text-slate-600 font-medium hover:text-indigo-600 transition-colors"
             >
               <span className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-indigo-100 transition-colors">←</span>
               Discover Another
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MathematicianCard;