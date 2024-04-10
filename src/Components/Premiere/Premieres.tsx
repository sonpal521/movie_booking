import "swiper/swiper-bundle.css";

import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import Banner from "../../assets/premierBanner.png";
import axiosInstance from "../../Config/AxiosInstance";
import Movie from "../../Types/Movie";
import HomeMovieCard from "../HomeMovieCard";

type MoviePoster = {
  id: string;
  poster: string;
  name: string;
};

function Premieres() {
  const [moviePosters, setMoviePosters] = useState<MoviePoster[]>([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await axiosInstance.get("/mba/api/v1/movies");
        const movieData = response.data.data.map((movie: Movie) => ({
          id: movie._id,
          poster: movie.poster,
          name: movie.name,
        }));
        setMoviePosters(movieData);
      } catch (error) {
        console.log(error);
      }
    }

    fetchMovies();
  }, []);

  const breakpoints = {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 5,
    },
  };

  return (
    <div className="bg-[#2b3148] pb-14">
      <div className="w-full md:w-[80vw] min-h-[40rem] mx-auto flex flex-col">
        <img src={Banner} alt="" />
        <div className="text-3xl font-semibold text-white mt-4">Premieres</div>
        <div className="mt-8 cursor-pointer">
          <Swiper
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            spaceBetween={20}
            slidesPerView={5}
            breakpoints={breakpoints}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {moviePosters.map((moviePoster) => (
              <SwiperSlide key={moviePoster.id}>
                <HomeMovieCard
                  movieImage={moviePoster.poster}
                  movieId={moviePoster.id}
                  movieName={moviePoster.name}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Premieres;
