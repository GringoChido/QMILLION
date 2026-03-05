const Footer = () => {
  return (
    <footer className="py-8 border-t border-studio-black/10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-studio-black/40">
          &copy; {new Date().getFullYear()} Qmillion. All rights reserved.
        </p>
        <p className="text-xs text-studio-black/30 tracking-wider">
          Producer. Mixer. Sonic Architect.
        </p>
      </div>
    </footer>
  )
}

export default Footer
