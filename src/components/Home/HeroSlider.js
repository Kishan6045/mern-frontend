import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

export default function HeroSlider({ HERO_SLIDES }) {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 3500 }}
      pagination={{ clickable: true }}
      loop={true}
      className="h-[75vh]"
    >
      {HERO_SLIDES.map((slide, index) => (
        <SwiperSlide key={index}>
          <div
            className="h-[75vh] bg-cover bg-center relative"
            style={{ backgroundImage: `url(${slide.img})` }}
          >
            <div className="absolute inset-0 bg-black/70"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
              <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="mt-4 text-gray-300 text-lg max-w-2xl">
                {slide.subtitle}
              </p>
              <Link
                to={slide.link}
                className="mt-6 px-8 py-3 bg-yellow-500 text-black font-bold rounded-md hover:bg-yellow-600 transition"
              >
                {slide.cta}
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
