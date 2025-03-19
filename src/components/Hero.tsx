
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full bg-celestial-blue/10 blur-3xl animate-pulse-gentle"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-celestial-purple/10 blur-3xl animate-pulse-gentle" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/4 left-1/3 w-32 h-32 rounded-full bg-celestial-pink/10 blur-3xl animate-pulse-gentle" style={{animationDelay: '2s'}}></div>
      </div>
      
      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i}
          className={cn(
            "absolute w-1 h-1 rounded-full bg-celestial-gold opacity-0",
            isLoaded && "animate-fade-in"
          )}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.1 + 0.5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        />
      ))}
      
      <div className="relative max-w-3xl text-center space-y-6">
        <div 
          className={cn(
            "opacity-0 transform translate-y-4",
            isLoaded && "animate-slide-up opacity-100"
          )}
          style={{ animationDelay: '0.3s' }}
        >
          <span className="bg-celestial-purple/10 text-celestial-purple px-3 py-1 rounded-full text-xs font-medium tracking-wide">
            Begin Your Adventure
          </span>
        </div>
        
        <h1 
          className={cn(
            "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-foreground opacity-0",
            isLoaded && "animate-fade-in"
          )}
          style={{ animationDelay: '0.5s' }}
        >
          Collect Magical Creatures from
          <span className="text-celestial-purple block">Enchanted Realms</span>
        </h1>
        
        <p 
          className={cn(
            "text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto opacity-0",
            isLoaded && "animate-fade-in"
          )}
          style={{ animationDelay: '0.7s' }}
        >
          Explore mystical biomes, discover rare creatures, and build your magical collection in a world where nature meets the cosmos.
        </p>
        
        <div 
          className={cn(
            "flex flex-col sm:flex-row gap-4 justify-center pt-4 opacity-0",
            isLoaded && "animate-fade-in"
          )}
          style={{ animationDelay: '0.9s' }}
        >
          <Link 
            to="/biomes" 
            className="glass hover:bg-celestial-blue/20 text-foreground font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-glow-celestial"
          >
            Begin Exploring
          </Link>
          <Link 
            to="/collection" 
            className="border border-celestial-purple/30 hover:bg-celestial-purple/10 text-foreground font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            View Collection
          </Link>
        </div>
      </div>
      
      {/* Floating creature illustration */}
      <div 
        className={cn(
          "absolute bottom-16 right-16 opacity-0 hidden lg:block",
          isLoaded && "animate-fade-in animate-float"
        )}
        style={{ animationDelay: '1.2s' }}
      >
        <div className="relative w-32 h-32">
          <div className="absolute inset-0 rounded-full bg-celestial-blue/20 animate-pulse-gentle"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white animate-pulse-gentle" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white animate-pulse-gentle" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 rounded-full bg-white animate-pulse-gentle" style={{animationDelay: '1.5s'}}></div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 opacity-0",
          isLoaded && "animate-fade-in"
        )}
        style={{ animationDelay: '1.5s' }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-foreground/60 font-medium">Scroll to discover</span>
          <div className="w-0.5 h-8 bg-foreground/20 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-celestial-purple animate-[slide-down_1.5s_ease-in-out_infinite]" style={{height: '30%'}}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
