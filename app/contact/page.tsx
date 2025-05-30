"use client"
import { useState, useEffect, useRef } from "react"
import type React from "react"
import { Send, Phone, Mail, Instagram, Github } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const contactInfoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
        },
      )

      // Contact info animation
      gsap.fromTo(
        contactInfoRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          delay: 0.3,
          ease: "power2.out",
        },
      )

      // Form animation
      gsap.fromTo(
        formRef.current?.children || [],
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          delay: 0.5,
          ease: "power2.out",
        },
      )
    }, containerRef)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Create WhatsApp message
    const message = `Hello! I'm ${formData.name}

Subject: ${formData.subject}

${formData.message}

Contact Details:
Email: ${formData.email}

Best regards,
${formData.name}`

    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message)

    // WhatsApp number (replace with your actual WhatsApp number)
    const whatsappNumber = "917501411769" // Your number without + and spaces

    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp
    window.open(whatsappURL, "_blank")

    // Reset form with animation
    gsap.to(formRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setFormData({ name: "", email: "", subject: "", message: "" })
      },
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    gsap.to(e.target, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
  }

  return (
    <div className="min-h-screen bg-white" ref={containerRef}>
      <section className="py-16 md:py-24 px-4 sm:px-6 md:px-12">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-8 md:mb-12"
        >
          contact
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Information */}
          <div ref={contactInfoRef}>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Let's work together</h2>
            <p className="text-gray-600 mb-6 md:mb-8 font-outfit text-sm md:text-base">
              I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just
              want to chat about technology, feel free to reach out via WhatsApp!
            </p>

            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base">Phone / WhatsApp</h3>
                  <p className="text-gray-600 font-outfit text-sm md:text-base">+91 7501411769</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Mail className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base">Email</h3>
                  <p className="text-gray-600 font-outfit text-sm md:text-base">akarajuhalder@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Instagram className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base">Instagram</h3>
                  <p className="text-gray-600 font-outfit text-sm md:text-base">@aka_director</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 p-3 rounded-lg transition-colors">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Github className="h-4 w-4 md:h-5 md:w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm md:text-base">GitHub</h3>
                  <p className="text-gray-600 font-outfit text-sm md:text-base">github.com/akasaam</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-sm font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-outfit transition-all duration-300"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-outfit transition-all duration-300"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-outfit transition-all duration-300"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-black font-outfit transition-all duration-300 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 font-outfit hover:scale-105 active:scale-95"
              >
                <Send className="h-4 w-4" />
                Send via WhatsApp
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
