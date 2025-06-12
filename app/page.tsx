"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { ArrowRight, Download, Mail, MapPin, Linkedin, Github } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { MobileNav } from "@/components/mobile-nav"

export default function Home() {
  const [activeSection, setActiveSection] = useState("")
  const observer = useRef<IntersectionObserver | null>(null)
  const [countersStarted, setCountersStarted] = useState(false)
  const [counts, setCounts] = useState({
    nlpModels: 0,
    publications: 0,
    experience: 0,
    languages: 0,
  })

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Counter animation for stats
  useEffect(() => {
    if (countersStarted) {
      const interval = setInterval(() => {
        setCounts((prev) => {
          const newCounts = { ...prev }
          if (newCounts.nlpModels < 2) newCounts.nlpModels += 1
          if (newCounts.publications < 4) newCounts.publications += 1
          if (newCounts.experience < 5) newCounts.experience += 1
          if (newCounts.languages < 45) newCounts.languages += 5

          if (
            newCounts.nlpModels === 2 &&
            newCounts.publications === 4 &&
            newCounts.experience === 5 &&
            newCounts.languages === 45
          ) {
            clearInterval(interval)
          }

          return newCounts
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [countersStarted])

  // Intersection Observer for section detection
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    }

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)

          // Start counter animations when about section is visible
          if (entry.target.id === "about" && !countersStarted) {
            setCountersStarted(true)
          }
        }
      })
    }, options)

    const sections = document.querySelectorAll("section[id]")
    sections.forEach((section) => {
      observer.current?.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.current?.unobserve(section)
      })
    }
  }, [countersStarted])

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="font-bold text-xl">
            Ananto<span className="text-blue-600">.</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className={`text-sm font-medium transition-colors ${activeSection === "about" ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              About
            </Link>
            <Link
              href="#experience"
              className={`text-sm font-medium transition-colors ${activeSection === "experience" ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              Experience
            </Link>
            <Link
              href="#projects"
              className={`text-sm font-medium transition-colors ${activeSection === "projects" ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              Projects
            </Link>
            <Link
              href="#publications"
              className={`text-sm font-medium transition-colors ${activeSection === "publications" ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              Publications
            </Link>
            <Link
              href="#education"
              className={`text-sm font-medium transition-colors ${activeSection === "education" ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              Education
            </Link>
            <Link
              href="#contact"
              className={`text-sm font-medium transition-colors ${activeSection === "contact" ? "text-blue-600" : "hover:text-blue-600"}`}
            >
              Contact
            </Link>
          </nav>
            <a
            href="https://drive.google.com/file/d/1vReu3p2IU-53H7xmX9VUNR3C_Pw6Fqdr/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex"
            >
            <Button variant="outline">
              Download CV
              <Download className="ml-2 h-4 w-4" />
            </Button>
            </a>
          <MobileNav />
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20 md:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <motion.div
                className="flex flex-col justify-center space-y-4"
                initial="hidden"
                animate="visible"
                variants={fadeIn}
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Ananto Joyoadikusumo
                  </h1>
                  <p className="text-xl text-blue-600 font-semibold">District Manager – Artificial Intelligence</p>
                  <div className="flex items-center gap-2 text-gray-500 mt-2">
                    <MapPin className="h-4 w-4" />
                    <span>Tangerang, Banten, Indonesia</span>
                  </div>
                </div>
                <motion.div
                  className="flex flex-col gap-3 min-[400px]:flex-row"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={cardVariants}>
                    <Badge variant="outline" className="justify-start gap-1 rounded-md px-3 py-1">
                      🎓 3.98 GPA in CS from BINUS
                    </Badge>
                  </motion.div>
                  <motion.div variants={cardVariants}>
                    <Badge variant="outline" className="justify-start gap-1 rounded-md px-3 py-1">
                      🧠 5+ years AI/ML experience
                    </Badge>
                  </motion.div>
                  <motion.div variants={cardVariants}>
                    <Badge variant="outline" className="justify-start gap-1 rounded-md px-3 py-1">
                      🌍 Projects spanning Indonesia & Australia
                    </Badge>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="flex flex-col gap-2 min-[400px]:flex-row"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.4 }}
                >
                  <motion.div variants={cardVariants}>
                    <a
                      href="https://github.com/anantoj"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                        <Button className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          role="img"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="h-4 w-4"
                        >
                          <title>GitHub</title>
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.729.083-.729 1.205.085 1.84 1.237 1.84 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.047.138 3.003.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.803 5.625-5.475 5.92.43.37.813 1.096.813 2.21 0 1.595-.015 2.88-.015 3.27 0 .32.216.694.825.576C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        View GitHub
                        <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </a>
                  </motion.div>
                  <motion.div variants={cardVariants}>
                    <a
                      href="https://drive.google.com/file/d/1vReu3p2IU-53H7xmX9VUNR3C_Pw6Fqdr/view?usp=sharing"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline">
                      Download CV
                      <Download className="ml-2 h-4 w-4" />
                      </Button>
                    </a>
                  </motion.div>
                  <motion.div variants={cardVariants}>
                    <Button variant="outline">
                      Contact Me
                      <Mail className="ml-2 h-4 w-4" />
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              <motion.div
                className="flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  alt="Ananto Joyoadikusumo"
                  className="aspect-square overflow-hidden rounded-full object-cover object-center border-4 border-white shadow-xl"
                  height="400"
                  src="/IMG_3758.jpeg?height=400&width=400"
                  width="400"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">About Me</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Transforming Ideas into Intelligent Solutions through Artificial Intelligence
                </p>
              </div>
              <div className="mx-auto max-w-3xl space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  I'm Ananto Joyoadikusumo, currently serving as District Manager - Artificial Intelligence at PT Berca
                  Hardayaperkasa. My work bridges research and applied AI—spanning from NLP models like NusaBERT to
                  multimodal deep learning systems. With a strong academic foundation and industry experience across
                  Indonesia and Australia, I bring a unique blend of innovation, leadership, and real-world execution in
                  AI.
                </p>
                <motion.div
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4"
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <motion.div variants={cardVariants}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <p className="text-2xl font-bold">{counts.nlpModels}x</p>
                        <p className="text-sm text-gray-500">Published NLP models for Indonesian languages</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={cardVariants}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <p className="text-2xl font-bold">{counts.publications}x</p>
                        <p className="text-sm text-gray-500">Peer-reviewed publications in AI</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={cardVariants}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <p className="text-2xl font-bold">{counts.experience}+</p>
                        <p className="text-sm text-gray-500">Years of AI/ML experience</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div variants={cardVariants}>
                    <Card className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <p className="text-2xl font-bold">{counts.languages}+</p>
                        <p className="text-sm text-gray-500">Regional languages supported in models</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Experience</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My professional journey in AI and software engineering
                </p>
              </div>

              {/* Timeline */}
              <div className="mx-auto max-w-4xl w-full mt-12">
                <div className="relative">
                  {/* Timeline Line */}
                  <motion.div
                    className="absolute left-0 md:left-1/2 h-full w-0.5 bg-blue-200 transform md:-translate-x-1/2"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                  />

                  {/* Timeline Items */}
                  <div className="space-y-12">
                    {/* Berca - District Manager */}
                    <div className="relative">
                      <motion.div
                        className="flex flex-col md:flex-row items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-blue-600 border-4 border-white transform md:-translate-x-1/2 z-10" />

                        {/* Content - Right Side on Desktop */}
                        <div className="md:w-1/2 md:pl-12 pl-10 md:ml-auto">
                          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Card className="relative overflow-hidden transition-shadow hover:shadow-lg">
                              <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-xl font-bold">District Manager - Artificial Intelligence</h4>
                                    <p className="text-blue-600 font-medium">PT Berca Hardayaperkasa</p>
                                  </div>
                                  <Badge>Current</Badge>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Nov 2024 – Present</p>
                                <p className="mt-4 text-gray-700">
                                  Led AI product development and division growth; spearheaded chatbot and RAG-based
                                  solutions for enterprise clients.
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Berca - Senior AI Engineer */}
                    <div className="relative">
                      <motion.div
                        className="flex flex-col md:flex-row items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-blue-500 border-4 border-white transform md:-translate-x-1/2 z-10" />

                        {/* Content - Left Side on Desktop */}
                        <div className="md:w-1/2 md:pr-12 pl-10 md:pl-0">
                          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Card className="relative overflow-hidden transition-shadow hover:shadow-lg">
                              <div className="absolute top-0 right-0 w-1 h-full bg-blue-500" />
                              <CardContent className="p-6">
                                <div>
                                  <h4 className="text-xl font-bold">Senior AI Engineer</h4>
                                  <p className="text-blue-600 font-medium">PT Berca Hardayaperkasa</p>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Apr 2024 – Nov 2024</p>
                                <p className="mt-4 text-gray-700">
                                  Contributed to GenAI app development, document intelligence, and knowledge assistant
                                  systems.
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Lazarus NLP */}
                    <div className="relative">
                      <motion.div
                        className="flex flex-col md:flex-row items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-purple-500 border-4 border-white transform md:-translate-x-1/2 z-10" />

                        {/* Content - Right Side on Desktop */}
                        <div className="md:w-1/2 md:pl-12 pl-10 md:ml-auto">
                          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Card className="relative overflow-hidden transition-shadow hover:shadow-lg">
                              <div className="absolute top-0 left-0 w-1 h-full bg-purple-500" />
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-xl font-bold">Independent Researcher</h4>
                                    <p className="text-purple-600 font-medium">Lazarus NLP</p>
                                  </div>
                                  <Badge variant="outline">Ongoing</Badge>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Nov 2022 – Present</p>
                                <p className="mt-4 text-gray-700">
                                  Key contributor to NusaBERT, IndoT5, and multilingual NER for low-resource Indonesian
                                  languages.
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Bookbot */}
                    <div className="relative">
                      <motion.div
                        className="flex flex-col md:flex-row items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-green-500 border-4 border-white transform md:-translate-x-1/2 z-10" />

                        {/* Content - Left Side on Desktop */}
                        <div className="md:w-1/2 md:pr-12 pl-10 md:pl-0">
                          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Card className="relative overflow-hidden transition-shadow hover:shadow-lg">
                              <div className="absolute top-0 right-0 w-1 h-full bg-green-500" />
                              <CardContent className="p-6">
                                <div>
                                  <h4 className="text-xl font-bold">Machine Learning Engineer</h4>
                                  <p className="text-green-600 font-medium">Bookbot (Australia)</p>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Feb 2022 – Aug 2023</p>
                                <p className="mt-4 text-gray-700">
                                  Worked on voice synthesis, reading assistant tools for children with learning
                                  disabilities.
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Harnis International */}
                    <div className="relative">
                      <motion.div
                        className="flex flex-col md:flex-row items-center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                      >
                        {/* Timeline Node */}
                        <div className="absolute left-0 md:left-1/2 w-6 h-6 rounded-full bg-amber-500 border-4 border-white transform md:-translate-x-1/2 z-10" />

                        {/* Content - Right Side on Desktop */}
                        <div className="md:w-1/2 md:pl-12 pl-10 md:ml-auto">
                          <motion.div whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                            <Card className="relative overflow-hidden transition-shadow hover:shadow-lg">
                              <div className="absolute top-0 left-0 w-1 h-full bg-amber-500" />
                              <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <h4 className="text-xl font-bold">Software Engineer</h4>
                                    <p className="text-amber-600 font-medium">Harnis International</p>
                                  </div>
                                  <Badge variant="outline">Ongoing</Badge>
                                </div>
                                <p className="text-sm text-gray-500 mt-1">Dec 2021 – Present</p>
                                <p className="mt-4 text-gray-700">
                                  Built internal platforms, optimized backend systems.
                                </p>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Timeline End */}
                    <motion.div
                      className="absolute left-0 md:left-1/2 bottom-0 w-6 h-6 rounded-full bg-gray-200 border-4 border-white transform md:-translate-x-1/2 translate-y-3"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Innovative AI solutions I've developed
                </p>
              </div>
              <motion.div
                className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 md:gap-12"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden h-full transition-all hover:shadow-xl">
                    <div className="h-60 bg-blue-100 flex items-center justify-center overflow-hidden">
                      <motion.div
                        className="text-6xl"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1, rotate: [0, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        🔹
                      </motion.div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">NusaBERT-NER</h3>
                      <p className="mt-2 text-gray-700">
                        NER model tailored for Indonesian with vocabulary expansion and cultural context.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">NLP</Badge>
                        <Badge variant="secondary">BERT</Badge>
                        <Badge variant="secondary">Named Entity Recognition</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden h-full transition-all hover:shadow-xl">
                    <div className="h-60 bg-green-100 flex items-center justify-center overflow-hidden">
                      <motion.div
                        className="text-6xl"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1, rotate: [0, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        🔹
                      </motion.div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Indo-T5: Multilingual Translation</h3>
                      <p className="mt-2 text-gray-700">
                        Translation model for 45+ regional languages in Indonesia. Published in IEEE Access.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">T5</Badge>
                        <Badge variant="secondary">Translation</Badge>
                        <Badge variant="secondary">Multilingual</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden h-full transition-all hover:shadow-xl">
                    <div className="h-60 bg-purple-100 flex items-center justify-center overflow-hidden">
                      <motion.div
                        className="text-6xl"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1, rotate: [0, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        🔹
                      </motion.div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">AIDA – RAG-Based Enterprise Chatbot</h3>
                      <p className="mt-2 text-gray-700">
                        Internal knowledge assistant app using LangChain, OpenAI, and document embeddings.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">RAG</Badge>
                        <Badge variant="secondary">LangChain</Badge>
                        <Badge variant="secondary">OpenAI</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="overflow-hidden h-full transition-all hover:shadow-xl">
                    <div className="h-60 bg-yellow-100 flex items-center justify-center overflow-hidden">
                      <motion.div
                        className="text-6xl"
                        initial={{ scale: 0.8 }}
                        whileInView={{ scale: 1, rotate: [0, 10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        🔹
                      </motion.div>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Voice Cloning & Image Gen App</h3>
                      <p className="mt-2 text-gray-700">
                        End-to-end app combining TTS and generative visuals for conversational interfaces.
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <Badge variant="secondary">TTS</Badge>
                        <Badge variant="secondary">Image Generation</Badge>
                        <Badge variant="secondary">Multimodal</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Publications Section */}
        <section id="publications" className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Publications</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My research contributions to the field of AI
                </p>
              </div>
              <motion.div
                className="mx-auto grid max-w-4xl gap-6"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">
                        NusaBERT: Teaching IndoBERT to be Multilingual and Multicultural
                      </h3>
                      <p className="text-sm text-gray-500">arXiv, 2024</p>
                      <p className="mt-2 text-gray-700">
                        A novel approach to adapting BERT models for the linguistic diversity of Indonesia.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">
                        Many-to-Many Multilingual Translation for Indonesian Languages
                      </h3>
                      <p className="text-sm text-gray-500">IEEE Access, 2023</p>
                      <p className="mt-2 text-gray-700">
                        A comprehensive translation system for Indonesia's diverse language landscape.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Vision-Based Deep Q-Learning with Neurogenesis</h3>
                      <p className="text-sm text-gray-500">BICS 2023</p>
                      <p className="mt-2 text-gray-700">
                        Novel reinforcement learning approach inspired by biological neurogenesis.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="transition-shadow hover:shadow-md">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Transfer Learning in COVID-19 Diagnosis</h3>
                      <p className="text-sm text-gray-500">Elsevier, 2023</p>
                      <p className="mt-2 text-gray-700">
                        Application of transfer learning techniques to improve COVID-19 diagnosis from medical imaging.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  className="flex justify-center"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button variant="outline">
                    View Full Publication List
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Education</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  My academic background and qualifications
                </p>
              </div>
              <motion.div
                className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <motion.div
                        className="flex items-center justify-center mb-4"
                        initial={{ rotateY: 0 }}
                        whileInView={{ rotateY: 360 }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                      >
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-2xl">🎓</span>
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-bold">BINUS University</h3>
                      <p className="text-gray-500">Bachelor of Computer Science (2019 – 2023)</p>
                      <p className="mt-2 font-semibold">GPA: 3.98 / 4.00</p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <motion.div
                        className="flex items-center justify-center mb-4"
                        initial={{ rotateY: 0 }}
                        whileInView={{ rotateY: 360 }}
                        transition={{ duration: 1.5, delay: 0.4 }}
                      >
                        <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-2xl">🎓</span>
                        </div>
                      </motion.div>
                      <h3 className="text-xl font-bold">University of Nottingham Malaysia</h3>
                      <p className="text-gray-500">Study Abroad Program – Computer Science (2022 – 2023)</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Certifications Section */}
        <section className="py-16 md:py-24 bg-gray-50">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Certifications</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Professional certifications and training
                </p>
              </div>
              <motion.div
                className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">NVIDIA DLI: Fundamentals of Deep Learning</h3>
                      <p className="mt-2 text-gray-700">
                        Comprehensive training in deep learning fundamentals and practical applications.
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold">Coursera: Bits and Bytes of Computer Networking</h3>
                      <p className="mt-2 text-gray-700">Advanced networking concepts and implementation strategies.</p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24">
          <div className="container px-4 md:px-6">
            <motion.div
              className="flex flex-col items-center justify-center space-y-4 text-center"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Contact</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get in touch with me
                </p>
              </div>
              <motion.div
                className="mx-auto grid max-w-4xl gap-6 lg:grid-cols-2"
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <motion.div variants={cardVariants}>
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        <motion.div
                          className="flex items-center gap-4 justify-start text-left"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <MapPin className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">Location</h3>
                            <p className="text-sm text-gray-500">Tangerang, Banten, Indonesia</p>
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-4 justify-start text-left"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Mail className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">Email</h3>
                            <p className="text-sm text-gray-500">ananto.joyoadikusumo@gmail.com</p>
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-4 justify-start text-left"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Linkedin className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">LinkedIn</h3>
                            <a
                              href="https://www.linkedin.com/in/anantoj"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              linkedin.com/in/anantoj
                            </a>
                          </div>
                        </motion.div>
                        <motion.div
                          className="flex items-center gap-4 justify-start text-left"
                          whileHover={{ x: 5 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          <Github className="h-5 w-5 text-gray-500" />
                          <div>
                            <h3 className="font-medium">GitHub</h3>
                            <a href="#" className="text-sm text-blue-600 hover:underline">
                              github.com/anantoj
                            </a>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
                <motion.div variants={cardVariants}>
                  <Card className="h-full transition-shadow hover:shadow-lg">
                    <CardContent className="p-6">
                      <form className="grid gap-4">
                        <div className="grid gap-2">
                          <label
                            htmlFor="name"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Name
                          </label>
                          <input
                            id="name"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your name"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="email"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Email
                          </label>
                          <input
                            id="email"
                            type="email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your email"
                          />
                        </div>
                        <div className="grid gap-2">
                          <label
                            htmlFor="message"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Message
                          </label>
                          <textarea
                            id="message"
                            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Your message"
                          />
                        </div>
                        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                          <Button className="w-full bg-blue-600 hover:bg-blue-700">Send Message</Button>
                        </motion.div>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-50">
        <div className="container flex flex-col gap-4 py-10 md:flex-row md:items-center md:justify-between md:py-12">
          <div className="flex flex-col gap-2">
            <Link href="/" className="font-bold text-xl">
              Ananto<span className="text-blue-600">.</span>
            </Link>
            <p className="text-sm text-gray-500">District Manager – Artificial Intelligence</p>
          </div>
          <div className="flex gap-4">
            <motion.div whileHover={{ y: -3 }}>
              <Link href="#" className="text-gray-500 hover:text-blue-600">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }}>
              <Link href="#" className="text-gray-500 hover:text-blue-600">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ y: -3 }}>
              <Link href="#" className="text-gray-500 hover:text-blue-600">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </motion.div>
          </div>
          <p className="text-sm text-gray-500">© 2025 Ananto Joyoadikusumo. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
