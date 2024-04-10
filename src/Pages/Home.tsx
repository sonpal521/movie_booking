import { useEffect, useState } from "react";

import StreamingEvents from "../Components/Events/StreamingEvents";
import HomeCarousel from "../Components/HomeCarousel";
import HomeMovieCard from "../Components/HomeMovieCard";
import Premieres from "../Components/Premiere/Premieres";
import RecommendedMovie from "../Components/RecommendedSection/RecommendedMovie";
import axiosInstance from "../Config/AxiosInstance";
import HomeLayout from "../Layouts/HomeLayout";
import Movie from "../Types/Movie";
type MoviePoster = {
  id: string;
  poster: string;
  name: string;
};

function Home() {
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
    <>
      <HomeLayout>
        <HomeCarousel />
        <RecommendedMovie />
        <div className="min-h-[40rem] w-[80vw] mx-auto ">
          <div className="mt-8 flex flex-row flex-wrap mb-10 ">
            {moviePosters.map((moviePoster) => (
              <HomeMovieCard
                key={moviePoster.id}
                movieImage={moviePoster.poster}
                movieId={moviePoster.id}
                movieName={moviePoster.name}
              />
            ))}
          </div>
        </div>
        <Premieres />
        <StreamingEvents />
      </HomeLayout>
    </>
  );
}

export default Home;
