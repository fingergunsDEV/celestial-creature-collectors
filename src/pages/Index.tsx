
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import BiomeCard from '@/components/BiomeCard';
import CreatureCard from '@/components/CreatureCard';
import { biomes } from '@/lib/biomes';
import { creatures } from '@/lib/creatures';
import { cn } from '@/lib/utils';
import { useCreatureCollection } from '@/hooks/useCreatureCollection';

const Index = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Record<string, boolean>>({
    biomes: false,
    featured: false,
    about: false
  });
  const { hasCreature } = useCreatureCollection();

  // Track scrolling for animations
  useEffect(() => {
    const handleScroll = () => {
      // Check if user has scrolled at all
      setIsScrolled(window.scrollY > 10);
      
      // Check visibility of sections for animations
      const biomesSection = document.getElementById('biomes-section');
      const featuredSection = document.getElementById('featured-section');
      const aboutSection = document.getElementById('about-section');
      
      const checkVisibility = (element: HTMLElement | null, sectionName: string) => {
        if (!element) return;
        
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 100;
        
        if (isVisible && !visibleSections[sectionName]) {
          setVisibleSections(prev => ({...prev, [sectionName]: true}));
        }
      };
      
      checkVisibility(biomesSection, 'biomes');
      checkVisibility(featuredSection, 'featured');
      checkVisibility(aboutSection, 'about');
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to check initial visibility
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [visibleSections]);

  // Featured creatures (selecting 3 random creatures)
  const featuredCreatures = creatures
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);

  return (
    <main className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <Hero />
      
      {/* Biomes Section */}
      <section 
        id="biomes-section"
        className="py-20 px-4 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "text-center mb-12 opacity-0 transform translate-y-8 transition-all duration-700",
            visibleSections.biomes && "opacity-100 transform-none"
          )}>
            <span className="bg-celestial-purple/10 text-celestial-purple px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              Magical Realms
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">Explore Enchanted Biomes</h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
              Each biome is home to unique creatures and phenomena, waiting to be discovered.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {biomes.map((biome, index) => (
              <div 
                key={biome.id}
                className={cn(
                  "opacity-0 transform translate-y-8 transition-all duration-700",
                  visibleSections.biomes && "opacity-100 transform-none"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <BiomeCard biome={biome} />
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Featured Creatures Section */}
      <section 
        id="featured-section"
        className="py-20 px-4 bg-gradient-to-b from-background to-celestial-purple/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className={cn(
            "text-center mb-12 opacity-0 transform translate-y-8 transition-all duration-700",
            visibleSections.featured && "opacity-100 transform-none"
          )}>
            <span className="bg-celestial-blue/10 text-celestial-blue px-3 py-1 rounded-full text-xs font-medium tracking-wide">
              Magical Beings
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold">Featured Creatures</h2>
            <p className="mt-4 text-lg text-foreground/70 max-w-2xl mx-auto">
              Discover the magical creatures that inhabit our enchanted world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCreatures.map((creature, index) => (
              <div 
                key={creature.id}
                className={cn(
                  "opacity-0 transform translate-y-8 transition-all duration-700",
                  visibleSections.featured && "opacity-100 transform-none"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CreatureCard 
                  creature={creature} 
                  collected={hasCreature(creature.id)}
                />
              </div>
            ))}
          </div>
          
          <div className={cn(
            "text-center mt-12 opacity-0 transform translate-y-8 transition-all duration-700",
            visibleSections.featured && "opacity-100 transform-none"
          )}
            style={{ transitionDelay: '450ms' }}
          >
            <Link 
              to="/collection" 
              className="inline-flex items-center px-6 py-3 border border-celestial-purple/30 rounded-full text-foreground/90 hover:bg-celestial-purple/10 transition-all duration-300"
            >
              View All Creatures
              <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* About The Game Section */}
      <section 
        id="about-section"
        className="py-20 px-4"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={cn(
              "order-2 lg:order-1 opacity-0 transform translate-x-8 transition-all duration-700",
              visibleSections.about && "opacity-100 transform-none"
            )}>
              <span className="bg-celestial-gold/10 text-celestial-gold px-3 py-1 rounded-full text-xs font-medium tracking-wide">
                The Adventure
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold">About Celestial Creature Collectors</h2>
              <div className="mt-6 space-y-4 text-foreground/80">
                <p>
                  Explore different biomes to catch butterflies, fae, falling stars, and more. Each creature has unique behaviors—some are easier to catch, while others require strategy.
                </p>
                <p>
                  Observe the natural life cycles as butterflies lay eggs on milkweed, and manage their growth from egg to caterpillar to chrysalis to butterfly. Different species have different environmental needs.
                </p>
                <p>
                  Collect magical resources like Unicorn Poop to instantly grow plants, Falling Stars to unlock hidden areas, and Fae Dust to communicate with mystical creatures.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="glass p-4 rounded-xl">
                  <h3 className="font-bold text-lg">Exploration</h3>
                  <p className="text-sm text-foreground/70 mt-2">Travel across different regions, unlocking new species and rare celestial phenomena.</p>
                </div>
                <div className="glass p-4 rounded-xl">
                  <h3 className="font-bold text-lg">Conservation</h3>
                  <p className="text-sm text-foreground/70 mt-2">Balance catching creatures with maintaining their ecosystems to prevent extinction.</p>
                </div>
              </div>
            </div>
            
            <div className={cn(
              "order-1 lg:order-2 relative h-80 lg:h-96 opacity-0 transform -translate-x-8 transition-all duration-700",
              visibleSections.about && "opacity-100 transform-none"
            )}>
              <div className="absolute inset-0 bg-gradient-radial from-celestial-blue/10 to-transparent rounded-2xl"></div>
              <div className="absolute inset-0 rounded-2xl overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb" 
                  alt="Magical landscape" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-1/4 left-1/4 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md animate-float" style={{ animationDelay: '0.5s' }}></div>
              <div className="absolute bottom-1/3 right-1/3 w-8 h-8 rounded-full bg-celestial-purple/20 backdrop-blur-md animate-float" style={{ animationDelay: '1.2s' }}></div>
              <div className="absolute top-1/2 right-1/4 w-6 h-6 rounded-full bg-celestial-gold/20 backdrop-blur-md animate-float" style={{ animationDelay: '0.8s' }}></div>
            </div>
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

export default Index;
