import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { FaGlobeAsia, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { language, setLanguage, translations } = useAppContext();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  if (!translations) return null;

  const t = translations[language];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const activeClassName = "text-yellow-300 font-medium";
  const inactiveClassName = "hover:text-yellow-300";

  return (
    <header className="bg-white shadow-md">
      {/* Top bar with national emblem and language selector */}
      <div className="bg-[#f8f9fa] border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 flex items-center justify-center bg-[#f1c40f] rounded-full mr-2">
              <span className="text-[#13518e] font-bold">GoI</span>
            </div>
            <span className="text-xs text-gray-600">
              {language === 'english' ? 'Government of India' : 'भारत सरकार'}
            </span>
          </div>
          <div className="flex items-center">
            <FaGlobeAsia className="text-blue-800 mr-2" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="text-sm border-none bg-transparent focus:ring-0"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main header with title and navigation */}
      <div className="bg-[#13518e] text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <NavLink to="/" className="text-xl md:text-2xl font-bold hover:text-white">
              {t.title}
            </NavLink>
            <button
              className="md:hidden text-white"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
            <nav className="hidden md:flex space-x-6">
              <NavLink
                to="/"
                className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
              >
                {t.home || 'Home'}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
              >
                {t.aboutUs || 'About Us'}
              </NavLink>
              <NavLink
                to="/faq"
                className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
              >
                {t.faq || 'FAQ'}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
              >
                {t.contactUs || 'Contact Us'}
              </NavLink>
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0e3b66] text-white">
          <div className="container mx-auto px-4 py-2">
            <nav className="flex flex-col space-y-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `py-2 ${isActive ? 'text-yellow-300 font-medium' : 'hover:text-yellow-300'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.home || 'Home'}
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `py-2 ${isActive ? 'text-yellow-300 font-medium' : 'hover:text-yellow-300'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.aboutUs || 'About Us'}
              </NavLink>
              <NavLink
                to="/faq"
                className={({ isActive }) =>
                  `py-2 ${isActive ? 'text-yellow-300 font-medium' : 'hover:text-yellow-300'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.faq || 'FAQ'}
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `py-2 ${isActive ? 'text-yellow-300 font-medium' : 'hover:text-yellow-300'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {t.contactUs || 'Contact Us'}
              </NavLink>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;