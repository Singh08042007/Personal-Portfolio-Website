"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { ExternalLink } from "lucide-react"

interface ProjectCardProps {
  title: string
  description: string
  link: string
  icon: React.ReactNode
}

export default function ProjectCard({ title, description, link, icon }: ProjectCardProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-800 rounded-2xl p-8 sm:p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-blue-100 dark:border-blue-900 group"
    >
      <motion.div
        className="text-6xl sm:text-7xl mb-6 sm:mb-8 text-center group-hover:scale-110 transition-transform duration-300 text-blue-500 dark:text-blue-400"
        animate={{ rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 5 }}
      >
        {icon}
      </motion.div>
      <motion.h3
        className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 dark:text-white text-center group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
      >
        {title}
      </motion.h3>
      <p className="text-gray-600 dark:text-gray-300 mb-8 text-center text-base sm:text-lg">{description}</p>
      <div className="text-center">
        <motion.a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-full font-semibold hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105 shadow-lg group-hover:shadow-xl text-base sm:text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View Project <ExternalLink className="ml-2 h-5 w-5" />
        </motion.a>
      </div>
    </motion.div>
  )
}
