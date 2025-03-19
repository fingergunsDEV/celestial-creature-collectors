
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { title: 'Home', path: '/' },
    { title: 'Biomes', path: '/biomes' },
    { title: 'Collection', path: '/collection' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4',
        {
          'glass': isScrolled,
          'bg-transparent': !isScrolled
        }
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center gap-2"
          aria-label="Home"
        >
          <span className="text-2xl font-playfair font-medium tracking-tight relative">
            <span className="text-celestial-purple">Celestial</span>
            <span className="relative ml-1">
              Collectors
              <span className="absolute -top-1 -right-6 w-3 h-3 bg-celestial-gold rounded-full animate-pulse-gentle"></span>
            </span>
          </span>
        </Link>

        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative text-sm font-medium transition-colors hover:text-celestial-purple link-hover",
                location.pathname === link.path 
                  ? "text-celestial-purple" 
                  : "text-foreground/80"
              )}
            >
              {link.title}
            </Link>
          ))}
        </div>

        <button 
          className="md:hidden glass p-2 rounded-full"
          aria-label="Toggle menu"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
