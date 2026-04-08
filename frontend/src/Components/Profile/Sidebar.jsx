import { NavLink } from "react-router";
import { motion } from "motion/react";
import { FileText, Heart, Eye, MessageSquare, User } from "lucide-react";

const navItems = [
  { path: "blog", label: "Blog", icon: FileText },
  { path: "likes", label: "Likes", icon: Heart },
  { path: "views", label: "Views", icon: Eye },
  { path: "comments", label: "Comments", icon: MessageSquare },
];

export function Sidebar() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex-shrink-0"
    >
      <div>
        <nav className="flex items-center gap-2 overflow-x-auto">
          {navItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm whitespace-nowrap ${
                      isActive
                        ? "bg-blue-50 text-blue-600 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </NavLink>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </motion.aside>
  );
}