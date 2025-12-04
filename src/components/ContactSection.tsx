export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col items-center justify-center bg-black px-6 py-24 text-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(249,115,22,0.1),transparent_55%)]" />
      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-8">
        <div className="max-w-2xl space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">Partner with Solani Global Limited</h2>
          <p className="text-gray-400">
            Engage our construction, mining support, and supply chain experts for dependable delivery across Ghana and West Africa.
          </p>
        </div>
        <form className="flex w-full max-w-2xl flex-col gap-4 text-left">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full rounded-md border border-white/10 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-orange-400"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-md border border-white/10 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-orange-400"
          />
          <textarea
            placeholder="Message"
            rows={4}
            className="w-full rounded-md border border-white/10 bg-gray-900 px-4 py-3 text-white outline-none transition focus:border-orange-400"
          />
          <button
            type="submit"
            className="rounded-md bg-orange-500 px-6 py-3 text-sm font-semibold uppercase tracking-widest text-black transition hover:bg-orange-400"
          >
            Send Message
          </button>
        </form>
        <div className="grid w-full max-w-2xl gap-4 text-sm uppercase tracking-[0.3em] text-gray-400 md:grid-cols-3">
          <div>
            <p className="text-orange-400">Email</p>
            <p>solanigloballtd@yahoo.com</p>
          </div>
          <div>
            <p className="text-orange-400">Phone</p>
            <p>+233 24 821 2624</p>
            <p>+233 24 457 0566</p>
          </div>
          <div>
            <p className="text-orange-400">Location</p>
            <p>Estate Road, Newtown</p>
            <p>Bibiani, Western North</p>
          </div>
        </div>
        <div className="text-sm uppercase tracking-[0.4em] text-gray-500">
          Bibiani · Western North · Ghana
        </div>
      </div>
    </section>
  )
}
