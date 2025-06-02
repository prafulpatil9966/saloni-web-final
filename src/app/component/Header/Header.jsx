import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="h-[70px] sm:h-[60px] flex items-center">
          <a href="/">
            <img
              className="h-full max-h-[70px] sm:max-h-[60px] w-auto object-contain"
              src="/header-logo-new.png"
              alt="Header Logo"
            />
          </a>
        </div>

        {/* Navigation Items */}
        <nav className="space-x-6">
          <a href='/' className="text-black hover:text-blue-600 transition">Home</a>
          <a href='/client-form' className="text-black hover:text-blue-600 transition">Add Details</a>
          <a href='/client-data' className="text-black hover:text-blue-600 transition">Client Data</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
