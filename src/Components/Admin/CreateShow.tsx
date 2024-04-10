import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import getAllMovies from "../../Api/Movie/movie";
import { createNewShow } from "../../Api/Show/show";
import getAllTheatres from "../../Api/Theatre/theatre";

type ShowDetail={
  theatreId: string;
  movieId: string;
  price?: number;
  noOfSeats?: number;
  timing: string;
  seatConfiguration: string;
  format: string;
}
type Movies = {
  _id: string;
  name: string;
};

type Theatres = {
  _id: string;
  name: string;
};

function CreateShow() {
  const [show, setShow] = useState<ShowDetail>({
    movieId: "",
    theatreId: "",
    timing: "",
    seatConfiguration: "",
    format: "",
  });
  const [allMovies, setAllMovies] = useState<Movies[]>([]);
  const [allTheatres, setAllTheatres] = useState<Theatres[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | undefined>();
  const [selectedTheatre, setSelectedTheatre] = useState<string | undefined>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const movies = await getAllMovies();
      setAllMovies(movies);
      const theatres = await getAllTheatres();
      setAllTheatres(theatres);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setShow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleMovieSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedMovie(selectedId);
  };

  const handleTheatreSelection = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedTheatre(selectedId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !show.noOfSeats ||
      !show.price ||
      !show.timing ||
      !selectedMovie ||
      !selectedTheatre
    ) {
      return toast.error("All Fields are mandatory");
    }

    try {
      await createNewShow({
        theatreId: selectedTheatre,
        movieId: selectedMovie,
        timing: show.timing,
        noOfSeats: show.noOfSeats,
        price: show.price,
        seatConfiguration: show.seatConfiguration,
        format: show.format,
      });
      toast.success("Show Created Successfully");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setShow({
      movieId: "",
      theatreId: "",
      timing: "",
      seatConfiguration: "",
      format: "",
    });
  };

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Show Information
          </h3>
        </div>
        <div className="p-8 justify-center z-auto xsm:w-[319px] md:w-[750px] items-center">
          <form onSubmit={handleSubmit}>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Number Of Seat
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="noOfSeats"
                    type="number"
                    placeholder="Type here"
                    value={show.noOfSeats}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Price
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="price"
                  type="number"
                  value={show.price}
                  onChange={handleChange}
                  placeholder="Type here"
                />
              </div>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Timing
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="timing"
                    type="text"
                    value={show.timing}
                    onChange={handleChange}
                    placeholder="Type here"
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Format
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="format"
                    type="text"
                    value={show.format}
                    onChange={handleChange}
                    placeholder="Type here"
                  />
                </div>
              </div>
            </div>
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2  ">
                <label className="block text-sm font-medium text-black dark:text-white">
                  Select Movie
                </label>
                <select
                  className="w-full rounded border z-10 relative origin-top border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary "
                  value={selectedMovie}
                  onChange={handleMovieSelection}
                >
                  <option value="">Select a movie</option>
                  {allMovies.map((movie) => (
                    <option key={movie._id} value={movie._id}>
                      {movie.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full sm:w-1/2  ">
                <label className="block text-sm font-medium text-black dark:text-white">
                  Select Theatre
                </label>
                <select
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary "
                  value={selectedTheatre}
                  onChange={handleTheatreSelection}
                >
                  <option value="">Select a theatre</option>
                  {allTheatres.map((theatre) => (
                    <option key={theatre._id} value={theatre._id}>
                      {theatre.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-5.5">
              <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                SeatConfiguration
              </label>
              <div className="relative">
                <textarea
                  className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="seatConfiguration"
                  placeholder="Type here"
                  value={show.seatConfiguration}
                  onChange={handleChange}
                  rows={3}
                ></textarea>
              </div>
            </div>

            {/* Other form fields */}
            <button
              className="w-full rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
              type="submit"
            >
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateShow;
