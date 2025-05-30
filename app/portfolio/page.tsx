import ProjectGrid from "@/components/project-grid"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      <section className="py-24 px-6 md:px-12">
        <h1 className="text-6xl md:text-8xl font-black mb-12">portfolio</h1>
        <p className="text-xl text-gray-600 mb-12 font-outfit">
          A collection of my latest web development projects, showcasing modern technologies and creative solutions.
        </p>
        <ProjectGrid />
      </section>
    </div>
  )
}
