"use client"
import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { ExternalLink, Github } from "lucide-react"
import ProjectModal from "./project-modal"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Project {
  id: string
  title: string
  description: string
  image: string
  tech: string[]
  liveUrl: string
  githubUrl: string
  category: string
}

interface ProjectGridProps {
  isHomePage?: boolean
}

export default function ProjectGrid({ isHomePage = false }: ProjectGridProps) {
  const [projects, setProjects] = useState<Project[]>([])
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load projects from cache or API
    const loadProjects = () => {
      const cachedProjects = localStorage.getItem("portfolio_projects")
      if (cachedProjects) {
        setProjects(JSON.parse(cachedProjects))
      } else {
        // Simulate API call with Unsplash images
        const mockProjects: Project[] = [
          {
            id: "1",
            title: "E-commerce Platform",
            description: "Modern e-commerce solution with React and Node.js",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
            tech: ["React", "Node.js", "MongoDB", "Stripe"],
            liveUrl: "https://github.com/akasaam",
            githubUrl: "https://github.com/akasaam",
            category: "Web Application",
          },
          {
            id: "2",
            title: "SaaS Dashboard",
            description: "Analytics dashboard with real-time data visualization",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
            tech: ["Next.js", "Tailwind", "PostgreSQL", "Chart.js"],
            liveUrl: "https://github.com/akasaam",
            githubUrl: "https://github.com/akasaam",
            category: "Dashboard",
          },
          {
            id: "3",
            title: "AI Content Generator",
            description: "AI-powered content creation tool",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
            tech: ["Vue.js", "Express", "OpenAI", "Redis"],
            liveUrl: "https://github.com/akasaam",
            githubUrl: "https://github.com/akasaam",
            category: "AI Application",
          },
          {
            id: "4",
            title: "Mobile App Backend",
            description: "RESTful API for mobile application",
            image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
            tech: ["Node.js", "Express", "JWT", "AWS"],
            liveUrl: "https://github.com/akasaam",
            githubUrl: "https://github.com/akasaam",
            category: "API",
          },
          {
            id: "5",
            title: "Real Estate Portal",
            description: "Property listing and management system",
            image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop",
            tech: ["React", "Laravel", "MySQL", "MapBox"],
            liveUrl: "https://github.com/akasaam",
            githubUrl: "https://github.com/akasaam",
            category: "Web Application",
          },
          {
            id: "6",
            title: "Cryptocurrency Tracker",
            description: "Real-time crypto price tracking application",
            image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
            tech: ["React", "WebSocket", "CoinGecko API", "Chart.js"],
            liveUrl: "https://github.com/akasaam",
            githubUrl: "https://github.com/akasaam",
            category: "Financial App",
          },
          {
            id: "7",
            title: "Social Media Platform",
            description: "Full-stack social networking application",
            image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
            tech: ["MERN Stack", "Socket.io", "Cloudinary", "JWT"],
            liveUrl: "https://github.com/akasaam",
            githubUrl: "https://github.com/akasaam",
            category: "Social Platform",
          },
          {
            id: "8",
            title: "Food Delivery App",
            description: "On-demand food delivery service platform",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop",
            tech: ["React Native", "Node.js", "MongoDB", "Stripe"],
            liveUrl: "https://github.com/akasaam",
            githubUrl: "https://github.com/akasaam",
            category: "Mobile App",
          },
        ]
        setProjects(mockProjects)
        localStorage.setItem("portfolio_projects", JSON.stringify(mockProjects))
      }
    }

    loadProjects()
  }, [])

  useEffect(() => {
    if (projects.length > 0 && gridRef.current) {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          gridRef.current?.children || [],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }, gridRef)

      return () => ctx.revert()
    }
  }, [projects])

  const displayedProjects = isHomePage ? projects.slice(0, 4) : projects.slice(0, visibleProjects)

  const loadMore = () => {
    setVisibleProjects((prev) => prev + 6)
  }

  const handleProjectHover = (projectId: string, isHovering: boolean) => {
    setHoveredProject(isHovering ? projectId : null)
  }

  return (
    <div>
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
        {!isHomePage && (
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 md:mb-12">
            portfolio
          </h2>
        )}

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {displayedProjects.map((project) => (
            <div
              key={project.id}
              className="aspect-video bg-gray-100 rounded-2xl md:rounded-3xl overflow-hidden relative group cursor-pointer"
              onMouseEnter={() => handleProjectHover(project.id, true)}
              onMouseLeave={() => handleProjectHover(project.id, false)}
              onClick={() => setSelectedProject(project)}
            >
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={600}
                height={400}
                className="object-cover w-full h-full transition-all duration-500 grayscale group-hover:grayscale-0 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              {hoveredProject === project.id && (
                <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center transition-all duration-300 animate-fadeIn">
                  <div className="text-center text-white p-4 md:p-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4 font-outfit text-sm md:text-base">{project.description}</p>
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 md:px-3 py-1 bg-white text-black text-xs md:text-sm rounded-full font-outfit hover:bg-gray-200 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3 md:gap-4 justify-center">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-white text-black px-3 md:px-4 py-2 rounded-lg hover:bg-gray-200 transition-all duration-300 font-outfit text-sm hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                        Live Demo
                      </a>
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gray-800 text-white px-3 md:px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 font-outfit text-sm hover:scale-105"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github className="h-3 w-3 md:h-4 md:w-4" />
                        GitHub
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Default Project Info */}
              <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 bg-white p-3 md:p-4 rounded-xl hover:scale-105 transition-transform duration-300">
                <h3 className="font-bold text-sm md:text-base">{project.title}</h3>
                <p className="text-xs md:text-sm text-gray-500 font-outfit">{project.category}</p>
              </div>
            </div>
          ))}
        </div>

        {!isHomePage && visibleProjects < projects.length && (
          <div className="text-center mt-8 md:mt-12">
            <button
              onClick={loadMore}
              className="bg-black text-white px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-gray-800 transition-all duration-300 font-outfit hover:scale-105 active:scale-95"
            >
              Load More Projects
            </button>
          </div>
        )}
      </section>

      {/* Project Modal */}
      {selectedProject && <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  )
}
