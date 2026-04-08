import { motion } from "motion/react";
import { Mail, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const socialLinks = [
    { icon: Twitter, label: "X", href: "#" },
    { icon: Mail, label: "Gmail", href: "mailto:contact@bloghub.com" },
    { icon: Instagram, label: "Instagram", href: "#" },
    { icon: Facebook, label: "Facebook", href: "#" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <motion.footer
      className="w-full bg-gray-900 text-white py-8 px-4"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
          variants={containerVariants}
        >
          {/* App Name */}
          <motion.div variants={itemVariants} className="flex items-center">
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              BlogHub
            </h2>
          </motion.div>

          {/* Separator */}
          <motion.div
            variants={itemVariants}
            className="hidden md:block h-6 w-px bg-gray-600"
          />

          {/* Copyright */}
          <motion.div variants={itemVariants} className="text-sm text-gray-400">
            © {new Date().getFullYear()} BlogHub. All rights reserved
          </motion.div>

          {/* Separator */}
          <motion.div
            variants={itemVariants}
            className="hidden md:block h-6 w-px bg-gray-600"
          />

          {/* Terms and Conditions */}
          <motion.a
            variants={itemVariants}
            href="#"
            className="text-sm text-gray-400 hover:text-white transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Terms & Conditions
          </motion.a>

          {/* Separator */}
          <motion.div
            variants={itemVariants}
            className="hidden md:block h-6 w-px bg-gray-600"
          />

          {/* Social Media Links */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5"
          >
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-gray-400 hover:text-white transition-colors duration-300"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
