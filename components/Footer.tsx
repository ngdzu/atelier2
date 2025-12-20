import React from 'react';
import { Link } from 'react-router-dom';
import { STORE_NAME, PHONE_NUMBER, ADDRESS_STREET, ADDRESS_CITY, NAV_LINKS } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#FDFCFB] text-black py-32 px-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-24">
        <div className="reveal">
          <h2 className="text-3xl font-serif font-bold tracking-widest mb-8">{STORE_NAME.toUpperCase()}</h2>
          <div className="space-y-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">
            <p>{ADDRESS_STREET}</p>
            <p>{ADDRESS_CITY}</p>
            <p>{PHONE_NUMBER}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-24 reveal delay-150">
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Menu</h4>
            <ul className="space-y-4 text-xs font-medium text-gray-400">
              {NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="hover:text-black transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] mb-8">Follow</h4>
            <ul className="space-y-4 text-xs font-medium text-gray-400">
              <li className="cursor-pointer hover:text-black transition-colors">Instagram</li>
              <li className="cursor-pointer hover:text-black transition-colors">Pinterest</li>
              <li className="cursor-pointer hover:text-black transition-colors">Twitter</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-32 pt-10 border-t border-black/5 flex justify-between items-center text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300 reveal">
        <p>© 2024 {STORE_NAME.toUpperCase()} STUDIO</p>
        <p>Privacy / Terms</p>
      </div>
    </footer>
  );
};

export default Footer;