import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <NavLink
          to="/"
          onClick={closeMenu}
          className="text-xl font-bold text-blue-600 sm:text-2xl"
        >
          Collector's Hub
        </NavLink>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">

          <NavLink
            to="/marketplace"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`
            }
          >
            Marketplace
          </NavLink>

          <NavLink
            to="/community"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`
            }
          >
            Community
          </NavLink>

          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-blue-600"
                  : "text-gray-600 hover:text-blue-600"
              }`
            }
          >
            My Collection
          </NavLink>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          aria-label={
            isOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-gray-200 bg-white md:hidden">

          <div className="flex flex-col px-4 py-3 sm:px-6">

            <NavLink
              to="/marketplace"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Marketplace
            </NavLink>

            <NavLink
              to="/community"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              Community
            </NavLink>

            <NavLink
              to="/collection"
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-lg px-4 py-3 font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-50"
                }`
              }
            >
              My Collection
            </NavLink>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;