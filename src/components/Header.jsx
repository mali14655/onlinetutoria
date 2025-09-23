import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminModal from "./AdminModal.jsx";
import logo from "../assets/logo.png";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [trigger, setTrigger] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close menu when switching to desktop view
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAdminAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, [trigger]);

  useEffect(() => {
    if (menuRef.current) {
      if (isMobile) {
        if (isMenuOpen) {
          menuRef.current.style.maxHeight = menuRef.current.scrollHeight + "px";
          document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
        } else {
          menuRef.current.style.maxHeight = "0px";
          document.body.style.overflow = "auto"; // Re-enable scrolling
        }
      } else {
        menuRef.current.style.maxHeight = "none";
        document.body.style.overflow = "auto";
      }
    }

    return () => {
      document.body.style.overflow = "auto"; // Cleanup
    };
  }, [isMenuOpen, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    setIsAuthenticated(false);
    setIsMenuOpen(false); // Close menu on logout
    navigate("/");
  };

  const closeMenu = () => {
    if (isMobile) {
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="text-gray-600 body-font sticky top-0 z-20 bg-white shadow">
      <div className="container mx-auto flex flex-wrap p-5 md:flex-row items-center justify-between">
        <div className="flex items-center justify-between w-full md:w-auto">
          <Link
            onClick={closeMenu}
            to="/"
            className="flex items-center text-gray-900 font-bold text-2xl"
          >
            <img
              src={logo}
              className="rounded-full h-[50px] w-[50px]"
              alt="OnlineTutoria Logo"
            />
            <span className="ml-3">OnlineTutoria</span>
          </Link>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <div
          ref={menuRef}
          className={`w-full md:w-auto md:flex md:items-center md:space-x-6 ${
            isMenuOpen
              ? "max-h-screen overflow-auto transition-max-height duration-300 ease-in-out"
              : "max-h-0 md:max-h-none overflow-hidden md:overflow-visible transition-max-height duration-300 ease-in-out"
          }`}
        >
          <nav className="flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-6 py-4 md:py-0">
            <Link
              onClick={closeMenu}
              to="/"
              className="text-gray-700 hover:text-indigo-500 px-3 py-2 md:py-1"
            >
              Home
            </Link>
            <Link
              onClick={closeMenu}
              to="/testimonials"
              className="text-gray-700 hover:text-indigo-500 px-3 py-2 md:py-1"
            >
              Testimonials
            </Link>
            <Link
              onClick={closeMenu}
              to="/faqs"
              className="text-gray-700 hover:text-indigo-500 px-3 py-2 md:py-1"
            >
              FAQs
            </Link>
            <Link
              onClick={closeMenu}
              to="/feedback"
              className="text-gray-700 hover:text-indigo-500 px-3 py-2 md:py-1"
            >
              Feedback
            </Link>
            <Link
              onClick={closeMenu}
              to="/contact"
              className="text-gray-700 hover:text-indigo-500 px-3 py-2 md:py-1"
            >
              Contact us
            </Link>
          </nav>

          <div className="mt-4 md:mt-0 md:ml-4 pb-4 md:pb-0">
            {isAuthenticated ? (
              <div className="flex gap-2">
              <button
                onClick={handleLogout}
                className="w-full md:w-auto inline-flex justify-center items-center bg-red-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-red-600 rounded transition"
              >
                Logout
              </button>
              <Link
                to="/admin"
                className="w-full md:w-auto inline-flex justify-center items-center bg-blue-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded transition"
              >
                Admin
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              </div>
            ) : (
              <button
                onClick={() => {
                  setModalOpen(true);
                  setTrigger(!trigger);
                  closeMenu();
                }}
                className="w-full md:w-auto inline-flex justify-center items-center bg-blue-500 text-white border-0 py-2 px-4 focus:outline-none hover:bg-blue-600 rounded transition"
              >
                Admin
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="w-4 h-4 ml-1"
                  viewBox="0 0 24 24"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      <AdminModal
        trigger={trigger}
        setTrigger={setTrigger}
        isOpen={isModalOpen}
        onClose={() => {
          setModalOpen(false);
          setIsAuthenticated(
            localStorage.getItem("isAuthenticated") === "true"
          );
        }}
      />
    </header>
  );
}
