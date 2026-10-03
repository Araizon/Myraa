import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING SYSTEM...');
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const steps = [
      { at: 25, text: 'LOADING ARCHIVE PROTOCOLS...' },
      { at: 55, text: 'SYNCING STREETWEAR CATALOG...' },
      { at: 85, text: 'ESTABLISHING SECURE PROTOCOLS...' },
      { at: 100, text: 'SYSTEM READY // EVORAN 2026' }
    ];

    let current = 0;
    const interval = setInterval(() => {
      current += 4;
      if (current > 100) {
        current = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsFadingOut(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 300);
      }
      setProgress(current);

      const matched = steps.find(s => current <= s.at);
      if (matched) {
        setStatusText(matched.text);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 bg-[#050505] z-50 flex items-center justify-center transition-all duration-700 ${
        isFadingOut ? '-translate-y-full opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="text-center px-4 max-w-sm w-full">
        {/* Logo Monogram */}
        <div className="w-14 h-14 mx-auto mb-4 border border-white/20 p-1 rounded-sm bg-black/60 shadow-2xl flex items-center justify-center">
          <img
            src="https://i.ibb.co.com/SXwDnC5q/evoranlogo.jpg"
            alt="EVORAN"
            className="w-full h-full object-contain rounded-xs"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        </div>

        <h1 className="text-5xl md:text-6xl font-black mb-3 tracking-tighter font-oswald text-white uppercase">
          EVO<span className="text-red-600">RAN</span>
        </h1>

        {/* Progress Bar Container */}
        <div className="w-64 h-[2px] bg-neutral-900 mx-auto overflow-hidden relative">
          <div
            className="h-full bg-red-600 transition-all duration-150 ease-out shadow-[0_0_10px_rgba(239,68,68,0.8)]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[10px] text-gray-500 font-mono mt-3 px-2">
          <span>{statusText}</span>
          <span className="text-white font-bold">{progress}%</span>
        </div>
      </div>
    </div>
  );
};
