import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/auth";

const Nav = ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();

  const links = [
    { text: "Home", to: "/" },
    { text: "Transaksi", to: "/transaksi" },
  ];

  const activeClass = "text-white bg-gray-900";
  const inactiveClass = "text-gray-300 hover:text-white hover:bg-gray-700";

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-white font-bold">
              Restoran ABC
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {isLoggedIn &&
                  links.map((link, i) => (
                    <Link
                      key={link.text}
                      to={link.to}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === link.to
                          ? activeClass
                          : inactiveClass
                      } ${i > 0 && "ml-4"}`}
                    >
                      {link.text}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              {/* Profile dropdown */}
              <div className="ml-3 relative">
                {isLoggedIn && (
                  <div>
                    <button
                      className="text-white max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                      id="user-menu"
                      aria-label="User menu"
                      aria-haspopup="true"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                )}

                {/*  
                Profile dropdown panel, show/hide based on dropdown state.

                Entering: "transition ease-out duration-100"
                  From: "transform opacity-0 scale-95"
                  To: "transform opacity-100 scale-100"
                Leaving: "transition ease-in duration-75"
                  From: "transform opacity-100 scale-100"
                  To: "transform opacity-0 scale-95"
              */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu open: "block", Menu closed: "hidden" */}
      <div className={`md:hidden ${showMenu ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 sm:px-3">
          {links.map((link, i) => (
            <Link
              key={link.text}
              to={link.to}
              className={`block px-3 py-2 rounded-md text-sm font-medium ${
                location.pathname === link.to ? activeClass : inactiveClass
              } ${i > 0 && "mt-1"}`}
            >
              {link.text}
            </Link>
          ))}
        </div>
        <div className="pt-4 pb-3 border-t border-gray-700">
          <div className="flex items-center px-5">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </div>
            <div className="ml-3">
              <div className="text-base font-medium leading-none text-white">
                Tom Cook
              </div>
              <div className="text-sm font-medium leading-none text-gray-400">
                tom@example.com
              </div>
            </div>
          </div>
          <div className="mt-3 px-2 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Your Profile
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Settings
            </a>
            <a
              href="#"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
            >
              Sign out
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
