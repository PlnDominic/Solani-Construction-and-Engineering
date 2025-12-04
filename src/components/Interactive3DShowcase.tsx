export default function Interactive3DShowcase() {
  const projects = [
    {
      id: 1,
      name: 'Residential Complex',
      description: 'Modern residential buildings with sustainable design',
      specs: '500+ Units | 25 Floors | LEED Certified',
      color: 'from-orange-500 to-amber-600',
    },
    {
      id: 2,
      name: 'Commercial Hub',
      description: 'State-of-the-art office and retail spaces',
      specs: '10,000 sqm | Mixed Use | Smart Building',
      color: 'from-blue-500 to-cyan-600',
    },
    {
      id: 3,
      name: 'Industrial Facility',
      description: 'Advanced manufacturing and logistics center',
      specs: '50,000 sqm | ISO Compliant | High-Tech',
      color: 'from-green-500 to-emerald-600',
    },
  ]

  return (
    <section className="bg-black py-24 text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">
            Project <span className="text-orange-500">Showcase</span>
          </h2>
          <p className="mt-4 text-lg text-gray-400">
            Explore our highlighted developments across key sectors.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-10 transition-opacity group-hover:opacity-20`} />
              <div className="relative z-10 space-y-4 p-6">
                <h3 className="text-2xl font-bold text-white">{project.name}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
                <p className="text-xs uppercase tracking-wider text-gray-500">{project.specs}</p>
                <div className="flex gap-2 pt-2">
                  <div className="flex-1 rounded border border-gray-800 bg-gray-900 p-2 text-center">
                    <p className="text-xs text-gray-500">Status</p>
                    <p className="text-sm font-semibold text-green-400">Active</p>
                  </div>
                  <div className="flex-1 rounded border border-gray-800 bg-gray-900 p-2 text-center">
                    <p className="text-xs text-gray-500">Quality</p>
                    <p className="text-sm font-semibold text-blue-400">Premium</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
