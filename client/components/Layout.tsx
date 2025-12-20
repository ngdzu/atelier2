
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Briefcase, 
  MessageSquare, 
  TrendingUp, 
  Settings,
  LogOut,
  Scissors
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  userRole: string;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole }) => {
  const location = useLocation();

  const navItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard', roles: ['ADMIN', 'OWNER'] },
    { path: '/calendar', icon: Calendar, label: 'Schedule', roles: ['ADMIN', 'OWNER', 'EMPLOYEE'] },
    { path: '/customers', icon: Users, label: 'Customers', roles: ['ADMIN', 'OWNER'] },
    { path: '/staff', icon: Briefcase, label: 'Staff', roles: ['ADMIN', 'OWNER'] },
    { path: '/marketing', icon: MessageSquare, label: 'Marketing', roles: ['ADMIN', 'OWNER'] },
    { path: '/performance', icon: TrendingUp, label: 'Analytics', roles: ['ADMIN', 'OWNER'] },
  ];

  return (
    <div className="flex h-screen bg-[#FDFCFB]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm">
        <div className="p-8">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#2D2926] rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
              <Scissors size={20} />
            </div>
            <span className="text-2xl font-serif font-bold tracking-tight text-[#2D2926]">LuxeNail</span>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {navItems.filter(item => item.roles.includes(userRole)).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#E6D5C3] text-[#2D2926] font-medium' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:text-red-600 transition-colors">
            <LogOut size={20} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-10 flex items-center justify-between px-8">
          <h2 className="text-xl font-medium text-gray-800">
            {navItems.find(i => i.path === location.pathname)?.label || 'Overview'}
          </h2>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-900">Sarah Miller</p>
              <p className="text-xs text-gray-500 capitalize">{userRole.toLowerCase()}</p>
            </div>
            <img 
              src="https://picsum.photos/seed/sarah/100/100" 
              className="w-10 h-10 rounded-full border-2 border-[#E6D5C3] object-cover"
              alt="Avatar"
            />
          </div>
        </header>
        <div className="p-8 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
