
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface CatchButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

const CatchButton = ({ onClick, disabled = false, className }: CatchButtonProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onClick();
    }, 1000);
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled || isAnimating}
      className={cn(
        "relative overflow-hidden rounded-full px-8 py-4 font-medium transition-all duration-300 transform",
        !disabled && !isAnimating && "hover:scale-105",
        isAnimating ? "bg-celestial-gold text-white scale-95" : "bg-white text-celestial-purple",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Background effects */}
      <span className="absolute inset-0 overflow-hidden">
        <span className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-300",
          isAnimating ? "animate-pulse-gentle opacity-100" : "opacity-0",
        )}></span>
      </span>
      
      {/* Ring effect */}
      <span className={cn(
        "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-white transition-all duration-1000 scale-0 opacity-0",
        isAnimating && "scale-150 opacity-0"
      )}></span>
      
      {/* Sparkles */}
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "absolute w-1 h-1 bg-white rounded-full transition-all duration-1000 opacity-0",
            isAnimating && "opacity-100"
          )}
          style={{
            left: `${50 + (Math.random() * 40 - 20)}%`,
            top: `${50 + (Math.random() * 40 - 20)}%`,
            transform: isAnimating 
              ? `translate(-50%, -50%) scale(${Math.random() * 2 + 1}) translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px)` 
              : 'translate(-50%, -50%) scale(0)',
            transitionDelay: `${i * 0.1}s`
          }}
        ></span>
      ))}
      
      {/* Button text */}
      <span className="relative z-10">
        {isAnimating ? "Catching..." : "Catch Creature"}
      </span>
    </button>
  );
};

export default CatchButton;
