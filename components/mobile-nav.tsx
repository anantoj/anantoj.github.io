"use client"

import { useState } from "react"
import Link from "next/link"
import { X, Menu, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05,
        staggerDirection: 1,
      },
    },
  }

  const itemVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  }

  return (
    <div className="md:hidden">
      <Button variant="outline" size="icon" onClick={toggleMenu}>
        <span className="sr-only">Toggle menu</span>
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="h-6 w-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="h-6 w-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 top-16 z-50 bg-white p-4"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >
            <nav className="flex flex-col space-y-4">
              <motion.div variants={itemVariants}>
                <Link
                  href="#about"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  About
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="#experience"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Experience
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="#projects"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Projects
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="#publications"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Publications
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="#education"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Education
                </Link>
              </motion.div>
              <motion.div variants={itemVariants}>
                <Link
                  href="#contact"
                  className="text-lg font-medium hover:text-blue-600 transition-colors"
                  onClick={toggleMenu}
                >
                  Contact
                </Link>
              </motion.div>
              <motion.div variants={itemVariants} className="mt-4">
                <Button className="w-full">
                  Download CV
                  <Download className="ml-2 h-4 w-4" />
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
