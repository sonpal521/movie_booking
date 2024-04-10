interface Movie {
  _id:string;
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

export default Movie;
