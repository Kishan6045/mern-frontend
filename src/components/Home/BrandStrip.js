export default function BrandStrip({ BRANDS }) {
  return (
    <div className="bg-[#0b0b0b] py-4 border-y border-yellow-500/10">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 text-gray-400 text-xs md:text-sm tracking-[0.2em] uppercase">
        {BRANDS.map((b) => (
          <span key={b} className="opacity-70 hover:opacity-100 transition">
            {b}
          </span>
        ))}
      </div>
    </div>
  );
}
