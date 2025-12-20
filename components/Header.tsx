import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { STORE_NAME, NAV_LINKS } from '../constants';

interface HeaderProps {
  variant?: 'fixed' | 'standard';
}

const Header: React.FC<HeaderProps> = ({ variant = 'standard' }) => {
  const location = useLocation();

  const isFixed = variant === 'fixed';
  
  const navClasses = isFixed 
    ? "fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white"
    : "flex justify-between items-center px-8 py-6 border-b border-black/5 bg-[#FDFCFB]";

  const linkBaseClasses = "hover:opacity-60 transition-opacity flex items-center gap-1.5";
  const activeClasses = isFixed ? "border-b border-white" : "text-black border-b border-black";
  const inactiveClasses = isFixed ? "" : "text-gray-400 hover:text-black";

  const getLinkClasses = (path: string) => {
    const isActive = location.pathname === path;
    return `${linkBaseClasses} ${isActive ? activeClasses : inactiveClasses}`;
  };

  const buttonClasses = isFixed
    ? "px-6 py-2 border border-white/30 text-[10px] uppercase font-bold tracking-widest hover:bg-white hover:text-black transition-all"
    : "px-6 py-2 border border-black text-[10px] uppercase font-bold tracking-widest bg-black text-white hover:bg-transparent hover:text-black transition-all";

  return (
    <nav className={navClasses}>
      <Link to="/" className="flex items-center gap-2 group">
        <span className="text-xl font-serif font-bold tracking-widest uppercase">{STORE_NAME}</span>
      </Link>
      <div className="hidden md:flex gap-10 lg:gap-12 text-[10px] font-bold uppercase tracking-[0.3em]">
        {NAV_LINKS.map((link) => (
          <Link key={link.path} to={link.path} className={getLinkClasses(link.path)}>
            {link.name}
          </Link>
        ))}
      </div>
      <Link to="/book" className={buttonClasses}>
        Reserve
      </Link>
    </nav>
  );
};

export default Header;