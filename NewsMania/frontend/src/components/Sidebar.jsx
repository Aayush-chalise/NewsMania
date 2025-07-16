import { Home, User, Settings, LogOut } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-nav-color text-white p-6 flex flex-col   left">
      <h2 className="text-2xl font-bold mb-8">Dashboard</h2>
      <nav className="inline-block space-y-4">
        <a
          href="#"
          className="flex items-center gap-3 text-slate-300 hover:text-white"
        >
          <Home className="w-5 h-5" />
          Home
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-slate-300 hover:text-white"
        >
          <User className="w-5 h-5" />
          Profile
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-slate-300 hover:text-white"
        >
          <Settings className="w-5 h-5" />
          Settings
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-slate-300 hover:text-white"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </a>
      </nav>
    </div>
  );
};

export default Sidebar;
