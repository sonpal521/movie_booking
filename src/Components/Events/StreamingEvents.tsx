import "swiper/swiper-bundle.css";

import { useEffect, useState } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import axiosInstance from "../../Config/AxiosInstance";
import Movie from "../../Types/Movie";
import HomeMovieCard from "../HomeMovieCard";

type MoviePoster = {
  id: string;
  poster: string;
  name: string;
};

function StreamingEvents() {
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

  return (
    <div className="w-[80vw] min-h-[40rem] mx-auto flex flex-col">
      <div className="text-3xl font-bold text-black mt-4">
        Online Streaming Events
      </div>
      <div className="mt-8 cursor-pointer">
        <Swiper
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          spaceBetween={20}
          slidesPerView={5}
          navigation
          pagination={{ clickable: true }}
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
  );
}

export default StreamingEvents;
