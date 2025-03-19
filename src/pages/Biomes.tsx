
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import BiomeCard from '@/components/BiomeCard';
import { biomes } from '@/lib/biomes';
import { cn } from '@/lib/utils';

const Biomes = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-16 px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-celestial-blue/10 blur-3xl"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-celestial-purple/10 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className={cn(
            "space-y-4 opacity-0 transform translate-y-8",
            isLoaded && "opacity-100 transform-none transition-all duration-700"
          )}>
            <span className="bg-celestial-purple/10 text-celestial-purple px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              Explore
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">Magical Biomes</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Each biome contains unique creatures and environments to discover. Choose a realm to begin your adventure.
            </p>
          </div>
        </div>
      </section>
      
      {/* Biomes Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {biomes.map((biome, index) => (
              <div 
                key={biome.id}
                className={cn(
                  "opacity-0 transform translate-y-8",
                  isLoaded && "opacity-100 transform-none transition-all duration-700"
                )}
                style={{ transitionDelay: `${index * 150 + 200}ms` }}
              >
                <BiomeCard biome={biome} />
                
                {/* Biome stat cards */}
                <div className="mt-4 glass rounded-xl p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground/60">Creatures</span>
                      <span className="text-lg font-semibold">{biome.creatures?.length || 0}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-foreground/60">Activity</span>
                      <span className="text-lg font-semibold capitalize">{biome.timeOfDay || 'Any'}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-background to-celestial-purple/5">
        <div className="max-w-3xl mx-auto text-center">
          <div className={cn(
            "glass p-8 rounded-2xl opacity-0 transform translate-y-8",
            isLoaded && "opacity-100 transform-none transition-all duration-700 delay-500"
          )}>
            <h2 className="text-2xl font-bold mb-4">Ready for Your Journey?</h2>
            <p className="text-foreground/70 mb-6">
              As you explore each biome, you'll discover creatures with unique behaviors and characteristics. Remember to observe before catching!
            </p>
            <Link 
              to="/collection" 
              className="inline-flex items-center px-6 py-3 bg-celestial-purple/20 text-celestial-purple hover:bg-celestial-purple/30 rounded-full transition-all duration-300"
            >
              View Your Collection
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 px-4 border-t border-foreground/10">
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} Celestial Creature Collectors</p>
        </div>
      </footer>
    </main>
  );
};

export default Biomes;
