export default function Interactive3DBuilding() {
  return (
    <section className="bg-black py-20 text-white">
      <div className="mx-auto max-w-5xl space-y-8 px-4 text-center">
        <h2 className="text-4xl font-bold md:text-5xl">
          Architectural <span className="text-orange-500">Visualization</span>
        </h2>
        <p className="text-gray-400">
          Explore our architectural concepts through detailed renders and plans.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              title: 'Design Philosophy',
              description: 'Modern, efficient structures designed for longevity and sustainability.',
            },
            {
              title: 'Project Delivery',
              description: 'Seamless collaboration from concept to completion across all disciplines.',
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl border border-gray-800 bg-gray-900/60 p-6 text-left">
              <h3 className="text-xl font-semibold text-white">{item.title}</h3>
              <p className="mt-3 text-sm text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
