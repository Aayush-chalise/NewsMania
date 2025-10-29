import { useState } from "react";
import { Menu, X, ChevronDown, Newspaper } from "lucide-react"; // Install lucide-react or use any icon lib
import * as motion from "motion/react-client";
import { useContext } from "react";
import NewsListContext from "../context/NewsListContext"; // Import your context
import { useNavigate } from "react-router-dom";
import { LogOut, User } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { handleListItemClick } = useContext(NewsListContext);
  const responseDataFromServer = JSON.parse(localStorage.getItem("userData"));
  console.log(responseDataFromServer);

  const dropdownItems = [
    "Sports",
    "Entertainment",
    "General",
    "Health",
    "Science",
    "Technology",
    "Business",
    "Environment",
    "Politics",
    "Top",
    "World",
  ];

  const handleClick = () => {
    Navigate("/notes");
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    Navigate("/");
  };

  return (
    <header className=" text-white border-b border-white/10  bg-card-color shadow-md px-4 py-3 sticky  z-50">
      <div className=" mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="/home" className="flex ">
          <Newspaper className="text-theme-color mr-1.5" />
          <span className=" font-bold text-[15px] md:text-[17px] ">
            <span className="text-theme-color"> News</span>Mania
          </span>
        </a>

        <div className=" relative hidden md:block text-left">
          {/* Dropdown Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" font-medium text-[15px] btn flex items-center gap-1"
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
              className="absolute mt-2 w-36 bg-card-color rounded-lg shadow-lg z-50 
                     border border-white/10 p-3 "
            >
              {dropdownItems.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{
                    backgroundColor: "rgba(255,255,255,0.1)",
                    color: "#f56565", // or your theme color
                  }}
                  onClick={() => {
                    handleListItemClick(item);
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
        <div>
          <button
            onClick={handleClick}
            className="btn flex items-center gap-1 font-medium text-[15px]"
          >
            Take Notes
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className=" text-white mr-3 hidden md:flex space-x-6 items-center">
          <motion.a
            href="#"
            whileHover={{ color: "#f56565" }} // scale up + change color to theme color
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-1 "
          >
            <User size={18} className="mb-1"></User>
            {responseDataFromServer && (
              <motion.span className=" text-[15px] font-medium">
                {" "}
                {responseDataFromServer.user.username}{" "}
              </motion.span>
            )}
          </motion.a>

          <ul className="flex space-x-6   font-bold">
            <li>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, color: "#f56565" }} // scale up + change color to theme color
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className=" text-[15px] font-medium "
              >
                Home
              </motion.a>
            </li>
          </ul>
          <div>
            <motion.button
              onClick={handleLogout}
              className=" flex items-center gap-1 font-medium text-[15px]"
              href="#"
              whileHover={{ scale: 1.1, color: "#f56565" }} // scale up + change color to theme color
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              logout
              <LogOut size={18}></LogOut>
            </motion.button>
          </div>
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
        <div className="text-white md:hidden mt-3 space-y-2">
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
              <motion.a
                href="#"
                whileHover={{ color: "#f56565" }} // scale up + change color to theme color
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex items-center gap-1 "
              >
                <User size={18} className="mb-1"></User>
                {responseDataFromServer && (
                  <motion.span className=" text-[15px] font-medium">
                    {" "}
                    {responseDataFromServer.user.username}{" "}
                  </motion.span>
                )}
              </motion.a>
            </li>
            <li>
              <motion.button
                onClick={handleLogout}
                className=" flex items-center gap-1 font-medium text-[15px]"
                href="#"
                whileHover={{ scale: 1.1, color: "#f56565" }} // scale up + change color to theme color
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                logout
                <LogOut size={18}></LogOut>
              </motion.button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
