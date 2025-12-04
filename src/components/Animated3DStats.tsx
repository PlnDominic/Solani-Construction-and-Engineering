export default function Animated3DStats() {
  const stats = [
    { value: '50+', label: 'Completed Projects', accent: 'text-orange-500' },
    { value: '15+', label: 'Years Experience', accent: 'text-blue-500' },
    { value: '1000+', label: 'Happy Clients', accent: 'text-green-500' },
    { value: '5M+', label: 'Sqft Delivered', accent: 'text-purple-500' },
  ]

  return (
    <section className="py-20 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Our <span className="text-orange-500">Impact</span>
          </h2>
          <p className="mt-4 text-gray-400">Real numbers, real results</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8">
              <div className={`text-5xl font-bold ${stat.accent}`}>{stat.value}</div>
              <p className="mt-2 text-sm uppercase tracking-wider text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
