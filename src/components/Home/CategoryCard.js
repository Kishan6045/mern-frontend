export default function CategoryCard({ img, title, onClick }) {
  return (
    <div
      onClick={onClick}
      className="relative cursor-pointer rounded-xl overflow-hidden group"
    >
      <img
        src={img}
        alt={title}
        className="h-44 w-full object-cover group-hover:scale-110 transition"
      />
      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition flex items-center justify-center">
        <p className="text-lg font-semibold text-white group-hover:text-yellow-400">
          {title}
        </p>
      </div>
    </div>
  );
}
