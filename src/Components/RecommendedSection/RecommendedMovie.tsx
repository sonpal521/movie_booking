import "swiper/swiper-bundle.css";
import "./RecommendedMovie.css";

import { useEffect, useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import PremiereImage from "../../assets/premiere.jpg";
import StreameBannerImage from "../../assets/stream.png";
import axiosInstance from "../../Config/AxiosInstance";
import Movie from "../../Types/Movie";
import HomeBanner from "../HomeBanner";
import HomeMovieCard from "../HomeMovieCard";

type MoviePoster = {
  id: string;
  poster: string;
  name: string;
};

function RecommendedMovie() {
  const [moviePosters, setMoviePosters] = useState<MoviePoster[]>([]);

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

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="min-h-[40rem] w-[80vw] mx-auto flex flex-col">
      <HomeBanner image={StreameBannerImage} />
      <div className="text-2xl font-semibold text-black mt-4">
        Recommended Movies
      </div>
      <div className="mt-8 cursor-pointer">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={20}
          navigation={true}
          slidesPerView={6} // Number of slides per view
          breakpoints={{
            700: { slidesPerView: 3 },
            1200: { slidesPerView: 5 },
          }}
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
      <HomeBanner image={PremiereImage} />
    </div>
  );
}

export default RecommendedMovie;
