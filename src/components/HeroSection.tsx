import Image from 'next/image'

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden bg-black text-white"
    >
      <Image
        src="/1.jpg"
        alt="Solani Global Limited premium infrastructure delivery"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-white/60" />

      <div className="relative z-10 w-full">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-14 px-6 py-24 md:py-32 lg:gap-20">
          <div className="max-w-5xl space-y-8 md:space-y-10">
            <span className="inline-block text-lg font-bold uppercase tracking-widest text-orange-500 md:text-xl">
              Solani Construction & Engineering
            </span>
            <h1 className="leading-[1] text-white">
              <span className="block text-[3rem] font-black uppercase tracking-tight [-webkit-text-stroke:2px_white] text-transparent md:text-[4.5rem] lg:text-[6rem]">
                COMPLETE
              </span>
              <span className="block text-[3rem] font-black uppercase tracking-tight text-white md:text-[4.5rem] lg:text-[6rem]">
                CONSTRUCTION & ENGINEERING
              </span>
              <span className="block text-[3rem] font-black uppercase tracking-tight [-webkit-text-stroke:2px_white] text-transparent md:text-[4.5rem] lg:text-[6rem]">
                SERVICES
              </span>
            </h1>
            <div className="flex flex-col gap-4 text-[11px] uppercase tracking-widest sm:flex-row">
              <a
                href="#project-showcase"
                className="inline-flex items-center justify-center border border-orange-500 bg-orange-500 px-8 py-3 font-bold text-black transition hover:bg-orange-400"
              >
                SEE OUR WORK &gt;&gt;
              </a>
              <a
                href="mailto:solanigloballtd@yahoo.com"
                className="inline-flex items-center justify-center border border-orange-500 px-8 py-3 font-bold text-orange-500 transition hover:bg-orange-500 hover:text-black"
              >
                WORK WITH US &gt;&gt;
              </a>
            </div>
          </div>

          <div className="block" style={{ perspective: '1000px' }}>
            <div className="aspect-square w-[500px] animate-spin-slow rounded-full border-8 border-gray-100 bg-white/10 p-16 shadow-[0_0_40px_rgba(255,255,255,0.6),0_0_80px_rgba(192,192,192,0.4)]" style={{ transformStyle: 'preserve-3d' }}>
              <Image
                src="/logo.png"
                alt="Solani Global Limited Logo"
                width={800}
                height={800}
                className="object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
