import axiosInstance from "../../Config/AxiosInstance";
type  MovieData= {
 
  name: string;
  description: string;
  casts: string[];
  trailerUrl: string;
  language: string;
  director: string;
  releaseStatus: string;
  poster: string;
  releaseDate: string;
}


export default  async function getAllMovies() {
  try {
    const res = await axiosInstance.get("/mba/api/v1/movies");
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while fetching movies");
  }
}

export async function deleteMovie(movieId: string) {
  try {
    const res = await axiosInstance.delete(`/mba/api/v1/movies/${movieId}`, {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while creating a new movie");
  }
}

export async function updateMovieDetail( movieId:string, tempMovieDetail: MovieData) {
  try {
    const res = await axiosInstance.patch(`/mba/api/v1/movies/${(movieId)}`, tempMovieDetail, {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while updating the movie");
  }
}
export async function createNewMovie(movie: MovieData) {
  try {
    const res = await axiosInstance.post("/mba/api/v1/movies", movie, {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while creating a new movie");
  }
}


