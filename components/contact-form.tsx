"use client"

import type React from "react"

import { useState, useRef, type FormEvent, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Send, Loader2, CheckCircle, AlertCircle, User, Mail, MessageSquare, FileText } from "lucide-react"
import emailjs from "@emailjs/browser"

interface ContactFormProps {
  isOpen: boolean
  onClose: () => void
  serviceId: string
}

export default function ContactForm({ isOpen, onClose, serviceId }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const formRef = useRef<HTMLFormElement>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  useEffect(() => {
    emailjs.init("-ugb9HcGrbefwn9hM")
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      await emailjs.sendForm(serviceId, "template_htdy72t", formRef.current!, "-ugb9HcGrbefwn9hM")
      setSubmitStatus("success")
      setFormData({ name: "", email: "", subject: "", message: "" })
      setTimeout(() => {
        onClose()
        setSubmitStatus("idle")
      }, 3000)
    } catch (error) {
      console.error("Error sending email:", error)
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-lg z-50 flex items-center justify-center p-3 sm:p-4"
          onClick={onClose}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-md overflow-hidden border border-white/20 dark:border-slate-700/50"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header with Gradient */}
            <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-3 sm:p-4 text-white">
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="relative flex justify-between items-center">
                <div>
                  <motion.h2
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-lg sm:text-xl font-bold mb-1"
                  >
                    Let's Connect
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-blue-100 text-xs sm:text-sm"
                  >
                    Send me a message and I'll respond soon.
                  </motion.p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
                >
                  <X className="h-4 w-4" />
                </motion.button>
              </div>
            </div>

            <div className="p-3 sm:p-4">
              {submitStatus === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 sm:py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl"
                  >
                    <CheckCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 sm:mb-3"
                  >
                    Message Sent!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-600 dark:text-slate-300 text-sm mb-4 sm:mb-6"
                  >
                    Thank you for reaching out. I'll get back to you within 24 hours.
                  </motion.p>
                  <motion.div
                    className="h-1 bg-gradient-to-r from-green-400 to-green-600 rounded-full mx-auto max-w-32 sm:max-w-40"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 3, ease: "easeInOut" }}
                  />
                </motion.div>
              ) : submitStatus === "error" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 sm:py-8"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-2xl"
                  >
                    <AlertCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-lg sm:text-xl font-bold text-slate-800 dark:text-slate-100 mb-2 sm:mb-3"
                  >
                    Something went wrong
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-slate-600 dark:text-slate-300 text-sm mb-4 sm:mb-6"
                  >
                    Please try again or contact me through social media.
                  </motion.p>
                  <motion.button
                    onClick={() => setSubmitStatus("idle")}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-5 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-xl"
                  >
                    Try Again
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="space-y-3 sm:space-y-4"
                >
                  {/* Name Field */}
                  <div className="space-y-1">
                    <label
                      htmlFor="name"
                      className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Name
                    </label>
                    <div className="relative group">
                      <motion.div
                        className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        animate={{ opacity: focusedField === "name" ? 0.3 : 0 }}
                      />
                      <div className="relative flex items-center">
                        <User className="absolute left-3 h-4 w-4 text-slate-400 z-10" />
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("name")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full pl-10 pr-3 py-2 sm:py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm relative"
                          placeholder="Your name"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Email
                    </label>
                    <div className="relative group">
                      <motion.div
                        className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        animate={{ opacity: focusedField === "email" ? 0.3 : 0 }}
                      />
                      <div className="relative flex items-center">
                        <Mail className="absolute left-3 h-4 w-4 text-slate-400 z-10" />
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("email")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full pl-10 pr-3 py-2 sm:py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm relative"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject Field */}
                  <div className="space-y-1">
                    <label
                      htmlFor="subject"
                      className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Subject
                    </label>
                    <div className="relative group">
                      <motion.div
                        className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        animate={{ opacity: focusedField === "subject" ? 0.3 : 0 }}
                      />
                      <div className="relative flex items-center">
                        <FileText className="absolute left-3 h-4 w-4 text-slate-400 z-10" />
                        <input
                          type="text"
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("subject")}
                          onBlur={() => setFocusedField(null)}
                          required
                          className="w-full pl-10 pr-3 py-2 sm:py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white bg-white/80 backdrop-blur-sm transition-all duration-300 text-sm relative"
                          placeholder="What's this about?"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-1">
                    <label
                      htmlFor="message"
                      className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300"
                    >
                      Message
                    </label>
                    <div className="relative group">
                      <motion.div
                        className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                        animate={{ opacity: focusedField === "message" ? 0.3 : 0 }}
                      />
                      <div className="relative">
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-slate-400 z-10" />
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          onFocus={() => setFocusedField("message")}
                          onBlur={() => setFocusedField(null)}
                          required
                          rows={3}
                          className="w-full pl-10 pr-3 py-2 sm:py-2.5 border border-slate-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-slate-800 dark:text-white bg-white/80 backdrop-blur-sm resize-none transition-all duration-300 text-sm relative"
                          placeholder="Your message here..."
                        />
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2.5 sm:py-3 px-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white rounded-lg font-semibold text-sm transition-all duration-300 flex items-center justify-center shadow-xl hover:shadow-2xl disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden"
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                        initial={{ x: "-100%" }}
                        animate={{ x: isSubmitting ? "100%" : "-100%" }}
                        transition={{ duration: 1, repeat: isSubmitting ? Number.POSITIVE_INFINITY : 0 }}
                      />
                      {isSubmitting ? (
                        <>
                          <Loader2 className="animate-spin mr-2 h-4 w-4" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
