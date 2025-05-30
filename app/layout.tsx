import type React from "react"
import "./globals.css"
import { Inter, Outfit } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import LoadingScreen from "@/components/loading-screen"

const inter = Inter({ subsets: ["latin"] })
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
})

export const metadata = {
  title: "RAJU HALDER - Web Developer Portfolio",
  description: "Creative Web Developer specializing in modern web applications and digital experiences",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${outfit.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <LoadingScreen />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
