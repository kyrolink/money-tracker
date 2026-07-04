import { NavLink } from "react-router-dom";

import {
  LuLayoutDashboard,
  LuWallet,
  LuTags,
  LuSettings,
} from "react-icons/lu";

const menus = [
  {
    path: "/",
    icon: LuLayoutDashboard,
  },
  {
    path: "/transactions",
    icon: LuWallet,
  },
  {
    path: "/categories",
    icon: LuTags,
  },
  {
    path: "/settings",
    icon: LuSettings,
  },
];

export default function MobileNavbar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 flex justify-around p-3">

      {menus.map((menu) => {
        const Icon = menu.icon;

        return (
          <NavLink
            key={menu.path}
            to={menu.path}
            className={({ isActive }) =>
              isActive
                ? "text-amber-500"
                : "text-slate-500"
            }
          >
            <Icon size={24} />
          </NavLink>
        );
      })}
    </div>
  );
}