
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Biome } from '@/lib/biomes';

interface BiomeCardProps {
  biome: Biome;
  className?: string;
}

const BiomeCard = ({ biome, className }: BiomeCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Link 
      to={`/biomes/${biome.id}`}
      className={cn(
        "relative group overflow-hidden rounded-2xl h-80 transition-all duration-500 cursor-pointer",
        isHovered ? "shadow-glow-celestial" : "shadow-sm",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Loading state */}
      {!isImageLoaded && (
        <div className="absolute inset-0 bg-gradient-to-b from-celestial-blue/10 to-celestial-purple/10 animate-pulse"></div>
      )}
      
      {/* Background image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={biome.image}
          alt={biome.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isHovered ? "scale-110 blur-sm" : "scale-100",
            !isImageLoaded && "opacity-0"
          )}
          onLoad={() => setIsImageLoaded(true)}
        />
      </div>
      
      {/* Overlay gradient */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-300",
        isHovered ? "opacity-80" : "opacity-50"
      )} />
      
      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10">
        <div className={cn(
          "transform transition-all duration-500",
          isHovered ? "translate-y-0" : "translate-y-4"
        )}>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className={cn(
                "w-2 h-2 rounded-full",
                biome.id === 'forest' && "bg-green-400",
                biome.id === 'meadow' && "bg-yellow-400",
                biome.id === 'celestial' && "bg-celestial-blue"
              )}></span>
              <span className="text-xs uppercase tracking-wider text-white/90">
                {biome.creatures?.length || 0} creatures
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-white text-shadow">{biome.name}</h3>
            
            <p className={cn(
              "text-sm text-white/80 line-clamp-2 transition-all duration-500 max-h-0 overflow-hidden opacity-0",
              isHovered && "max-h-20 opacity-100"
            )}>
              {biome.description}
            </p>
          </div>
          
          <div className={cn(
            "mt-4 font-medium text-sm rounded-full inline-flex items-center text-white bg-white/20 backdrop-blur-sm px-4 py-2 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}>
            <span>Explore Biome</span>
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BiomeCard;
