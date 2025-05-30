"use client"
import { useState, useEffect, useRef } from "react"
import { gsap } from "gsap"
import { BackgroundLines } from "@/components/ui/background-lines"

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const loadingRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem("hasVisitedPortfolio")

    if (hasVisited) {
      setIsLoading(false)
      return
    }

    // Animate loading content
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current.querySelector(".logo-container"),
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, delay: 0.2 },
      )

      gsap.fromTo(
        contentRef.current.querySelector(".main-text"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 0.4 },
      )

      gsap.fromTo(
        contentRef.current.querySelector(".progress-container"),
        { width: 0, opacity: 0 },
        { width: "100%", opacity: 1, duration: 0.6, delay: 0.6 },
      )

      gsap.fromTo(
        contentRef.current.querySelector(".loading-dots"),
        { opacity: 0 },
        { opacity: 1, duration: 0.6, delay: 0.8 },
      )

      gsap.fromTo(
        contentRef.current.querySelector(".bottom-text"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, delay: 1 },
      )
    }

    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            if (loadingRef.current) {
              gsap.to(loadingRef.current, {
                opacity: 0,
                duration: 0.8,
                onComplete: () => {
                  setIsLoading(false)
                  localStorage.setItem("hasVisitedPortfolio", "true")
                },
              })
            }
          }, 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(progressInterval)
  }, [])

  useEffect(() => {
    // Update progress bar width
    if (progressBarRef.current) {
      gsap.to(progressBarRef.current, {
        width: `${progress}%`,
        duration: 0.3,
        ease: "power1.out",
      })
    }
  }, [progress])

  if (!isLoading) return null

  return (
    <div ref={loadingRef} className="fixed inset-0 z-50 bg-black">
      {/* Background Lines */}
      <BackgroundLines className="absolute inset-0 bg-black" svgOptions={{ duration: 8 }} />

      {/* Loading Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center h-full text-white px-4 sm:px-6"
      >
        {/* Logo/Brand */}
        <div className="logo-container flex items-center gap-2 md:gap-3 mb-8 md:mb-12">
          <div className="h-6 w-6 md:h-8 md:w-8 bg-white"></div>
          <div className="h-6 w-6 md:h-8 md:w-8 bg-white"></div>
          <span className="text-xl md:text-2xl font-black tracking-wider">RAJU HALDER</span>
        </div>

        {/* Main Loading Text */}
        <div className="main-text text-center mb-12 md:mb-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-3 md:mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Crafting Digital
            <br />
            Experiences
          </h1>
          <p className="text-gray-400 text-base md:text-lg font-outfit max-w-md mx-auto px-4">
            Loading portfolio of innovative web solutions and creative development
          </p>
        </div>

        {/* Progress Bar */}
        <div className="progress-container w-full max-w-sm md:max-w-md">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-outfit text-gray-400">Loading</span>
            <span className="text-sm font-outfit text-gray-400">{Math.round(progress)}%</span>
          </div>
          <div className="h-1 bg-gray-800 rounded-full overflow-hidden">
            <div
              ref={progressBarRef}
              className="h-full bg-gradient-to-r from-white to-gray-300 rounded-full"
              style={{ width: "0%" }}
            />
          </div>
        </div>

        {/* Loading Dots */}
        <div className="loading-dots flex gap-2 mt-6 md:mt-8">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full"
              style={{
                animation: `pulse 1.5s ease-in-out ${i * 0.2}s infinite alternate`,
              }}
            />
          ))}
        </div>

        {/* Bottom Text */}
        <div className="bottom-text absolute bottom-8 md:bottom-12 text-center px-4">
          <p className="text-gray-500 text-xs md:text-sm font-outfit">
            Web Developer • UI/UX Designer • Creative Technologist
          </p>
        </div>
      </div>
    </div>
  )
}
