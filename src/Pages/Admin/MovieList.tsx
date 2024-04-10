import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import getAllMovies, {
  deleteMovie,
  updateMovieDetail,
} from "../../Api/Movie/movie"; // Import your API functions
import Breadcrumb from "../../Components/Admin/Breadcrumbs/Breadcrumb";
import SidebarLayout from "../../Layouts/SidebarLayout";
import Movie from "../../Types/Movie";
// type MovieDetails={
//   name: string;
//   description: string;
//   casts: string[];
//   trailerUrl: string;
//   language: string;
//   director: string;
//   releaseStatus: string;
//   poster: string;
//   releaseDate: string;
//  }

interface TempMovieDetail extends Omit<Movie, "casts"> {
 
  casts: string[];
 
}

function MovieList() {
  const [tempMovieDetail, setTempMovieDetail] = useState<TempMovieDetail>({
    _id:"",
    name: "",
    director: "",
    language: "",
    releaseStatus: "RELEASED",
    description: "",
    poster: "",
    trailerUrl: "",
    releaseDate: "",
    casts: [],
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [allMovies, setAllMovies] = useState<Movie[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTempMovieDetail((prev) => ({ ...prev, [name]: value }));
  };
  function truncateText(text: string, maxLength: number) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      
      const movieId = tempMovieDetail._id; // Adjust this based on how you get the movieId

      // Call updateMovieDetail with movieId and tempMovieDetail
      await updateMovieDetail(movieId, tempMovieDetail);
      toast.success("Movie updated successfully");
      fetchMovies();
      clearState();
      setShowModal(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update movie");
    }
  };

  async function fetchMovies() {
    try {
      const movies = await getAllMovies();
      setAllMovies(movies);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }

  const clearState = () => {
    setTempMovieDetail({
     _id:"",
      name: "",
      director: "",
      language: "",
      releaseStatus: "RELEASED",
      description: "",
      poster: "",
      trailerUrl: "",
      releaseDate: "",
      casts: [],
    });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const editMovie = (movie: Movie) => {
    setTempMovieDetail({ ...movie });
    setShowModal(true);
  };

  const removeMovie = async (movieId: string) => {
    try {
      await deleteMovie(movieId);
      fetchMovies();
      toast.success("Movie deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete movie");
    }
  };

  return (
    <SidebarLayout>
      <Breadcrumb pageName="MovieList" />

      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Movie Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Description
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Director
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Language
                </th>
                <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                  Release Date
                </th>
                <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                  Delete
                </th>
                <th className="min-w-[80px] py-4 px-4 font-medium text-black dark:text-white">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {allMovies.map((movie, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {movie.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {truncateText(movie.description, 15)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {movie.director}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {movie.language}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {movie.releaseDate}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                    <button
                      onClick={() => editMovie(movie)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-3 rounded"
                    >
                      Edit
                    </button>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                    <button
                      className="bg-pink-500  hover:bg-pink-700 text-white font-semibold py-2 px-3 rounded ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => removeMovie(movie._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal ? (
        <div className="justify-center  items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-1 outline-none focus:outline-none">
          <div className="relative w-auto my-6 mx-auto max-w-3xl ">
            {/*body*/}
            <div className=" mt-50 p-6 z-9 flex-auto">
              <div className="p-8 xsm:w-[319px] md:w-[750px] justify-center items-center">
                <div className="   flex  justify-center items-center  ">
                  <div className="rounded-sm border border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                      <h3 className="font-medium text-black dark:text-white">
                        Movie Information
                      </h3>
                    </div>
                    <div className="p-8 xsm:w-[319px] md:w-[750px] justify-center items-center">
                      <form>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Movie Name
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="name"
                                type="text"
                                placeholder="Type here"
                                value={tempMovieDetail.name}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="phoneNumber"
                            >
                              Director
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              name="director"
                              type="text"
                              value={tempMovieDetail.director}
                              onChange={handleChange}
                              placeholder="Type here"
                            />
                          </div>
                        </div>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Language
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="language"
                                type="text"
                                value={tempMovieDetail.language}
                                onChange={handleChange}
                                placeholder="Type here"
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="phoneNumber"
                            >
                              ReleaseStatus
                            </label>
                            <select
                              name="releaseStatus"
                              value={tempMovieDetail.releaseStatus}
                              onChange={handleChange}
                              className="w-full rounded-lg border border-stroke bg-transparent py-3 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                            >
                              <option value="RELEASED">RELEASED</option>
                              <option value="UNRELEASED">UNRELEASED</option>
                              <option value="BLOCKED">BLOCKED</option>
                            </select>
                          </div>
                        </div>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              Casts
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="casts"
                                type="text"
                                placeholder="Type here"
                                value={tempMovieDetail.casts}
                                onChange={handleChange}
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="phoneNumber"
                            >
                              Release Date
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              name="releaseDate"
                              type="text"
                              value={tempMovieDetail.releaseDate}
                              onChange={handleChange}
                              placeholder="Type here"
                            />
                          </div>
                        </div>
                        <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="fullName"
                            >
                              TrailerUrl
                            </label>
                            <div className="relative">
                              <input
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="trailerUrl"
                                type="text"
                                value={tempMovieDetail.trailerUrl}
                                onChange={handleChange}
                                placeholder="Type here"
                              />
                            </div>
                          </div>

                          <div className="w-full sm:w-1/2">
                            <label
                              className="mb-3 block text-sm font-medium text-black dark:text-white"
                              htmlFor="phoneNumber"
                            >
                              PosterUrl
                            </label>
                            <input
                              className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              name="poster"
                              type="text"
                              placeholder="Type here"
                              value={tempMovieDetail.poster}
                              onChange={handleChange}
                            />
                          </div>
                        </div>

                        <div className="mb-5.5">
                          <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="Username"
                          >
                            Description
                          </label>
                          <div className="relative">
                            <textarea
                              className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                              name="description"
                              placeholder="Type here"
                              value={tempMovieDetail.description}
                              onChange={handleChange}
                              rows={3}
                            ></textarea>
                          </div>
                        </div>

                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            Close
                          </button>
                          <button
                            className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="submit"
                            onClick={handleSubmit}
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </SidebarLayout>
  );
}

export default MovieList;
