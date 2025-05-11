
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-dental-primary px-3 py-2 text-lg font-medium"
            >
              الرئيسية
            </Link>
            <Link 
              to="/appointments" 
              className="text-gray-700 hover:text-dental-primary px-3 py-2 text-lg font-medium"
            >
              المواعيد
            </Link>
            <Link 
              to="/new-appointment" 
              className="text-gray-700 hover:text-dental-primary px-3 py-2 text-lg font-medium"
            >
              حجز موعد
            </Link>
          </nav>
          <div className="md:hidden">
            <button 
              onClick={toggleMenu}
              className="text-gray-600 hover:text-dental-primary"
            >
              <i className="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-2">
            <Link 
              to="/" 
              className="block text-gray-700 hover:text-dental-primary py-2 text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              الرئيسية
            </Link>
            <Link 
              to="/appointments" 
              className="block text-gray-700 hover:text-dental-primary py-2 text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              المواعيد
            </Link>
            <Link 
              to="/new-appointment" 
              className="block text-gray-700 hover:text-dental-primary py-2 text-lg font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              حجز موعد
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
