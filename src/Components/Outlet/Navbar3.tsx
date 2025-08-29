import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
 
const Navbar3 = () => {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => {
    return location.pathname === path;
  };
 
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/dashboard">
              {/* <div className="flex items-center">
                <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className='text-[#1E1E9C]'/>
                  <path d="M12 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <span className="text-xl font-bold text-[#1E1E9C]">TUSUKA</span>
              </div> */}

              <div className="flex items-center">
  <img 
    src="https://i.ibb.co.com/sd4bz8Dr/logotusuka.jpg" 
    alt=""
    className="h-12 w-auto" // Adjust height as needed (h-8 = 32px tall)
  />
</div>
            </Link>
          </div>
          
          {/* Navigation - Desktop */}
          <div className="hidden lg:flex items-center justify-center flex-1 mx-4">
            <div className="bg-gray-100 px-6 py-2 rounded-full shadow-md">
              <div className="inline-flex space-x-1">
                <Link 
                  to="/dashboard" 
                  className={`px-5 py-3 rounded-full text-sm font-medium flex items-center transition-colors ${
                    isActive('/dashboard') 
                      ? 'bg-custom-gradient text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                    <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Dashboard
                </Link>

                <Link 
                  to="/attendance" 
                  className={`px-5 py-3 rounded-full text-sm font-medium flex items-center transition-colors ${
                    isActive('/attendance') 
                      ? 'bg-custom-gradient text-white' 
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  Attendance
                </Link>

                <Link 
                  to="/leaves" 
                  className={`px-5 py-3 rounded-full text-sm font-medium flex items-center transition-colors ${
                    isActive('/leaves') 
                      ? 'bg-custom-gradient text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                    <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Leaves
                </Link>

                <Link 
                  to="/requisitions" 
                  className={`px-5 py-3 rounded-full text-sm font-medium flex items-center transition-colors ${
                    isActive('/requisitions') 
                      ? 'bg-custom-gradient text-white'
                      : 'text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M4 6h16M4 12h16M4 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  Requisitions
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right side - User Profile and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* User profile - hidden on mobile */}
            <div className="hidden lg:flex items-center relative" ref={dropdownRef}>
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center focus:outline-none"
              >
                <img 
                  className="h-10 w-10 rounded-full object-cover border-2 border-[#1E1E9C]" 
                  src={currentUser.profile_photo_path || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                  alt="User profile" 
                />
                <div className="ml-3 text-left">
                  <div className="text-sm font-semibold text-gray-800 line-clamp-1 max-w-[120px]">
                    {currentUser?.name || "wait..."}
                  </div>
                  <div className="text-xs text-gray-500 line-clamp-1 max-w-[120px]">
                    {currentUser?.email || "---@tusuka.com"}
                  </div>
                </div>
                <svg 
                  className={`w-5 h-5 ml-1 text-gray-400 transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`} 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 top-full">
                  <div className="py-1" role="none">
                    <Link
                      to="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-custom-gradient hover:text-white"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Your Profile
                      </div>
                    </Link>
                    <Link
                      to="/settings"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-custom-gradient hover:text-white"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </div>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-custom-gradient hover:text-white"
                      role="menuitem"
                    >
                      <div className="flex items-center">
                        <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign out
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Mobile menu button - shown only on mobile */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-custom-gradient hover:text-white focus:outline-none"
              >
                <span className="sr-only">Open main menu</span>
                {mobileMenuOpen ? (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`lg:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
          <Link 
            to="/dashboard" 
            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
              isActive('/dashboard') 
                ? 'bg-custom-gradient text-white'  
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
              <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
            </svg>
            Dashboard
          </Link>
          
          <Link 
            to="/attendance" 
            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
              isActive('/attendance') 
                ? 'bg-custom-gradient text-white'  
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
              <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
            </svg>
            Attendance
          </Link>
          
          <Link 
            to="/leaves" 
            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
              isActive('/leaves') 
                ? 'bg-custom-gradient text-white'  
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Leaves
          </Link>
          
          <Link 
            to="/requisitions" 
            className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
              isActive('/requisitions') 
                ? 'bg-custom-gradient text-white' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M4 6h16M4 12h16M4 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Requisitions
          </Link>

          <div className="border-t border-gray-200 pt-2">
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Your Profile
              </div>
            </Link>
            <Link
              to="/settings"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-custom-gradient hover:text-white"
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </div>
            </Link>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-custom-gradient hover:text-white"
            >
              <div className="flex items-center">
                <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign out
              </div>
            </button>
          </div>
          
          {/* Mobile user profile info */}
          <div className="border-t border-gray-200 pt-2">
            <div className="px-3 py-2 flex items-center">
              <img 
                className="h-10 w-10 rounded-full object-cover border border-[#955DF2]" 
                src={currentUser?.profile_photo_path || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                alt="User profile" 
              />
              <div className="ml-3">
                <div className="text-base font-semibold text-gray-800 line-clamp-1">
                  {currentUser?.name || "Mr./Mrs."}
                </div>
                <div className="text-sm text-gray-500 line-clamp-1">
                  {currentUser?.email || "null@tusuka.com"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar3;
// import React, { useState, useRef, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

// const Navbar = () => {
//   const { currentUser, logout } = useAuth();
//   const location = useLocation();
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const dropdownRef = useRef(null);

//   const isActive = (path) => {
//     return location.pathname === path;
//   };
 
//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setProfileDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleLogout = () => {
//     logout();
//     setProfileDropdownOpen(false);
//   };
  

//   return (
//     <header className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-20 items-center">
//           {/* Logo */}
//             <Link 
//                   to="/dashboard" >
//           <div className="flex items-center">
//             <svg className="w-7 h-7 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className='text-[#1E1E9C]'/>
//               <path d="M12 6V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//               <path d="M12 12L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//             </svg>
//             <span className="text-xl font-bold text-[#1E1E9C]">TUSUKA</span>
//           </div>
//           </Link>
//           {/* Navigation - Desktop */}
//           <div className="hidden md:flex items-center justify-center flex-1">
//             <div className="bg-gray-100 px-6 py-2 rounded-full shadow-md">
//               <div className="inline-flex space-x-3">
//                 <Link 
//                   to="/dashboard" 
//                   className={`px-5 py-3 rounded-full text-sm font-medium flex items-center transition-colors ${
//                     isActive('/dashboard') 
//                       ? 'bg-custom-gradient text-white' 
//                       : 'text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//                     <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//                     <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//                     <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//                   </svg>
//                   Dashboard
//                 </Link>

//                 <Link 
//                   to="/attendance" 
//                   className={`px-5 py-3 rounded-full text-sm font-medium flex items-center transition-colors ${
//                     isActive('/attendance') 
//                       ? 'bg-custom-gradient text-white' 
//                       : 'text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
//                     <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
//                   </svg>
//                   Attendance
//                 </Link>

//                 <Link 
//                   to="/leaves" 
//                   className={`px-5 py-3 rounded-full text-sm font-medium flex items-center transition-colors ${
//                     isActive('/leaves') 
//                       ? 'bg-custom-gradient text-white'
//                       : 'text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
//                     <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//                     <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//                   </svg>
//                   Leaves
//                 </Link>

//                 <Link 
//                   to="/requisitions" 
//                   className={`px-5 py-3 rounded-full text-sm font-medium flex items-center transition-colors ${
//                     isActive('/requisitions') 
//                       ? 'bg-custom-gradient text-white'
//                       : 'text-gray-700 hover:bg-gray-200'
//                   }`}
//                 >
//                   <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path d="M4 6h16M4 12h16M4 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//                   </svg>
//                   Requisitions
//                 </Link>
//               </div>
//             </div>
//           </div>
          
//           {/* Right side - User Profile and Mobile Menu */}
//           <div className="flex items-center space-x-4">
//             {/* User profile - hidden on mobile */}
//             <div className="hidden md:flex items-center relative" ref={dropdownRef}>
//               <button 
//                 onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                 className="flex items-center focus:outline-none"
//               >
//                 <img 
//                   className="h-12 w-12 rounded-full object-cover border-2 border-[#1E1E9C]" 
//                   src={currentUser.profile_photo_path || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
//                   alt="User profile" 
//                 />
//                 <div className="ml-3 text-left">
//                   <div className="text-sm font-semibold text-gray-800">
//                     {currentUser?.name || "wait..."}
//                   </div>
//                   <div className="text-xs text-gray-500">
//                     {currentUser?.email|| "---@tusuka.com"}
//                   </div>
//                 </div>
//                 <svg 
//                   className={`w-5 h-5 ml-2 text-gray-400 transition-transform ${profileDropdownOpen ? 'transform rotate-180' : ''}`} 
//                   viewBox="0 0 20 20" 
//                   fill="currentColor"
//                 >
//                   <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//                 </svg>
//               </button>
              
//               {/* Profile Dropdown */}
//               {profileDropdownOpen && (
//                 <div className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 top-full">
//                   <div className="py-1" role="none">
//                     <Link
//                       to="/profile"
//                       onClick={() => setProfileDropdownOpen(false)}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-custom-gradient hover:text-white"
//                       role="menuitem"
//                     >
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                         </svg>
//                         Your Profile
//                       </div>
//                     </Link>
//                     <Link
//                       to="/settings"
//                       onClick={() => setProfileDropdownOpen(false)}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-custom-gradient hover:text-white"
//                       role="menuitem"
//                     >
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         </svg>
//                         Settings
//                       </div>
//                     </Link>
//                     <button
//                       onClick={handleLogout}
//                       className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-custom-gradient hover:text-white"
//                       role="menuitem"
//                     >
//                       <div className="flex items-center">
//                         <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                         </svg>
//                         Sign out
//                       </div>
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
            
//             {/* Mobile menu button - shown only on mobile */}
//             <div className="md:hidden flex items-center">
//               <button 
//                 onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                 className="inline-flex items-center justify-center p-2 rounded-md text-gray-700  hover:bg-custom-gradient hover:text-white focus:outline-none"
//               >
//                 <span className="sr-only">Open main menu</span>
//                 {mobileMenuOpen ? (
//                   <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 ) : (
//                   <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Mobile menu, show/hide based on menu state */}
//       <div className={`md:hidden ${mobileMenuOpen ? 'block' : 'hidden'}`}>
//         <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
//           <Link 
//             to="/dashboard" 
//             className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
//               isActive('/dashboard') 
//                 ? 'bg-custom-gradient text-white'  
//                 : 'text-gray-700 hover:bg-gray-100'
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//               <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//               <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//               <rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2" />
//             </svg>
//             Dashboard
//           </Link>
          
//           <Link 
//             to="/attendance" 
//             className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
//               isActive('/attendance') 
//                 ? 'bg-custom-gradient text-white'  
//                 : 'text-gray-700 hover:bg-gray-100'
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
//               <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="2" />
//             </svg>
//             Attendance
//           </Link>
          
//           <Link 
//             to="/leaves" 
//             className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
//               isActive('/leaves') 
//                 ? 'bg-custom-gradient text-white'  
//                 : 'text-gray-700 hover:bg-gray-100'
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
//               <path d="M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//               <path d="M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//             </svg>
//             Leaves
//           </Link>
          
//           <Link 
//             to="/requisitions" 
//             className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
//               isActive('/requisitions') 
//                 ? 'bg-custom-gradient text-white' 
//                 : 'text-gray-700 hover:bg-gray-100'
//             }`}
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             <svg className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path d="M4 6h16M4 12h16M4 18h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//             </svg>
//             Requisitions
//           </Link>

//            {/* <div className="mt-1 space-y-1"> */}
//                 <Link
//                   to="/profile"
//                   onClick={() => {
//                     setProfileDropdownOpen(false);
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-100"
//                 >
//                   <div className="flex items-center">
//                     <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                     Your Profile
//                   </div>
//                 </Link>
//                 <Link
//                   to="/settings"
//                   onClick={() => {
//                     setProfileDropdownOpen(false);
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block px-4 py-2 text-base font-medium text-gray-700 hover:bg-custom-gradient hover:text-white"
//                 >
//                   <div className="flex items-center">
//                     <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                     Settings
//                   </div>
//                 </Link>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setMobileMenuOpen(false);
//                   }}
//                   className="block w-full text-left px-4 py-2 text-base font-medium text-gray-700 hover:bg-custom-gradient hover:text-white"
//                 >
//                   <div className="flex items-center">
//                     <svg className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                     </svg>
//                     Sign out
//                   </div>
//                 </button>
//               {/* </div> */}
          
//           {/* Mobile user profile dropdown */}
//           <div className="border-t border-gray-200 pt-2">
//             <div className="px-3 py-2 flex items-center justify-between">
//               <div className="flex items-center">
//                 <img 
//                   className="h-10 w-10 rounded-full object-cover border border-[#955DF2]" 
//                   src={currentUser?.profile_photo_path || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
//                   alt="User profile" 
//                 />
//                 <div className="ml-3">
//                   <div className="text-base font-semibold text-gray-800">
//                     {currentUser?.name || "Mr./Mrs."}
//                   </div>
//                   <div className="text-sm text-gray-500">
//                     {currentUser?.email || "null@tusuka.com"}
//                   </div>
//                 </div>

                
//               </div>

              
//             </div>

//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;