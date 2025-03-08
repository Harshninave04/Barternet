import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-sm z-10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-blue-600 text-xl font-bold">BarterNet</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/explore" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
              Explore
            </Link>
            <Link
              to="/how-it-works"
              className="text-gray-600 hover:text-blue-600 text-sm font-medium">
              How It Works
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
              About Us
            </Link>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                  Dashboard
                </Link>
                <div className="relative ml-3 group p-1">
                  <button className="flex items-center space-x-2 text-sm focus:outline-none">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">{user.name.charAt(0)}</span>
                    </div>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                    </div>
                    <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="origin-top-right absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Your Profile
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Settings
                      </Link>
                      <Link
                        to="/upload-product"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Upload Product
                      </Link>
                      <Link
                        to="/browse-products"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Browse Products
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                        Sign out
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <Link to="/login" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition duration-300">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-500 hover:text-blue-600 focus:outline-none">
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="container mx-auto px-4 space-y-1">
            <Link
              to="/explore"
              className="block py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}>
              Explore
            </Link>
            <Link
              to="/how-it-works"
              className="block py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}>
              How It Works
            </Link>
            <Link
              to="/about"
              className="block py-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}>
              About Us
            </Link>

            {user ? (
              <>
                <div className="py-2 border-t border-gray-100">
                  <div className="flex items-center py-2">
                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">{user.name.charAt(0)}</span>
                    </div>
                    <div className="ml-3">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-xs text-gray-500 capitalize">{user.role}</div>
                    </div>
                  </div>
                  <Link
                    to="/dashboard"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Your Profile
                  </Link>
                  <Link
                    to="/settings"
                    className="block py-2 text-gray-600 hover:text-blue-600"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left block py-2 text-red-600 hover:text-red-700">
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col space-y-2 pt-2 border-t border-gray-100">
                <Link
                  to="/login"
                  className="block py-2 text-gray-600 hover:text-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-center font-medium hover:bg-blue-700"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
