"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-12 h-12 rounded-full bg-slate-200/20 dark:bg-slate-800/50 animate-pulse" />
  }

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleTheme}
      className="relative p-3 rounded-full bg-white/10 dark:bg-slate-800/50 border border-slate-300/30 dark:border-cyan-400/30 hover:border-slate-400/60 dark:hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0.8,
        }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative"
      >
        {isDark ? <Sun className="w-5 h-5 text-orange-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
      </motion.div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400/20 to-yellow-400/20 dark:from-cyan-400/20 dark:to-purple-400/20 blur-md opacity-0 hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  )
}
