import { NavLink } from "react-router-dom";

import {
  LuLayoutDashboard,
  LuWallet,
  LuTags,
  LuSettings,
} from "react-icons/lu";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: LuLayoutDashboard,
  },
  {
    name: "Transactions",
    path: "/transactions",
    icon: LuWallet,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: LuTags,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: LuSettings,
  },
];

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-white border-r border-slate-200">

      <div className="p-6">

        <h1 className="text-2xl font-bold text-amber-500">
          💰 Money Tracker
        </h1>

      </div>

      <nav className="px-4">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-3 rounded-xl mb-2 transition

                ${
                  isActive
                    ? "bg-amber-500 text-white"
                    : "hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />

              {menu.name}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}