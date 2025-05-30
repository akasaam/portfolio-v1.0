"use client"

import Image from "next/image"
import { Globe } from "lucide-react"
import ProjectGrid from "@/components/project-grid"
import { useState, useEffect, useRef } from "react"
import { X, ExternalLink, Github } from "lucide-react"
import { BackgroundLines } from "@/components/ui/background-lines"
import { SparklesCore } from "@/components/ui/sparkles-core"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ProjectItemProps {
  number: string
  title: string
  description: string
  location: string
  image: string
  techStack: string[]
  projectUrl: string
}

function ProjectItem({ number, title, description, location, image, techStack, projectUrl }: ProjectItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (itemRef.current) {
      gsap.fromTo(
        itemRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: itemRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    }
  }, [])

  const handleMouseEnter = () => {
    setIsHovered(true)
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1.02,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    if (itemRef.current) {
      gsap.to(itemRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }

  return (
    <>
      <div
        ref={itemRef}
        className="border-t border-gray-200 py-6 md:py-8 group relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col sm:flex-row sm:items-start gap-3 md:gap-4 flex-1">
            <span className="text-lg md:text-xl font-bold text-black shrink-0">{number}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold group-hover:text-black transition-colors leading-tight">
                {title}
              </h3>
              <p className="text-gray-500 font-outfit text-sm md:text-base mt-1">{description}</p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 md:gap-6 lg:gap-12">
            <span className="text-gray-500 font-outfit text-sm md:text-base order-2 sm:order-1">{location}</span>
            <button
              onClick={() => setShowModal(true)}
              className="bg-white border border-black rounded-full px-4 py-2 md:px-6 text-xs md:text-sm font-medium hover:bg-black hover:text-white transition-all duration-300 font-outfit order-1 sm:order-2 self-start sm:self-auto hover:scale-105"
            >
              View Case Study
            </button>
          </div>
        </div>

        {/* Hover Popup - Only show on larger screens */}
        {isHovered && (
          <div className="hidden lg:block absolute left-0 bottom-full mb-4 bg-white border border-gray-200 rounded-2xl p-6 shadow-2xl z-10 w-full max-w-md animate-fadeInUp">
            <div className="aspect-video rounded-lg overflow-hidden mb-4">
              <Image
                src={image || "/placeholder.svg"}
                alt={title}
                width={400}
                height={300}
                className="object-cover w-full h-full grayscale"
              />
            </div>
            <h4 className="font-bold mb-2">{title}</h4>
            <p className="text-sm text-gray-600 mb-3 font-outfit">{description}</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="px-2 py-1 bg-black text-white text-xs rounded-full font-outfit">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Full Screen Modal */}
      {showModal && (
        <ProjectCaseStudyModal
          title={title}
          description={description}
          image={image}
          techStack={techStack}
          projectUrl={projectUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}

interface ProjectCaseStudyModalProps {
  title: string
  description: string
  image: string
  techStack: string[]
  projectUrl: string
  onClose: () => void
}

function ProjectCaseStudyModal({
  title,
  description,
  image,
  techStack,
  projectUrl,
  onClose,
}: ProjectCaseStudyModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modalRef.current) {
      gsap.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
        },
      )
    }
  }, [])

  const handleClose = () => {
    if (modalRef.current) {
      gsap.to(modalRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: onClose,
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        ref={modalRef}
        className="bg-white rounded-2xl md:rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-y-auto mx-2 sm:mx-4"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 md:p-6 border-b">
          <h2 className="text-2xl md:text-4xl font-bold pr-4 leading-tight">{title}</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0 hover:scale-110"
          >
            <X className="h-6 w-6 md:h-8 md:w-8" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-8">
          {/* Large Project Image */}
          <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-6 md:mb-8">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={1200}
              height={675}
              className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Project Overview</h3>
              <p className="text-gray-600 mb-6 md:mb-8 font-outfit text-base md:text-lg leading-relaxed">
                {description}. This comprehensive project demonstrates advanced web development capabilities, showcasing
                modern architecture patterns, scalable solutions, and cutting-edge technologies to deliver exceptional
                user experiences.
              </p>

              <h4 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Key Features</h4>
              <ul className="space-y-2 md:space-y-3 text-gray-600 font-outfit text-sm md:text-base">
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                  Responsive and mobile-first design approach
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                  Modern UI/UX with smooth animations and transitions
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                  Optimized performance and SEO implementation
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                  Secure authentication and authorization system
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                  Real-time data updates and live synchronization
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-2 h-2 bg-black rounded-full mt-2 shrink-0"></span>
                  Cross-browser compatibility and accessibility
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Technical Implementation</h3>

              <h4 className="text-lg font-bold mb-3 md:mb-4">Technology Stack</h4>
              <div className="flex flex-wrap gap-2 md:gap-3 mb-6 md:mb-8">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 text-black rounded-lg font-outfit font-medium text-sm md:text-base hover:bg-black hover:text-white transition-colors cursor-pointer"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <h4 className="text-lg font-bold mb-3 md:mb-4">Project Links</h4>
              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border border-gray-200 rounded-lg md:rounded-xl hover:bg-gray-50 transition-all duration-300 font-outfit hover:scale-105"
                >
                  <ExternalLink className="h-5 w-5 md:h-6 md:w-6 text-black shrink-0" />
                  <div>
                    <p className="font-bold text-sm md:text-base">Live Demo</p>
                    <p className="text-xs md:text-sm text-gray-500">View the deployed application</p>
                  </div>
                </a>

                <a
                  href={projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 md:gap-4 p-3 md:p-4 border border-gray-200 rounded-lg md:rounded-xl hover:bg-gray-50 transition-all duration-300 font-outfit hover:scale-105"
                >
                  <Github className="h-5 w-5 md:h-6 md:w-6 text-gray-700 shrink-0" />
                  <div>
                    <p className="font-bold text-sm md:text-base">Source Code</p>
                    <p className="text-xs md:text-sm text-gray-500">Explore the codebase on GitHub</p>
                  </div>
                </a>
              </div>

              <div className="p-4 md:p-6 bg-gray-50 rounded-lg md:rounded-xl">
                <h4 className="font-bold mb-2 md:mb-3 text-sm md:text-base">Development Process</h4>
                <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-gray-600 font-outfit">
                  <p>
                    <strong>Planning:</strong> 1 week - Requirements analysis and architecture design
                  </p>
                  <p>
                    <strong>Development:</strong> 4-5 weeks - Implementation and testing
                  </p>
                  <p>
                    <strong>Deployment:</strong> 1 week - Production setup and optimization
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  const [visibleProjects, setVisibleProjects] = useState(4)
  const heroRef = useRef<HTMLElement>(null)
  const aboutRef = useRef<HTMLElement>(null)
  const projectsRef = useRef<HTMLElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  const allProjects = [
    {
      number: "01",
      title: "Digital Experience Platform",
      description: "Enterprise-grade CMS with headless architecture",
      location: "Silicon Valley, CA, Nov 2023",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop",
      techStack: ["React", "Node.js", "MongoDB", "AWS"],
      projectUrl: "https://github.com/akasaam",
    },
    {
      number: "02",
      title: "Interactive Data Visualization",
      description: "Real-time analytics dashboard for financial data",
      location: "New York, NY, Oct 2023",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      techStack: ["Next.js", "D3.js", "PostgreSQL", "Chart.js"],
      projectUrl: "https://github.com/akasaam",
    },
    {
      number: "03",
      title: "E-learning Platform",
      description: "Comprehensive learning management system",
      location: "London, UK, Sep 2023",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
      techStack: ["Vue.js", "Laravel", "MySQL", "Redis"],
      projectUrl: "https://github.com/akasaam",
    },
    {
      number: "04",
      title: "Progressive Web App",
      description: "Offline-first mobile experience",
      location: "Berlin, Germany, Aug 2023",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
      techStack: ["React", "PWA", "Service Workers", "IndexedDB"],
      projectUrl: "https://github.com/akasaam",
    },
    {
      number: "05",
      title: "Social Media Platform",
      description: "Full-stack social networking application",
      location: "San Francisco, CA, Jul 2023",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
      techStack: ["MERN Stack", "Socket.io", "Cloudinary", "JWT"],
      projectUrl: "https://github.com/akasaam",
    },
    {
      number: "06",
      title: "Cryptocurrency Tracker",
      description: "Real-time crypto price tracking application",
      location: "Miami, FL, Jun 2023",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop",
      techStack: ["React", "WebSocket", "CoinGecko API", "Chart.js"],
      projectUrl: "https://github.com/akasaam",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      gsap.fromTo(
        heroRef.current?.querySelector("h1"),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      )

      gsap.fromTo(
        heroRef.current?.querySelector("p"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power2.out",
        },
      )

      gsap.fromTo(
        heroRef.current?.querySelector(".hero-image"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.5,
          ease: "power2.out",
        },
      )

      // About section animations
      gsap.fromTo(
        aboutRef.current?.querySelector("h2"),
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Projects section animations
      gsap.fromTo(
        projectsRef.current?.querySelector("h2"),
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )

      // Footer animations
      gsap.fromTo(
        footerRef.current?.querySelector("h2"),
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  const loadMore = () => {
    setVisibleProjects((prev) => prev + 2)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="px-4 sm:px-6 md:px-12 py-8 sm:py-12 md:py-24 flex flex-col lg:flex-row gap-8 lg:gap-12"
      >
        <div className="flex-1 order-2 lg:order-1">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-none tracking-tight">
            code
            <br />
            poetry
          </h1>
          <p className="mt-4 md:mt-6 max-w-md text-gray-600 font-outfit text-sm md:text-base">
            Welcome to a digital journey that transcends code and design. Discover the artistry of development, captured
            in motion.
          </p>
          <div className="mt-6 md:mt-8 flex gap-2">
            <span className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-gray-300 flex items-center justify-center font-outfit text-sm md:text-base hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
              W
            </span>
            <span className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-gray-300 flex items-center justify-center font-outfit text-sm md:text-base hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
              E
            </span>
            <span className="h-8 w-8 md:h-10 md:w-10 rounded-full border border-gray-300 flex items-center justify-center font-outfit text-sm md:text-base hover:bg-black hover:text-white transition-all duration-300 cursor-pointer">
              B
            </span>
          </div>
          <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            <div className="hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold">+250k</div>
              <p className="text-xs md:text-sm text-gray-500 font-outfit">
                Lines of code creating a wide audience and game-changing innovations
              </p>
            </div>
            <div className="hover:scale-105 transition-transform duration-300 cursor-pointer">
              <div className="text-2xl md:text-3xl lg:text-4xl font-bold">+800k</div>
              <p className="text-xs md:text-sm text-gray-500 font-outfit">
                Hours invested, engaging storytelling that captivates viewers
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div className="hero-image bg-black rounded-2xl md:rounded-3xl overflow-hidden relative aspect-square w-full max-w-sm md:max-w-md lg:max-w-lg hover:scale-105 transition-transform duration-500">
            <Image
              src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&h=500&fit=crop&crop=center"
              alt="Developer with laptop"
              width={500}
              height={500}
              className="object-cover mix-blend-screen"
            />
            <div className="absolute bottom-4 md:bottom-6 right-4 md:right-6 bg-white text-black p-1.5 md:p-2 rounded-full hover:scale-110 transition-transform duration-300">
              <Globe className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            <div className="absolute bottom-16 md:bottom-24 left-0 -translate-x-1/2 bg-gray-100 p-2 md:p-3 rounded-full hover:scale-110 transition-transform duration-300">
              <div className="h-6 w-6 md:h-8 md:w-8 bg-black rounded-full"></div>
            </div>
            <div className="absolute top-8 md:top-12 right-0 translate-x-1/2 bg-gray-100 p-2 md:p-3 rounded-full hover:scale-110 transition-transform duration-300">
              <div className="h-6 w-6 md:h-8 md:w-8 bg-gray-800 rounded-full"></div>
            </div>
            <div className="absolute bottom-32 md:bottom-48 right-0 translate-x-1/2 bg-gray-100 p-2 md:p-3 rounded-full hover:scale-110 transition-transform duration-300">
              <div className="h-6 w-6 md:h-8 md:w-8 bg-gray-600 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        ref={aboutRef}
        className="bg-black text-white py-16 md:py-24 px-4 sm:px-6 md:px-12 relative overflow-hidden"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black">
          about<span className="text-gray-700">.</span>about<span className="text-gray-700">.</span>about
        </h2>
        <div className="mt-8 md:mt-12 lg:mt-24 flex flex-col lg:flex-row gap-8 md:gap-12">
          <div className="flex-1 relative">
            <div className="aspect-square bg-gray-900 rounded-2xl md:rounded-3xl overflow-hidden relative max-w-lg mx-auto lg:mx-0 hover:scale-105 transition-transform duration-500">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=center"
                alt="Developer working"
                width={600}
                height={600}
                className="object-cover mix-blend-luminosity"
              />
            </div>
            <div className="absolute -left-2 md:-left-4 -top-2 md:-top-4 h-6 w-6 md:h-8 md:w-8 border border-gray-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="absolute -right-2 md:-right-4 -top-2 md:-top-4 h-6 w-6 md:h-8 md:w-8 border border-gray-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="absolute -left-2 md:-left-4 -bottom-2 md:-bottom-4 h-6 w-6 md:h-8 md:w-8 border border-gray-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="absolute -right-2 md:-right-4 -bottom-2 md:-bottom-4 h-6 w-6 md:h-8 md:w-8 border border-gray-500 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Creative Developer</h3>
            <p className="text-gray-400 mb-4 md:mb-6 font-outfit text-sm md:text-base">
              With over 5 years of experience in web development, I specialize in creating immersive digital experiences
              that blend technical excellence with creative vision.
            </p>
            <p className="text-gray-400 mb-6 md:mb-8 font-outfit text-sm md:text-base">
              My approach combines clean code with innovative design thinking, resulting in websites and applications
              that not only function flawlessly but also engage and inspire users.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              <div className="hover:bg-gray-900 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                <h4 className="text-base md:text-lg font-bold mb-2">Frontend</h4>
                <p className="text-gray-400 font-outfit text-sm md:text-base">
                  React, Next.js, Vue, Tailwind CSS, GSAP
                </p>
              </div>
              <div className="hover:bg-gray-900 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                <h4 className="text-base md:text-lg font-bold mb-2">Backend</h4>
                <p className="text-gray-400 font-outfit text-sm md:text-base">Node.js, Express, MongoDB, PostgreSQL</p>
              </div>
              <div className="hover:bg-gray-900 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                <h4 className="text-base md:text-lg font-bold mb-2">Design</h4>
                <p className="text-gray-400 font-outfit text-sm md:text-base">Figma, Adobe XD, Photoshop</p>
              </div>
              <div className="hover:bg-gray-900 p-3 rounded-lg transition-all duration-300 cursor-pointer">
                <h4 className="text-base md:text-lg font-bold mb-2">Other</h4>
                <p className="text-gray-400 font-outfit text-sm md:text-base">AWS, Docker, CI/CD, Git</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Preview */}
      <ProjectGrid isHomePage={true} />

      {/* Projects Section */}
      <section ref={projectsRef} className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 md:mb-12">
          projects<span className="text-gray-300">.</span>projects
        </h2>

        {allProjects.slice(0, visibleProjects).map((project) => (
          <ProjectItem
            key={project.number}
            number={project.number}
            title={project.title}
            description={project.description}
            location={project.location}
            image={project.image}
            techStack={project.techStack}
            projectUrl={project.projectUrl}
          />
        ))}

        {visibleProjects < allProjects.length && (
          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={loadMore}
              className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-outfit text-sm md:text-base hover:scale-105 active:scale-95"
            >
              Load More Projects
            </button>
          </div>
        )}
      </section>

      {/* Footer */}
      <div ref={footerRef} className="relative bg-black">
        {/* Background Lines */}
        <BackgroundLines className="absolute inset-0 bg-black" />

        {/* Sparkles */}
        <SparklesCore
          id="tsparticles"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="absolute inset-0"
          particleColor="#FFFFFF"
          speed={1}
        />

        {/* Content */}
        <div className="relative z-20 text-white py-16 md:py-24 px-4 sm:px-6 md:px-12 min-h-[400px] md:min-h-[500px] flex flex-col items-center justify-center">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-white to-gray-400 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-black py-2 md:py-10 relative z-20 tracking-tight">
            Ready to Build, <br /> Something Amazing?
          </h2>

          <p className="max-w-xl mx-auto text-sm md:text-lg text-gray-400 text-center font-outfit mb-6 md:mb-8 px-4">
            Get the best advice from our experts, including expert developers, designers, and digital strategists,
            totally free.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center mb-8 md:mb-12 w-full max-w-md">
            <a
              href="/contact"
              className="bg-white text-black px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-gray-200 transition-all duration-300 font-outfit font-medium text-sm md:text-base text-center hover:scale-105"
            >
              Get In Touch
            </a>
            <a
              href="https://github.com/akasaam"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 font-outfit font-medium text-sm md:text-base text-center hover:scale-105"
            >
              View GitHub
            </a>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center w-full max-w-6xl border-t border-gray-800 pt-6 md:pt-8 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 md:h-6 md:w-6 bg-white hover:scale-110 transition-transform duration-300"></div>
              <div className="h-5 w-5 md:h-6 md:w-6 bg-white hover:scale-110 transition-transform duration-300"></div>
            </div>
            <div className="font-outfit text-xs md:text-sm text-gray-400 text-center md:text-right">
              <p>RAJU HALDER • Web Developer</p>
              <p>+91 7501411769 • akarajuhalder@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
