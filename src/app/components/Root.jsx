import { useLocation, Outlet, Link } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { useState } from "react";

export function Root() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-green-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-gradient-to-r from-orange-500 to-green-500 p-2 rounded-lg">
                <Leaf className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-orange-600 to-green-600 bg-clip-text text-transparent">
                FoodShare
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`transition-colors ${
                  isActive("/")
                    ? "text-orange-600 font-semibold"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                Home
              </Link>
              <Link
                to="/donate"
                className={`transition-colors ${
                  isActive("/donate")
                    ? "text-orange-600 font-semibold"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                Donate Food
              </Link>
              <Link
                to="/browse"
                className={`transition-colors ${
                  isActive("/browse")
                    ? "text-orange-600 font-semibold"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                Browse Food
              </Link>
              <Link
                to="/how-it-works"
                className={`transition-colors ${
                  isActive("/how-it-works")
                    ? "text-orange-600 font-semibold"
                    : "text-gray-700 hover:text-orange-600"
                }`}
              >
                How It Works
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-3">
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive("/")
                      ? "bg-orange-100 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Home
                </Link>
                <Link
                  to="/donate"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive("/donate")
                      ? "bg-orange-100 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Donate Food
                </Link>
                <Link
                  to="/browse"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive("/browse")
                      ? "bg-orange-100 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  Browse Food
                </Link>
                <Link
                  to="/how-it-works"
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-lg transition-colors ${
                    isActive("/how-it-works")
                      ? "bg-orange-100 text-orange-600 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  How It Works
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-green-500 p-2 rounded-lg">
                  <Leaf className="h-6 w-6 text-white" />
                </div>
                <span className="font-bold text-xl">FoodShare</span>
              </div>
              <p className="text-gray-400">
                Reducing food waste, one meal at a time. Connect donors with
                those in need.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/" className="block text-gray-400 hover:text-white">
                  Home
                </Link>
                <Link
                  to="/donate"
                  className="block text-gray-400 hover:text-white"
                >
                  Donate Food
                </Link>
                <Link
                  to="/browse"
                  className="block text-gray-400 hover:text-white"
                >
                  Browse Food
                </Link>
                <Link
                  to="/how-it-works"
                  className="block text-gray-400 hover:text-white"
                >
                  How It Works
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                Join us in the fight against food waste!
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 FoodShare. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
