import Image from 'next/image'

export default function FullImageSection2() {
  return (
    <section className="relative w-full h-[60vh] md:h-[80vh]">
      <Image
        src="/7.jpg"
        alt="Construction project showcase"
        fill
        className="object-cover"
        priority
      />
    </section>
  )
}
