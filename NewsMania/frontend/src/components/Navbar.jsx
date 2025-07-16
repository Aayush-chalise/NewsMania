import { useState } from "react";
import { Menu, X, ChevronDown, Newspaper } from "lucide-react"; // Install lucide-react or use any icon lib
import * as motion from "motion/react-client";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownItems = [
    "Sports",
    "Politics",
    "Education",
    "International News",
  ];

  return (
    <header className="border-b border-white/10  bg-nav-color shadow-md px-4 py-3 sticky  z-50">
      <div className=" mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex ">
          <Newspaper className="text-theme-color mr-1.5" />
          <span className=" font-bold text-[15px] md:text-[17px] ">
            <span className="text-theme-color"> News</span>Mania
          </span>
        </a>

        <div className=" relative hidden md:block text-left">
          {/* Dropdown Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn flex items-center gap-1"
          >
            Categories <ChevronDown size={18} />
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <motion.ul
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.15,
                scale: { type: "spring", bounce: 0.1 },
              }}
              className="absolute mt-2 w-36 bg-nav-color rounded-lg shadow-lg z-50 
                     border border-white/10 p-3"
            >
              {dropdownItems.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#f56565", // or your theme color
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="w-full text-left font-medium text-[14px] block px-4 py-2 rounded-md text-white cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </div>

        <div className="flex justify-center items-center">
          <input
            type="text"
            placeholder="Search for latest news..."
            className="hidden md:block   w-96 px-1 py-2 border-0 border-b-1 border-b-white/20  focus:border-b-theme-color/70 focus:outline-none  "
          />
        </div>
        {/* Desktop Nav */}
        <nav className="mr-3 hidden md:flex space-x-6 items-center">
          <ul className="flex space-x-6   font-medium">
            <li>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#f56565" }} // scale up + change color to theme color
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className=" text-[15px] "
              >
                Home
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#f56565" }} // scale up + change color to theme color
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-[15px]  "
              >
                About
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#f56565" }} // scale up + change color to theme color
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-[15px]  "
              >
                Services
              </motion.a>
            </li>
            <li>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#f56565" }} // scale up + change color to theme color
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="text-[15px]  "
              >
                Contact
              </motion.a>
            </li>
          </ul>
        </nav>

        {/* Hamburger */}
        <div className="md:hidden ">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} className="mt-1.5 md:text" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 space-y-2">
          <ul className="flex flex-col space-y-1   ">
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-white/20 rounded-md hover:text-theme-color "
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2   hover:bg-white/20 rounded-md hover:text-theme-color"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-white/20 rounded-md hover:text-theme-color"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block px-4 py-2 hover:bg-white/20 rounded-md hover:text-theme-color"
              >
                Contact
              </a>
            </li>
          </ul>
          <div className="px-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full  py-1  border-0 border-b-1 border-b-white/20  focus:border-b-theme-color/70 focus:outline-none "
            />
          </div>
        </div>
      )}
    </header>
  );
}
