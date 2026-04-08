import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, LogIn, Settings, HelpCircle, LogOut, Shield, Zap, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-primary via-accent-3 to-secondary hover:scale-110 transition-transform focus:outline-hidden ring-2 ring-white shadow-md"
        aria-label="User profile"
      >
        <User size={20} className="text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, y: 15, scale: 0.9, rotate: 2 }}
            transition={{ type: "spring", damping: 15, stiffness: 300 }}
            className="absolute right-0 mt-3 w-64 rounded-2xl bg-white border border-border shadow-2xl overflow-hidden z-50 p-2"
          >
            <div className="p-4 mb-2 rounded-xl bg-linear-to-r from-primary/10 to-secondary/10 border border-primary/5">
              <p className="font-bold text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">Creative explorer</p>
              <p className="text-xs text-muted-foreground font-medium">Guest@multicolor.app</p>
            </div>
            
            <div className="space-y-1">
              <button className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl hover:bg-primary/10 text-foreground transition-all text-left group">
                <div className="p-1.5 rounded-lg bg-primary text-white shadow-sm group-hover:rotate-12 transition-transform">
                  <LogIn size={16} />
                </div>
                <span className="font-semibold text-sm"><Link to='/login'>Login</Link></span>
              </button>
              
              <button className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl hover:bg-accent-1/10 text-foreground transition-all text-left group">
                <div className="p-1.5 rounded-lg bg-accent-1 text-white shadow-sm group-hover:rotate-12 transition-transform">
                  <Zap size={16} />
                </div>
                <span className="font-semibold text-sm">Quick Settings</span>
              </button>

              <button className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl hover:bg-accent-2/10 text-foreground transition-all text-left group">
                <div className="p-1.5 rounded-lg bg-accent-2 text-white shadow-sm group-hover:rotate-12 transition-transform">
                  <Shield size={16} />
                </div>
                <span className="font-semibold text-sm">Privacy Pro</span>
              </button>

              <button className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl hover:bg-accent-3/10 text-foreground transition-all text-left group">
                <div className="p-1.5 rounded-lg bg-accent-3 text-white shadow-sm group-hover:rotate-12 transition-transform">
                  <Heart size={16} />
                </div>
                <span className="font-semibold text-sm">Favorites</span>
              </button>
            </div>

            <div className="mt-2 pt-2 border-t border-border">
              <button className="flex items-center w-full gap-3 px-3 py-2.5 rounded-xl hover:bg-destructive/10 text-destructive transition-all text-left group">
                <div className="p-1.5 rounded-lg bg-destructive text-white shadow-sm group-hover:scale-110 transition-transform">
                  <LogOut size={16} />
                </div>
                <span className="font-semibold text-sm">Exit App</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
