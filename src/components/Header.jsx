import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ICON_CATEGORIES } from '../config/icons';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Inicio', IconComponent: ICON_CATEGORIES.navigation.home },
    { path: '/nueva-venta', label: 'Nueva Venta', IconComponent: ICON_CATEGORIES.navigation.newSale },
    { path: '/calendario', label: 'Calendario', IconComponent: ICON_CATEGORIES.navigation.calendar },
    { path: '/estadisticas', label: 'Estadísticas', IconComponent: ICON_CATEGORIES.navigation.stats },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-gradient-to-r from-kawaii-rose to-kawaii-purple shadow-kawaii sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <img 
              src="/anibites.svg" 
              alt="Anibites Logo" 
              className="h-12 w-12 transition-transform duration-300 group-hover:scale-110"
            />
            <h1 className="text-2xl font-bold text-white hidden sm:block">Anibites</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const IconComponent = item.IconComponent;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    isActive(item.path)
                      ? 'bg-white text-kawaii-rose shadow-md transform scale-105'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <IconComponent size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <ICON_CATEGORIES.navigation.home size={24} />
            ) : (
              <ICON_CATEGORIES.navigation.home size={24} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4 animate-fadeIn">
            {navItems.map((item) => {
              const IconComponent = item.IconComponent;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg mb-2 transition-all duration-200 flex items-center gap-2 ${
                    isActive(item.path)
                      ? 'bg-white text-kawaii-rose shadow-md'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <IconComponent size={20} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
