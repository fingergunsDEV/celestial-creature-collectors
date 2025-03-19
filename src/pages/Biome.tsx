
import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import CreatureCard from '@/components/CreatureCard';
import CatchButton from '@/components/CatchButton';
import { getBiomeById } from '@/lib/biomes';
import { getCreatureById } from '@/lib/creatures';
import { useCreatureCollection } from '@/hooks/useCreatureCollection';
import { cn } from '@/lib/utils';
import { toast } from '@/components/ui/use-toast';

const Biome = () => {
  const { biomeId } = useParams<{ biomeId: string }>();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCreatureId, setActiveCreatureId] = useState<string | null>(null);
  const [catchAnimating, setCatchAnimating] = useState(false);
  const { addCreature, hasCreature } = useCreatureCollection();

  const biome = biomeId ? getBiomeById(biomeId) : undefined;
  const activeCreature = activeCreatureId ? getCreatureById(activeCreatureId) : undefined;

  useEffect(() => {
    if (!biome) {
      toast({
        title: "Biome not found",
        description: "The biome you're looking for doesn't exist.",
        variant: "destructive",
      });
      navigate('/biomes');
      return;
    }

    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [biome, navigate]);

  const handleCreatureSelect = (creatureId: string) => {
    setActiveCreatureId(creatureId);
  };

  const handleCatchAttempt = () => {
    if (!activeCreature) return;
    
    setCatchAnimating(true);
    
    // Simulate catch difficulty (will always succeed for demo)
    setTimeout(() => {
      addCreature(activeCreature);
      setCatchAnimating(false);
    }, 1500);
  };

  const handleCloseCreatureView = () => {
    setActiveCreatureId(null);
  };

  if (!biome) return null;

  return (
    <main className="min-h-screen relative">
      <Navbar />
      
      {/* Background image with overlay */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>
        <img 
          src={biome.image} 
          alt={biome.name} 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Header */}
      <section className="pt-32 pb-8 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "flex flex-col space-y-2 opacity-0 transform translate-y-8",
            isLoaded && "opacity-100 transform-none transition-all duration-700"
          )}>
            <Link 
              to="/biomes" 
              className="flex items-center text-white/80 hover:text-white transition-colors duration-300 w-fit"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
              </svg>
              Back to Biomes
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white text-shadow">{biome.name}</h1>
            <p className="text-lg text-white/80 max-w-2xl">
              {biome.description}
            </p>
          </div>
        </div>
      </section>
      
      {/* Creatures Grid */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {biome.creatures && biome.creatures.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {biome.creatures.map((creature, index) => (
                <div 
                  key={creature.id}
                  className={cn(
                    "opacity-0 transform translate-y-8",
                    isLoaded && "opacity-100 transform-none transition-all duration-700"
                  )}
                  style={{ transitionDelay: `${index * 150 + 200}ms` }}
                  onClick={() => handleCreatureSelect(creature.id)}
                >
                  <CreatureCard 
                    creature={creature} 
                    collected={hasCreature(creature.id)}
                    className="h-full"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-white/80">
              No creatures found in this biome.
            </div>
          )}
        </div>
      </section>
      
      {/* Creature detail modal */}
      {activeCreature && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCloseCreatureView}
          ></div>
          
          <div className={cn(
            "relative glass-dark border border-white/20 rounded-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col opacity-0 transform scale-95",
            "animate-scale-in"
          )}>
            {/* Close button */}
            <button 
              className="absolute top-4 right-4 z-10 text-white/80 hover:text-white bg-black/20 backdrop-blur-sm rounded-full p-2 transition-colors duration-300"
              onClick={handleCloseCreatureView}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
            
            {/* Creature image */}
            <div className="relative h-64 w-full overflow-hidden">
              <img 
                src={activeCreature.image} 
                alt={activeCreature.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Creature name overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h2 className="text-2xl font-bold text-white text-shadow">{activeCreature.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={cn(
                    "text-xs font-medium px-2 py-0.5 rounded-full",
                    activeCreature.rarity === 'common' && "bg-celestial-blue/30 text-celestial-blue",
                    activeCreature.rarity === 'uncommon' && "bg-celestial-purple/30 text-celestial-purple",
                    activeCreature.rarity === 'rare' && "bg-celestial-pink/30 text-celestial-pink",
                    activeCreature.rarity === 'mythical' && "bg-celestial-gold/30 text-celestial-gold",
                  )}>
                    {activeCreature.rarity}
                  </span>
                  <span className="text-xs text-white/70">
                    Difficulty: {Array(activeCreature.catchDifficulty).fill('●').join('')}
                    {Array(10 - activeCreature.catchDifficulty).fill('○').join('')}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Creature details */}
            <div className="p-6 text-white/90 overflow-auto">
              <p className="mb-4">{activeCreature.description}</p>
              
              {activeCreature.behavior && (
                <div className="mb-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-2">Behavior</h3>
                  <p>{activeCreature.behavior}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">Biome</h3>
                  <p>{activeCreature.biome}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-white/70 mb-1">Status</h3>
                  <p>{hasCreature(activeCreature.id) ? 'Collected' : 'Not collected'}</p>
                </div>
              </div>
              
              {/* Catch action */}
              <div className="flex justify-center">
                <CatchButton 
                  onClick={handleCatchAttempt}
                  disabled={hasCreature(activeCreature.id) || catchAnimating}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Biome info */}
      <section className="py-12 px-4 bg-gradient-to-t from-black/40 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "glass-dark border border-white/20 rounded-2xl p-6 text-white/90 opacity-0 transform translate-y-8",
            isLoaded && "opacity-100 transform-none transition-all duration-700 delay-700"
          )}>
            <h2 className="text-xl font-bold mb-4">About This Biome</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-2">Best Time</h3>
                <p className="capitalize">{biome.timeOfDay || 'Any time'}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-2">Creatures</h3>
                <p>{biome.creatures?.length || 0} species to discover</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white/70 mb-2">Your Collection</h3>
                <p>{biome.creatures?.filter(c => hasCreature(c.id)).length || 0} / {biome.creatures?.length || 0} collected</p>
              </div>
            </div>
            
            <div className="mt-6 text-sm text-white/70">
              <p>Tip: Some creatures are more active at specific times or in certain conditions. Visit this biome regularly to discover all its inhabitants.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Biome;
