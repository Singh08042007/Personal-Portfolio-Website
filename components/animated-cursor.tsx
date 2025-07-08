'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function AnimatedCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener('mousemove', updateMousePosition)
    document.body.addEventListener('mouseenter', handleMouseEnter)
    document.body.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.body.removeEventListener('mouseenter', handleMouseEnter)
      document.body.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full bg-red-500 pointer-events-none z-50 mix-blend-difference"
      animate={{ 
        x: mousePosition.x - 12, 
        y: mousePosition.y - 12,
        opacity: isVisible ? 1 : 0
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 28,
        opacity: { duration: 0.2 }
      }}
    />
  )
}
