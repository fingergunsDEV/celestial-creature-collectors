
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Creature } from '@/lib/creatures';

interface CreatureCardProps {
  creature: Creature;
  collected?: boolean;
  onSelect?: () => void;
  className?: string;
}

const CreatureCard = ({ 
  creature, 
  collected = false,
  onSelect,
  className 
}: CreatureCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div 
      className={cn(
        "relative group overflow-hidden rounded-2xl transition-all duration-300 cursor-pointer transform",
        isHovered ? "scale-[1.02]" : "scale-100",
        collected ? "" : "opacity-90 grayscale",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
    >
      {/* Card background and effects */}
      <div className="absolute inset-0 glass transition-all duration-300 group-hover:backdrop-blur-xl" />
      
      {/* Rarity indicator */}
      <div className={cn(
        "absolute top-3 right-3 rounded-full px-2 py-0.5 text-xs font-medium z-10 transition-all duration-300",
        creature.rarity === 'common' && "bg-celestial-blue/20 text-celestial-blue",
        creature.rarity === 'uncommon' && "bg-celestial-purple/20 text-celestial-purple",
        creature.rarity === 'rare' && "bg-celestial-pink/20 text-celestial-pink",
        creature.rarity === 'mythical' && "bg-celestial-gold/20 text-celestial-gold",
      )}>
        {creature.rarity}
      </div>
      
      {/* Collected badge */}
      {collected && (
        <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-xs font-medium text-celestial-purple rounded-full px-2 py-0.5 z-10">
          Collected
        </div>
      )}
      
      {/* Card content */}
      <div className="relative p-5 flex flex-col h-full">
        {/* Image placeholder while loading */}
        {!isImageLoaded && (
          <div className="aspect-square w-full bg-celestial-purple/10 rounded-xl animate-pulse mb-4"></div>
        )}
        
        {/* Creature image */}
        <div className={cn(
          "aspect-square w-full mb-4 overflow-hidden rounded-xl relative",
          !isImageLoaded && "hidden"
        )}>
          <img
            src={creature.image}
            alt={creature.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              isHovered ? "scale-110" : "scale-100"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
          
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Creature info */}
        <div className="flex flex-col space-y-1">
          <h3 className="text-lg font-bold text-foreground">{creature.name}</h3>
          <p className="text-sm text-foreground/70 line-clamp-2">{creature.description}</p>
        </div>
        
        {/* Biome chip */}
        <div className="mt-auto pt-4">
          <span className="inline-block text-xs font-medium text-foreground/80 bg-white/50 backdrop-blur-sm rounded-full px-2 py-1">
            {creature.biome}
          </span>
        </div>
      </div>
      
      {/* Hover effect overlay */}
      <div className={cn(
        "absolute inset-0 opacity-0 transition-opacity duration-300 pointer-events-none",
        isHovered && "opacity-100"
      )}>
        <div className="absolute inset-0 bg-gradient-to-t from-celestial-blue/10 to-transparent" />
      </div>
    </div>
  );
};

export default CreatureCard;
