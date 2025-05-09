// Toast.tsx
import React, { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  duration?: number; // Duration in milliseconds
}

const Toast: React.FC<ToastProps> = ({ message, type, duration = 5000 }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + (100 / (duration / 100));
        if (newProgress >= 100) {
          clearInterval(timer);
          setIsVisible(false); // Hide toast once progress is complete
        }
        return newProgress;
      });
    }, 100);

    // Auto-close toast after duration
    const closeTimer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(closeTimer);
    };
  }, [duration]);

  if (!isVisible) return null; // Do not render toast if it's hidden

  const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded-lg shadow-lg max-w-[280px] sm:max-w-sm w-full ${bgColor} text-white flex flex-col gap-2`}
      style={{ zIndex: 9999 }}
    >
      <div className="font-semibold">{message}</div>
      <div className="w-full bg-gray-300 rounded-full h-1">
        <div
          className="h-full rounded-full"
          style={{ width: `${progress}%`, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}
        />
      </div>
    </div>
  );
};

export default Toast;