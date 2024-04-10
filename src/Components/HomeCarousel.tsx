import "swiper/swiper-bundle.css";

import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CarouselImage4 from "../assets/c2.png";
import CarouselImage2 from "../assets/c3.png";
import CarouselImage1 from "../assets/c4.jpg";
import CarouselImage3 from "../assets/c5.jpg";
function HomeCarousel() {
  return (
    <Swiper
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      spaceBetween={20}
      slidesPerView={1}
      modules={[Autoplay]}
      className="mySwiper"
    >
      <SwiperSlide>
        <div className="w-full">
          <img src={CarouselImage1} className="w-full" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full">
          <img src={CarouselImage2} className="w-full" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full">
          <img src={CarouselImage3} className="w-full" />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="w-full">
          <img src={CarouselImage4} className="w-full" />
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HomeCarousel;
