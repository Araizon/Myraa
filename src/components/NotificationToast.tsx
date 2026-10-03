import React, { useEffect } from 'react';
import { Check, X } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
  onDismiss: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  onDismiss
}) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="fixed top-20 right-4 sm:right-6 z-50 animate-in slide-in-from-right-8 duration-300">
      <div className="text-white bg-black/90 backdrop-blur-md border border-red-600/50 px-5 py-4 rounded-xs flex items-center gap-3 shadow-2xl shadow-red-950/40 max-w-md">
        <div className="w-6 h-6 rounded-full bg-red-600/20 border border-red-600 flex items-center justify-center text-red-500 shrink-0">
          <Check className="w-3.5 h-3.5" />
        </div>
        <p className="text-xs sm:text-sm font-mono tracking-wide text-gray-200">
          {message}
        </p>
        <button
          onClick={onDismiss}
          className="text-gray-500 hover:text-white ml-2 p-1 cursor-pointer"
          aria-label="Dismiss toast"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
