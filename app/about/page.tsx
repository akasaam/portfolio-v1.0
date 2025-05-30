import Image from "next/image"

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* About Section */}
      <section className="bg-black text-white py-24 px-6 md:px-12 relative">
        <h2 className="text-6xl md:text-8xl font-black">
          about<span className="text-gray-700">.</span>about<span className="text-gray-700">.</span>about
        </h2>
        <div className="mt-12 md:mt-24 flex flex-col md:flex-row gap-12">
          <div className="flex-1 relative">
            <div className="aspect-square bg-gray-900 rounded-3xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop&crop=center"
                alt="Raju Halder working"
                width={600}
                height={600}
                className="object-cover mix-blend-luminosity"
              />
            </div>
            <div className="absolute -left-4 -top-4 h-8 w-8 border border-gray-500 rounded-full flex items-center justify-center">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="absolute -right-4 -top-4 h-8 w-8 border border-gray-500 rounded-full flex items-center justify-center">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="absolute -left-4 -bottom-4 h-8 w-8 border border-gray-500 rounded-full flex items-center justify-center">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
            <div className="absolute -right-4 -bottom-4 h-8 w-8 border border-gray-500 rounded-full flex items-center justify-center">
              <div className="h-1 w-1 bg-gray-500 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold mb-6">Creative Developer</h3>
            <p className="text-gray-400 mb-6 font-outfit">
              Hi, I'm Raju Halder, a passionate web developer with over 5 years of experience in creating immersive
              digital experiences that blend technical excellence with creative vision.
            </p>
            <p className="text-gray-400 mb-6 font-outfit">
              My approach combines clean code with innovative design thinking, resulting in websites and applications
              that not only function flawlessly but also engage and inspire users.
            </p>
            <p className="text-gray-400 mb-6 font-outfit">
              When I'm not coding, you can find me exploring new technologies, creating content on Instagram as
              @aka_director, or contributing to open-source projects on GitHub.
            </p>
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div>
                <h4 className="text-lg font-bold mb-2">Frontend</h4>
                <p className="text-gray-400 font-outfit">React, Next.js, Vue, Tailwind CSS, GSAP</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Backend</h4>
                <p className="text-gray-400 font-outfit">Node.js, Express, MongoDB, PostgreSQL</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Design</h4>
                <p className="text-gray-400 font-outfit">Figma, Adobe XD, Photoshop</p>
              </div>
              <div>
                <h4 className="text-lg font-bold mb-2">Other</h4>
                <p className="text-gray-400 font-outfit">AWS, Docker, CI/CD, Git</p>
              </div>
            </div>
            <div className="mt-12 p-6 bg-gray-900 rounded-2xl">
              <h4 className="text-lg font-bold mb-4">Contact Information</h4>
              <div className="space-y-2 font-outfit">
                <p className="text-gray-400">📱 +91 7501411769</p>
                <p className="text-gray-400">✉️ akarajuhalder@gmail.com</p>
                <p className="text-gray-400">📸 @aka_director</p>
                <p className="text-gray-400">🐙 github.com/akasaam</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
