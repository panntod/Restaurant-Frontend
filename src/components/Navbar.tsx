import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logout } from "../utils/auth";

const Nav = ({ isLoggedIn }: { isLoggedIn?: boolean }) => {
  const location = useLocation();

  const links = [
    { text: "Food", to: "/food" },
    { text: "Transaksi", to: "/transaksi" },
  ];

  const activeClass = "text-white bg-gray-900";
  const inactiveClass = "text-gray-300 hover:text-white hover:bg-gray-700";

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center justify-between w-full">
            <div className="flex-shrink-0 text-white font-bold flex gap-4">
              <Link to="/">Restoran ABC</Link>
              <div>
                {isLoggedIn &&
                  links.map((link) => (
                    <Link
                      key={link.text}
                      to={link.to}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        location.pathname === link.to
                          ? activeClass
                          : inactiveClass
                      } `}
                    >
                      {link.text}
                    </Link>
                  ))}
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center gap-6">
                {isLoggedIn ? (
                  <>
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
                  </>
                ) : (
                  <a href="/cart">
                    <img
                      src="/cart.svg"
                      alt="Cart"
                      className="w-6 hover:scale-105"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
