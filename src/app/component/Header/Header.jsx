import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          <a href="/">
            MyLogo
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
