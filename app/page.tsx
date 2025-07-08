"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Code,
  BookOpen,
  ExternalLink,
  BarChart2,
  Brain,
  Menu,
  X,
  FileText,
  Mail,
  Zap,
  Target,
  Rocket,
  Star,
  Globe,
  Briefcase,
  Sparkles,
  Code2,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import dynamic from "next/dynamic"
import { useInView } from "react-intersection-observer"
import ContactForm from "@/components/contact-form"
import { FaInstagram, FaYoutube, FaSnapchat, FaGithub, FaLinkedin } from "react-icons/fa"

// Dynamically import ParallaxProvider to avoid SSR issues
const ParallaxProvider = dynamic(() => import("react-scroll-parallax").then((mod) => mod.ParallaxProvider), {
  ssr: false,
})

// Enhanced floating particles
function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${
            i % 4 === 0
              ? "w-2 h-2 bg-cyan-400/30"
              : i % 4 === 1
                ? "w-3 h-3 bg-purple-400/25"
                : i % 4 === 2
                  ? "w-1 h-1 bg-orange-400/40"
                  : "w-4 h-4 bg-pink-400/20"
          }`}
          animate={{
            x: [0, 200, -100, 0],
            y: [0, -150, 100, 0],
            rotate: [0, 360],
            scale: [1, 1.5, 0.8, 1],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          style={{
            left: `${5 + i * 8}%`,
            top: `${10 + i * 7}%`,
          }}
        />
      ))}
    </div>
  )
}

// Fixed typewriter with better visibility and faster speed
function EnhancedTypewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(
        () => {
          setDisplayText(text.slice(0, currentIndex + 1))
          setCurrentIndex(currentIndex + 1)
        },
        delay + currentIndex * 25, // Fast typing speed
      )
      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, delay])

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)
    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className="relative">
      <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-bold">
        {displayText}
      </span>
      <span
        className={`inline-block w-1 h-8 sm:h-12 bg-gradient-to-b from-cyan-400 to-purple-500 ml-2 ${
          showCursor ? "opacity-100" : "opacity-0"
        } transition-opacity duration-150`}
      />
    </span>
  )
}

// Smooth scroll function
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const headerHeight = 80
    const elementPosition = element.offsetTop - headerHeight
    window.scrollTo({
      top: elementPosition,
      behavior: "smooth",
    })
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero")
  const [isContactFormOpen, setIsContactFormOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 },
    )

    const sections = document.querySelectorAll("section")
    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false)
    setTimeout(() => {
      scrollToSection(sectionId)
    }, 100)
  }

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:from-slate-950 dark:via-purple-950/50 dark:to-slate-900 text-slate-900 dark:text-white relative overflow-hidden transition-all duration-500">
        <FloatingParticles />

        {/* Enhanced custom cursor */}
        <motion.div
          className="fixed w-8 h-8 border-2 border-cyan-400 rounded-full pointer-events-none z-50 mix-blend-difference hidden md:block"
          animate={{
            x: mousePosition.x - 16,
            y: mousePosition.y - 16,
          }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
        >
          <div className="w-2 h-2 bg-cyan-400 rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        </motion.div>

        <Header
          activeSection={activeSection}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          scrolled={scrolled}
          onNavClick={handleNavClick}
        />

        <main>
          <HeroSection />
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ConnectSection onContactClick={() => setIsContactFormOpen(true)} />
        </main>

        <Footer />

        <ContactForm
          isOpen={isContactFormOpen}
          onClose={() => setIsContactFormOpen(false)}
          serviceId="service_jxhm8tm"
        />
      </div>
    </ParallaxProvider>
  )
}

function Header({
  activeSection,
  mobileMenuOpen,
  setMobileMenuOpen,
  scrolled,
  onNavClick,
}: {
  activeSection: string
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
  scrolled: boolean
  onNavClick: (sectionId: string) => void
}) {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-cyan-500/20"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center space-x-3"
        >
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">DS</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 rounded-xl blur-md opacity-50 -z-10" />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Deepinder Singh
            </span>
            <div className="text-xs text-cyan-600 dark:text-cyan-300 font-medium">AI Enthusiast</div>
          </div>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {["hero", "about", "projects", "skills", "connect"].map((section, index) => (
            <motion.button
              key={section}
              onClick={() => scrollToSection(section)}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`relative text-sm font-medium transition-all duration-300 hover:text-cyan-500 ${
                activeSection === section ? "text-cyan-500" : "text-slate-600 dark:text-gray-300"
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
              {activeSection === section && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </motion.button>
          ))}

          <motion.a
            href="https://drive.google.com/file/d/19lx8VlkIz2DGY36DCc3lWmIk6nTZFf2d/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-xl text-sm font-medium hover:from-cyan-600 hover:to-purple-600 transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-cyan-500/25 text-white"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <ThemeToggle />
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-3">
          <ThemeToggle />
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl bg-slate-200/50 dark:bg-slate-800/50 hover:bg-slate-300/50 dark:hover:bg-slate-700/50 transition-all duration-300 border border-slate-300/30 dark:border-cyan-400/20"
          >
            {mobileMenuOpen ? (
              <X size={20} className="text-slate-700 dark:text-white" />
            ) : (
              <Menu size={20} className="text-slate-700 dark:text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-t border-slate-200/50 dark:border-cyan-500/20"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {["hero", "about", "projects", "skills", "connect"].map((section, index) => (
                <motion.button
                  key={section}
                  onClick={() => onNavClick(section)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`block w-full text-left py-2 text-base font-medium transition-colors ${
                    activeSection === section
                      ? "text-cyan-500"
                      : "text-slate-600 dark:text-gray-300 hover:text-cyan-500"
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </motion.button>
              ))}
              <motion.a
                href="https://drive.google.com/file/d/19lx8VlkIz2DGY36DCc3lWmIk6nTZFf2d/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.6 }}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center space-x-2 py-2 text-base font-medium text-slate-600 dark:text-gray-300 hover:text-cyan-500 transition-colors"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

function HeroSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} id="hero" className="min-h-screen flex items-center justify-center relative pt-20 pb-20">
      {/* Enhanced animated background */}
      <div className="absolute inset-0 opacity-20 dark:opacity-30 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, cyan 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, purple 0.5px, transparent 0.5px),
              radial-gradient(circle at 50% 50%, pink 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px, 60px 60px, 100px 100px",
          }}
        />
      </div>

      <div className="container mx-auto px-4 text-center relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto space-y-12"
        >
          {/* Enhanced Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.5 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto"
          >
            {/* Multiple rotating rings */}
            <div className="absolute inset-0 rounded-full">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-full animate-spin-slow"></div>
              <div
                className="absolute inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 rounded-full animate-spin-slow"
                style={{ animationDirection: "reverse", animationDuration: "12s" }}
              ></div>
              <div className="absolute inset-2 bg-white dark:bg-slate-900 rounded-full"></div>
            </div>

            {/* Enhanced image container */}
            <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-white/20 shadow-2xl">
              <Image
                src="/images/profile-picture.jpg"
                alt="Deepinder Singh"
                fill
                className="object-cover object-center brightness-110 contrast-110 saturate-110"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-cyan-400/5"></div>
            </div>

            {/* Floating sparkles around image */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full"
                animate={{
                  x: [0, 20, -20, 0],
                  y: [0, -20, 20, 0],
                  scale: [1, 1.5, 0.5, 1],
                  opacity: [0.7, 1, 0.3, 0.7],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                style={{
                  left: `${20 + i * 60}%`,
                  top: `${10 + i * 15}%`,
                }}
              />
            ))}
          </motion.div>

          {/* Title Section with proper spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold">
              <div className="text-slate-600 dark:text-gray-300 mb-6 text-3xl sm:text-4xl lg:text-5xl">Hello, I'm</div>
              <div className="min-h-[1.2em]">{inView && <EnhancedTypewriter text="Deepinder Singh" delay={300} />}</div>
            </h1>
          </motion.div>

          {/* Subtitle with proper spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex items-center justify-center space-x-3"
          >
            <Sparkles className="w-6 h-6 text-cyan-400" />
            <span className="text-xl sm:text-2xl text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text font-semibold">
              AI & Data Science Enthusiast
            </span>
            <Sparkles className="w-6 h-6 text-purple-400" />
          </motion.div>

          {/* Description with proper spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 1.6 }}
            className="max-w-3xl mx-auto space-y-3"
          >
            <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 leading-relaxed">
              Crafting intelligent solutions through code, data, and innovation.
            </p>
            <p className="text-lg sm:text-xl text-slate-600 dark:text-gray-400 leading-relaxed">
              Currently pursuing B.Tech in AI & Data Science at{" "}
              <span className="text-cyan-500 font-semibold">Chandigarh Engineering College</span>.
            </p>
          </motion.div>

          {/* Buttons with proper spacing and isolation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="relative z-30 pt-8"
          >
            {/* Clear background for buttons */}
            <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm rounded-3xl p-8 border border-slate-200/50 dark:border-slate-800/30">
              <div className="flex flex-wrap gap-6 justify-center">
                <motion.button
                  onClick={() => scrollToSection("projects")}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full font-semibold text-white transition-all duration-300 flex items-center space-x-3 shadow-2xl hover:shadow-cyan-500/25 overflow-hidden z-40"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Rocket className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Explore My Work</span>
                </motion.button>

                <motion.button
                  onClick={() => scrollToSection("connect")}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 border-2 border-cyan-400 rounded-full font-semibold text-cyan-500 hover:bg-cyan-400/10 transition-all duration-300 flex items-center space-x-3 backdrop-blur-sm z-40"
                >
                  <Mail className="w-5 h-5" />
                  <span>Get In Touch</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-12 border-2 border-cyan-400 rounded-full flex justify-center relative"
        >
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-4 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-full mt-2"
          />
          <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full blur-sm" />
        </motion.div>
      </motion.div>
    </section>
  )
}

function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={ref} id="about" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                About Me
              </span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: inView ? 1 : 0, scaleX: inView ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 mx-auto rounded-full"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                  I'm a passionate <span className="text-cyan-500 font-semibold">AI & Data Science enthusiast</span>{" "}
                  currently pursuing my B.Tech degree at Chandigarh Engineering College, Punjab. My journey in
                  technology is driven by curiosity and the desire to create meaningful solutions.
                </p>

                <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                  From developing intelligent web applications to exploring the depths of machine learning, I love
                  turning complex problems into elegant solutions. My expertise spans across
                  <span className="text-purple-500 font-semibold">
                    {" "}
                    web development, AI modeling, and data analysis
                  </span>
                  .
                </p>

                <p className="text-lg text-slate-600 dark:text-gray-300 leading-relaxed">
                  When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects,
                  or sharing knowledge through my <span className="text-pink-500 font-semibold">YouTube channel</span>{" "}
                  and social media.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                {["Problem Solver", "Tech Enthusiast", "Quick Learner", "Team Player", "Innovation Driven"].map(
                  (trait, index) => (
                    <motion.span
                      key={trait}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0.8 }}
                      transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                      className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 border border-cyan-400/30 rounded-full text-sm font-medium text-cyan-600 dark:text-cyan-300"
                    >
                      {trait}
                    </motion.span>
                  ),
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-white/80 to-slate-50/80 dark:from-slate-800/80 dark:to-slate-900/80 p-8 rounded-3xl border border-slate-200/50 dark:border-cyan-500/20 relative overflow-hidden backdrop-blur-sm">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/10 via-purple-400/10 to-pink-400/10 rounded-full -translate-y-20 translate-x-20"></div>

                <div className="relative z-10">
                  <div className="flex items-center space-x-3 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-cyan-500">Quick Facts</h3>
                  </div>

                  <div className="space-y-6">
                    {[
                      {
                        icon: <Target className="w-6 h-6" />,
                        label: "Focus",
                        value: "AI & Data Science",
                        color: "text-cyan-500",
                      },
                      {
                        icon: <Globe className="w-6 h-6" />,
                        label: "Location",
                        value: "Punjab, India",
                        color: "text-purple-500",
                      },
                      {
                        icon: <Star className="w-6 h-6" />,
                        label: "Experience",
                        value: "3+ Years Coding",
                        color: "text-pink-500",
                      },
                      {
                        icon: <Zap className="w-6 h-6" />,
                        label: "Passion",
                        value: "Innovation & Learning",
                        color: "text-orange-500",
                      },
                      {
                        icon: <Code2 className="w-6 h-6" />,
                        label: "Languages",
                        value: "Python, JavaScript, R",
                        color: "text-green-500",
                      },
                    ].map((fact, index) => (
                      <motion.div
                        key={fact.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
                        transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                        className="flex items-center space-x-4 p-3 rounded-xl bg-slate-100/50 dark:bg-slate-700/20 hover:bg-slate-200/50 dark:hover:bg-slate-700/30 transition-all duration-300"
                      >
                        <div className={`${fact.color}`}>{fact.icon}</div>
                        <div className="flex-1">
                          <span className="text-slate-500 dark:text-gray-400 text-sm font-medium">{fact.label}:</span>
                          <span className="text-slate-800 dark:text-white font-semibold ml-2">{fact.value}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function ProjectsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const projects = [
    {
      title: "Freelancing Tracker Dashboard",
      description:
        "A comprehensive dashboard for freelancers to track projects, clients, earnings, and manage their business efficiently with real-time analytics and insights.",
      link: "https://freelancingdashboard.vercel.app/",
      icon: <Briefcase className="w-7 h-7" />,
      gradient: "from-emerald-500 via-teal-500 to-cyan-500",
      tags: ["React", "Dashboard", "Analytics", "Business", "Real-time"],
      featured: true,
    },
    {
      title: "AI-Powered Financial Calculator",
      description:
        "Advanced financial planning tool with AI algorithms for investment predictions, loan calculations, and personalized financial advice with smart recommendations.",
      link: "https://cheemacalculator.vercel.app/",
      icon: <BarChart2 className="w-7 h-7" />,
      gradient: "from-blue-500 via-indigo-500 to-purple-500",
      tags: ["AI", "Finance", "Calculator", "Predictions", "Smart Analytics"],
    },
    {
      title: "Interactive Chess Platform",
      description:
        "Feature-rich chess game with AI opponent, multiplayer support, move analysis, strategic gameplay insights, and tournament management system.",
      link: "https://bestchessgame.vercel.app/",
      icon: <Target className="w-7 h-7" />,
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      tags: ["Game", "AI", "Strategy", "Multiplayer", "Tournament"],
    },
    {
      title: "Academic Notes Marketplace",
      description:
        "E-commerce platform for students to buy and sell high-quality printed notes with AI-powered content categorization and smart search functionality.",
      link: "https://printednotesforsale.netlify.app/",
      icon: <BookOpen className="w-7 h-7" />,
      gradient: "from-orange-500 via-red-500 to-pink-500",
      tags: ["E-commerce", "Education", "Marketplace", "Students", "AI Search"],
    },
  ]

  return (
    <section ref={ref} id="projects" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Featured Projects
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Innovative solutions that showcase my passion for technology and problem-solving. Each project represents
              a unique challenge and creative solution.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.2 }}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`group relative ${project.featured ? "lg:col-span-2" : ""}`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div
                  className={`relative bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-900/90 ${project.featured ? "p-10" : "p-8"} rounded-3xl border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 overflow-hidden backdrop-blur-sm`}
                >
                  <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-pink-400/5 rounded-full -translate-y-20 translate-x-20"></div>

                  {project.featured && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full text-xs font-bold text-white">
                      FEATURED
                    </div>
                  )}

                  <div className="relative z-10">
                    <div
                      className={`${project.featured ? "w-20 h-20" : "w-16 h-16"} bg-gradient-to-br ${project.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                    >
                      <div className="text-white">{project.icon}</div>
                    </div>

                    <h3
                      className={`${project.featured ? "text-3xl" : "text-2xl"} font-bold text-slate-800 dark:text-white mb-4 group-hover:text-cyan-500 transition-colors duration-300`}
                    >
                      {project.title}
                    </h3>

                    <p
                      className={`text-slate-600 dark:text-gray-400 mb-6 leading-relaxed ${project.featured ? "text-lg" : ""}`}
                    >
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-slate-200/50 dark:bg-slate-700/50 border border-slate-300/50 dark:border-slate-600/50 rounded-full text-xs font-medium text-slate-600 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <motion.a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ x: 8 }}
                      className="inline-flex items-center space-x-3 text-cyan-500 font-semibold hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors duration-300 group/link"
                    >
                      <span className={project.featured ? "text-lg" : ""}>Explore Project</span>
                      <ExternalLink
                        className={`${project.featured ? "w-5 h-5" : "w-4 h-4"} group-hover/link:rotate-45 transition-transform duration-300`}
                      />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function SkillsSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const skillCategories = [
    {
      title: "AI & Machine Learning",
      icon: <Brain className="w-7 h-7" />,
      gradient: "from-cyan-500 via-blue-500 to-indigo-500",
      skills: [
        { name: "Machine Learning", level: 88 },
        { name: "Deep Learning", level: 82 },
        { name: "Natural Language Processing", level: 78 },
        { name: "Computer Vision", level: 75 },
        { name: "Neural Networks", level: 80 },
      ],
    },
    {
      title: "Data Science & Analytics",
      icon: <BarChart2 className="w-7 h-7" />,
      gradient: "from-purple-500 via-pink-500 to-rose-500",
      skills: [
        { name: "Data Analysis", level: 92 },
        { name: "Data Visualization", level: 88 },
        { name: "Statistical Modeling", level: 85 },
        { name: "Big Data Processing", level: 78 },
        { name: "Predictive Analytics", level: 82 },
      ],
    },
    {
      title: "Development & Tools",
      icon: <Code className="w-7 h-7" />,
      gradient: "from-orange-500 via-red-500 to-pink-500",
      skills: [
        { name: "Python", level: 92 },
        { name: "JavaScript/React", level: 88 },
        { name: "Web Development", level: 87 },
        { name: "Database Management", level: 83 },
        { name: "Cloud Platforms", level: 75 },
      ],
    },
  ]

  return (
    <section ref={ref} id="skills" className="py-20 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Technical Expertise
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-slate-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed"
            >
              Constantly evolving skill set focused on cutting-edge technologies and innovative solutions
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
                transition={{ duration: 0.6, delay: 0.6 + categoryIndex * 0.2 }}
                className="bg-gradient-to-br from-white/90 to-slate-50/90 dark:from-slate-800/90 dark:to-slate-900/90 p-8 rounded-3xl border border-slate-200/50 dark:border-slate-700/50 hover:border-cyan-500/30 transition-all duration-500 relative overflow-hidden group backdrop-blur-sm"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-400/5 via-purple-400/5 to-pink-400/5 rounded-full -translate-y-16 translate-x-16"></div>

                <div className="relative z-10">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                  >
                    <div className="text-white">{category.icon}</div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">{category.title}</h3>

                  <div className="space-y-6">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -20 }}
                        transition={{ duration: 0.5, delay: 0.8 + categoryIndex * 0.2 + skillIndex * 0.1 }}
                      >
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-slate-600 dark:text-gray-300 font-medium">{skill.name}</span>
                          <span className="text-cyan-500 text-sm font-bold">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-slate-200/50 dark:bg-slate-700/50 rounded-full h-2 overflow-hidden">
                          <motion.div
                            className={`bg-gradient-to-r ${category.gradient} h-2 rounded-full relative`}
                            initial={{ width: 0 }}
                            animate={{ width: inView ? `${skill.level}%` : 0 }}
                            transition={{
                              duration: 1.5,
                              delay: 1 + categoryIndex * 0.2 + skillIndex * 0.1,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*                    CONNECT SECTION (with more spacing)             */
/* ------------------------------------------------------------------ */

function ConnectSection({ onContactClick }: { onContactClick: () => void }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  const socials = [
    {
      href: "https://www.instagram.com/deep__cheema__2007/",
      icon: <FaInstagram className="text-3xl" />,
      label: "Instagram",
      gradient: "from-pink-500 via-rose-500 to-red-500",
    },
    {
      href: "https://www.youtube.com/@DeepinderSingh-e5t",
      icon: <FaYoutube className="text-3xl" />,
      label: "YouTube",
      gradient: "from-red-500 via-red-600 to-red-700",
    },
    {
      href: "https://www.snapchat.com/add/cheema3364?share_id=DdXvNlvYl7A&locale=en-IN",
      icon: <FaSnapchat className="text-3xl" />,
      label: "Snapchat",
      gradient: "from-yellow-400 via-yellow-500 to-orange-500",
    },
    {
      href: "https://github.com/Singh08042007",
      icon: <FaGithub className="text-3xl" />,
      label: "GitHub",
      gradient: "from-gray-600 via-gray-700 to-gray-800",
    },
    {
      href: "https://www.linkedin.com/in/deepinder-singh-april2007/",
      icon: <FaLinkedin className="text-3xl" />,
      label: "LinkedIn",
      gradient: "from-blue-600 via-blue-700 to-indigo-700",
    },
  ]

  return (
    <section ref={ref} id="connect" className="py-20">
      <div className="container mx-auto px-4">
        {/* Heading with more bottom margin */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
          transition={{ duration: 0.8 }}
          className="text-4xl sm:text-6xl font-bold text-center mb-16"
        >
          <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Let&apos;s&nbsp;Connect
          </span>
        </motion.h2>

        {/* Social Icons with more spacing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {socials.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative"
              style={{ transitionDelay: `${0.1 * i}s` }}
            >
              <div
                className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white shadow-xl bg-gradient-to-br ${s.gradient}`}
              >
                {s.icon}
              </div>
              <span className="absolute inset-x-0 -bottom-7 text-center text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                {s.label}
              </span>
            </motion.a>
          ))}
        </motion.div>

        {/* Contact Button */}
        <motion.button
          onClick={onContactClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="mx-auto block px-12 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 shadow-lg"
        >
          <Mail className="inline-block w-5 h-5 mr-2" />
          Send&nbsp;Message
        </motion.button>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*                             FOOTER                                 */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-700">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm text-slate-600 dark:text-slate-400">
          © {new Date().getFullYear()} Deepinder&nbsp;Singh
        </span>
        <span className="text-sm text-slate-600 dark:text-slate-400">
          Crafted&nbsp;with&nbsp;passion&nbsp;&&nbsp;Next.js
        </span>
      </div>
    </footer>
  )
}
