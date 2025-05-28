import React from 'react';

interface SidebarMenuProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Overlay that appears when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        w-64 bg-white shadow-lg z-50 transition-transform duration-300 ease-in-out`}>
        <div className="p-4 h-full flex flex-col">
          <button 
            onClick={toggleSidebar}
            className="self-end p-2 text-gray-500 hover:text-gray-700"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <h2 className="text-xl font-bold mb-6 text-gray-800">Menu</h2>
          <nav className="flex-1">
            <ul className="space-y-3">
              <li>
                <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#mission" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  Our Mission
                </a>
              </li>
              <li>
                <a href="#team" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  Our Team
                </a>
              </li>
              <li>
                <a href="/careers" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded transition-colors">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default SidebarMenu;