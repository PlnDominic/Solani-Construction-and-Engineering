import Image from 'next/image'

export default function FullImageSection() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh]">
      <Image
        src="/6.jpg"
        alt="Featured construction project"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
