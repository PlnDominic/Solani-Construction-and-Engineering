export default function EnhancedBuildingScene() {
  const features = [
    {
      icon: '🏗️',
      title: 'Multi-Level',
      desc: '8 stories with adaptive design',
    },
    {
      icon: '💡',
      title: 'Smart Lighting',
      desc: 'AI-powered light management',
    },
    {
      icon: '🔒',
      title: 'Advanced Security',
      desc: 'Full security integration',
    },
  ]

  return (
    <section className="py-24 bg-gradient-to-b from-black via-gray-950 to-black text-white">
      <div className="mx-auto max-w-5xl space-y-12 px-4 text-center">
        <div>
          <h2 className="text-4xl font-bold md:text-5xl">
            Structural <span className="text-orange-500">Design</span>
          </h2>
          <p className="mt-4 text-gray-400">
            Innovative 8-story building with advanced features and premium finishing.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-lg border border-gray-800 bg-gray-900/60 p-6 text-left"
            >
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
