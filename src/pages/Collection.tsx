
import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import CreatureCard from '@/components/CreatureCard';
import { creatures } from '@/lib/creatures';
import { biomes } from '@/lib/biomes';
import { useCreatureCollection } from '@/hooks/useCreatureCollection';
import { cn } from '@/lib/utils';

type FilterType = 'all' | 'collected' | 'missing';
type SortType = 'name' | 'rarity' | 'biome';

const Collection = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState<FilterType>('all');
  const [sort, setSort] = useState<SortType>('name');
  const [biomeFilter, setBiomeFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { creatures: collectedCreatures, hasCreature } = useCreatureCollection();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Filter and sort creatures
  const filteredCreatures = creatures.filter(creature => {
    // Text search
    if (searchQuery && !creature.name.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Biome filter
    if (biomeFilter !== 'all' && creature.biome.toLowerCase() !== biomeFilter.toLowerCase()) {
      return false;
    }
    
    // Collection status filter
    if (filter === 'collected' && !hasCreature(creature.id)) {
      return false;
    }
    if (filter === 'missing' && hasCreature(creature.id)) {
      return false;
    }
    
    return true;
  });

  // Sort creatures
  const sortedCreatures = [...filteredCreatures].sort((a, b) => {
    if (sort === 'name') {
      return a.name.localeCompare(b.name);
    }
    if (sort === 'rarity') {
      const rarityOrder = { common: 0, uncommon: 1, rare: 2, mythical: 3 };
      return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    }
    if (sort === 'biome') {
      return a.biome.localeCompare(b.biome);
    }
    return 0;
  });

  // Collection statistics
  const totalCreatures = creatures.length;
  const collectedCount = collectedCreatures.length;
  const collectionPercentage = totalCreatures > 0 
    ? Math.round((collectedCount / totalCreatures) * 100) 
    : 0;

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Header */}
      <section className="pt-32 pb-12 px-4 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-celestial-blue/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-celestial-purple/10 blur-3xl"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className={cn(
            "space-y-4 opacity-0 transform translate-y-8",
            isLoaded && "opacity-100 transform-none transition-all duration-700"
          )}>
            <span className="bg-celestial-gold/10 text-celestial-gold px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              Your Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold">Creature Collection</h1>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              View and manage your collection of magical creatures from across the enchanted realms.
            </p>
          </div>
        </div>
      </section>
      
      {/* Collection Statistics */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "glass rounded-2xl p-6 opacity-0 transform translate-y-8",
            isLoaded && "opacity-100 transform-none transition-all duration-700 delay-200"
          )}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <span className="text-sm text-foreground/60">Collection Progress</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{collectionPercentage}%</span>
                  <span className="text-foreground/70 pb-1">Complete</span>
                </div>
                <div className="mt-2 h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-celestial-purple" 
                    style={{ width: `${collectionPercentage}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-foreground/60">Creatures Collected</span>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold">{collectedCount}</span>
                  <span className="text-foreground/70 pb-1">of {totalCreatures}</span>
                </div>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm text-foreground/60">Rarest Catch</span>
                {collectedCreatures.length > 0 ? (
                  <div className="flex items-center gap-2 mt-1">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      collectedCreatures.some(c => c.rarity === 'mythical') && "bg-celestial-gold",
                      !collectedCreatures.some(c => c.rarity === 'mythical') && 
                        collectedCreatures.some(c => c.rarity === 'rare') && "bg-celestial-pink",
                      !collectedCreatures.some(c => c.rarity === 'mythical') && 
                        !collectedCreatures.some(c => c.rarity === 'rare') && 
                        collectedCreatures.some(c => c.rarity === 'uncommon') && "bg-celestial-purple",
                      !collectedCreatures.some(c => c.rarity === 'mythical') && 
                        !collectedCreatures.some(c => c.rarity === 'rare') && 
                        !collectedCreatures.some(c => c.rarity === 'uncommon') && "bg-celestial-blue",
                    )}></div>
                    <span className="text-lg font-medium">
                      {collectedCreatures.some(c => c.rarity === 'mythical') && "Mythical"}
                      {!collectedCreatures.some(c => c.rarity === 'mythical') && 
                        collectedCreatures.some(c => c.rarity === 'rare') && "Rare"}
                      {!collectedCreatures.some(c => c.rarity === 'mythical') && 
                        !collectedCreatures.some(c => c.rarity === 'rare') && 
                        collectedCreatures.some(c => c.rarity === 'uncommon') && "Uncommon"}
                      {!collectedCreatures.some(c => c.rarity === 'mythical') && 
                        !collectedCreatures.some(c => c.rarity === 'rare') && 
                        !collectedCreatures.some(c => c.rarity === 'uncommon') && "Common"}
                    </span>
                  </div>
                ) : (
                  <span className="text-lg">None yet</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Filters and Search */}
      <section className="pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "flex flex-col md:flex-row gap-4 opacity-0 transform translate-y-8",
            isLoaded && "opacity-100 transform-none transition-all duration-700 delay-300"
          )}>
            {/* Search */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search creatures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass border-none rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-celestial-purple/50"
              />
              <svg 
                className="absolute left-3 top-2.5 w-5 h-5 text-foreground/60" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            
            {/* Filter buttons */}
            <div className="flex flex-wrap gap-2">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterType)}
                className="glass border-none rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-celestial-purple/50"
              >
                <option value="all">All Creatures</option>
                <option value="collected">Collected</option>
                <option value="missing">Not Collected</option>
              </select>
              
              <select
                value={biomeFilter}
                onChange={(e) => setBiomeFilter(e.target.value)}
                className="glass border-none rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-celestial-purple/50"
              >
                <option value="all">All Biomes</option>
                {biomes.map(biome => (
                  <option key={biome.id} value={biome.name}>{biome.name}</option>
                ))}
              </select>
              
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortType)}
                className="glass border-none rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-celestial-purple/50"
              >
                <option value="name">Sort by Name</option>
                <option value="rarity">Sort by Rarity</option>
                <option value="biome">Sort by Biome</option>
              </select>
            </div>
          </div>
        </div>
      </section>
      
      {/* Creatures Grid */}
      <section className="pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {sortedCreatures.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {sortedCreatures.map((creature, index) => (
                <div 
                  key={creature.id}
                  className={cn(
                    "opacity-0 transform translate-y-8",
                    isLoaded && "opacity-100 transform-none transition-all duration-700"
                  )}
                  style={{ transitionDelay: `${(index % 8) * 100 + 400}ms` }}
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
            <div className={cn(
              "text-center py-12 opacity-0 transform translate-y-8",
              isLoaded && "opacity-100 transform-none transition-all duration-700 delay-400"
            )}>
              <p className="text-lg text-foreground/70">
                No creatures match your current filters.
              </p>
            </div>
          )}
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

export default Collection;
