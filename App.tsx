import React, { useState, useCallback } from 'react';
import HeroSection from './components/HeroSection';
import MathematicianCard from './components/MathematicianCard';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchRandomMathematician, generateMathematicianImage } from './services/geminiService';
import { GeneratedContent } from './types';
import { Github } from 'lucide-react';

const App: React.FC = () => {
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFeelingLucky = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Step 1: Get the text data and real image url + sources
      const { data: textData, sources } = await fetchRandomMathematician();
      
      let renditionUrl: string | undefined = undefined;

      // Step 2: Only generate AI rendition if we found a real image (per user request)
      if (textData.realImageUrl) {
        try {
           renditionUrl = await generateMathematicianImage(textData.visualDescription);
        } catch (imgErr) {
          console.warn("Failed to generate rendition", imgErr);
          // Non-blocking error
        }
      }
      
      setContent({ textData, renditionUrl, sources });
    } catch (err: any) {
      console.error(err);
      setError("We encountered an issue consulting the archives. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setContent(null);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-serif font-bold text-xl">
               ∑
             </div>
             <span className="font-serif font-bold text-xl text-slate-900 hidden sm:block">MathDept<span className="text-indigo-600">Diversity</span></span>
          </div>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-slate-900 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-6xl">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-center">
              {error}
            </div>
          )}

          {loading ? (
             <div className="flex justify-center py-20">
               <LoadingSpinner />
             </div>
          ) : content ? (
            <MathematicianCard content={content} onReset={handleReset} />
          ) : (
            <HeroSection onLuckyClick={handleFeelingLucky} isGenerating={loading} />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Dept of Mathematics. Powered by Gemini API.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;