"use client"
import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { X, ExternalLink, Github } from "lucide-react"
import Image from "next/image"

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

interface ProjectModalProps {
  project: Project
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modalRef.current && contentRef.current) {
      // Animate modal background
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })

      // Animate modal content
      gsap.fromTo(
        contentRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "power2.out", delay: 0.1 },
      )
    }

    return () => {
      gsap.killTweensOf(modalRef.current)
      gsap.killTweensOf(contentRef.current)
    }
  }, [])

  const handleClose = () => {
    if (modalRef.current && contentRef.current) {
      // Animate modal out
      gsap.to(contentRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      })

      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.3,
        delay: 0.1,
        ease: "power2.in",
        onComplete: onClose,
      })
    }
  }

  return (
    <div ref={modalRef} className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4">
      <div
        ref={contentRef}
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto scrollbar-hide"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-3xl font-bold">{project.title}</h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Project Image */}
          <div className="aspect-video rounded-2xl overflow-hidden mb-6">
            <Image
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              width={800}
              height={450}
              className="object-cover w-full h-full grayscale"
            />
          </div>

          {/* Project Details */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Project Overview</h3>
              <p className="text-gray-600 mb-6 font-outfit">
                {project.description}. This project showcases modern web development practices and demonstrates
                proficiency in full-stack development using cutting-edge technologies.
              </p>

              <h4 className="text-lg font-bold mb-3">Key Features</h4>
              <ul className="space-y-2 text-gray-600 font-outfit">
                <li>• Responsive and mobile-first design</li>
                <li>• Modern UI/UX with smooth animations</li>
                <li>• Optimized performance and SEO</li>
                <li>• Secure authentication and authorization</li>
                <li>• Real-time data updates</li>
                <li>• Cross-browser compatibility</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4">Technical Stack</h3>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((tech) => (
                  <span key={tech} className="px-3 py-2 bg-gray-100 text-black rounded-lg font-outfit">
                    {tech}
                  </span>
                ))}
              </div>

              <h4 className="text-lg font-bold mb-3">Project Links</h4>
              <div className="space-y-3">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-outfit"
                >
                  <ExternalLink className="h-5 w-5 text-black" />
                  <div>
                    <p className="font-medium">Live Demo</p>
                    <p className="text-sm text-gray-500 font-outfit">View the deployed application</p>
                  </div>
                </a>

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-outfit"
                >
                  <Github className="h-5 w-5 text-gray-700" />
                  <div>
                    <p className="font-medium">Source Code</p>
                    <p className="text-sm text-gray-500 font-outfit">Explore the codebase on GitHub</p>
                  </div>
                </a>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-bold mb-2">Development Timeline</h4>
                <p className="text-sm text-gray-600 font-outfit">
                  This project was completed in 4-6 weeks, including planning, development, testing, and deployment
                  phases.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
