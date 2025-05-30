"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [currentTime, setCurrentTime] = useState("")
  const [location, setLocation] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    // Get location and set up real-time clock
    const updateDateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "short",
        year: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      })
      setCurrentTime(timeString)
    }

    // Get user location
    const getLocation = async () => {
      try {
        const cached = localStorage.getItem("userLocation")
        if (cached) {
          setLocation(cached)
        } else {
          const response = await fetch("https://ipapi.co/json/")
          const data = await response.json()
          const locationString = `${data.city}, ${data.country_code}`
          setLocation(locationString)
          localStorage.setItem("userLocation", locationString)
        }
      } catch (error) {
        setLocation("Global")
      }
    }

    updateDateTime()
    getLocation()
    const interval = setInterval(updateDateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6 relative">
      <div className="flex items-center gap-2">
        <div className="h-5 w-5 md:h-6 md:w-6 bg-black"></div>
        <div className="h-5 w-5 md:h-6 md:w-6 bg-black"></div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:block">
        <ul className="flex items-center gap-6 lg:gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`font-medium transition-colors text-sm lg:text-base ${
                  pathname === item.href ? "text-black" : "text-gray-500 hover:text-black"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Right Side - Desktop */}
      <div className="hidden md:flex items-center gap-2">
        <span className="text-xs lg:text-sm text-gray-500 font-outfit">
          {location && `${location}, `}
          {currentTime}
        </span>
        <div className="h-6 w-6 lg:h-8 lg:w-8 rounded-full bg-black flex items-center justify-center overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
            alt="Raju Halder"
            width={32}
            height={32}
            className="object-cover"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
          <nav className="px-4 py-4">
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`block font-medium transition-colors py-2 ${
                      pathname === item.href ? "text-black" : "text-gray-500 hover:text-black"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-black flex items-center justify-center overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
                  alt="Raju Halder"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium">Raju Halder</p>
                <p className="text-xs text-gray-500 font-outfit">
                  {location && `${location}, `}
                  {currentTime}
                </p>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
