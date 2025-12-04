export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4 text-slate-700">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 text-[8px] uppercase tracking-[0.08em] md:flex-row md:items-center md:justify-between">
          {/* Left Side - All Details in One Line */}
          <div className="flex flex-wrap items-center gap-1 text-slate-600 md:gap-2">
            <span className="text-slate-500">© {new Date().getFullYear()} Solani Global Limited</span>
            <span className="hidden md:inline">·</span>
            <span>Estate Road, Newtown, Bibiani, Ghana</span>
            <span className="hidden md:inline">·</span>
            <span>solanigloballtd@yahoo.com</span>
            <span className="hidden md:inline">·</span>
            <span>+233 24 821 2624 · +233 24 457 0566</span>
          </div>
          
          {/* Right Side - Developer Credit */}
          <a
            href="https://wa.me/233542855399"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 transition-colors hover:text-orange-500 whitespace-nowrap"
          >
            Developed by Ecstasy Geospatial Services
          </a>
      </div>
    </footer>
  )
}
