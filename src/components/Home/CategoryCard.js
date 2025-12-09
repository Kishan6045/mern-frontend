export default function CategoryCard({ img, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer rounded-xl overflow-hidden group bg-[#111]"
    >
      {/* IMAGE */}
      <img
        src={img}
        alt={title}
        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
      />

      {/* LIGHT GRADIENT BELOW ONLY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none"></div>

      {/* TITLE */}
      <h3 className="absolute bottom-4 w-full text-center text-white text-lg font-semibold drop-shadow-lg">
        {title}
      </h3>
    </div>
  );
}
