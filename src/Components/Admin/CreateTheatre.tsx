import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import getAllMovies from "../../Api/Movie/movie";
import { createNewTheatre } from "../../Api/Theatre/theatre";
import Theatre from "../../Types/Theatre";

type Movies = {
  _id: string;
  name: string;
  description: string;
  casts: string[];
  trailerUrl: string;
  language: string;
  director: string;
  releaseStatus: string;
  poster: string;
  releaseDate: string;
};

function CreateTheatre() {
  const [theatre, setTheatre] = useState<Theatre>({
    name: "",
    description: "",
    city: "",
    owner: "",
    movies: [],
  });
  const [allMovies, setAllMovies] = useState<Movies[]>([]);

  async function fetchData() {
    try {
      const movies = await getAllMovies();
      setAllMovies(movies);
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
    setTheatre((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMovieSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const isSelected = theatre.movies.includes(value);

    setTheatre((prevState) => ({
      ...prevState,
      movies: isSelected
        ? prevState.movies.filter((m) => m !== value)
        : [...prevState.movies, value],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    theatre.owner = "65900afe8947bcda123a94ae";
    if (
      !theatre.name ||
      !theatre.city ||
      !theatre.description ||
      !theatre.pincode ||
      !theatre.movies ||
      !theatre.owner
    ) {
      return toast.error("All Fields are mandatory");
    }
    try {
      const res = await createNewTheatre({
        name: theatre.name,
        description: theatre.description,
        city: theatre.city,
        pincode: theatre.pincode,
        movies: theatre.movies,
        owner: theatre.owner,
      });
      setTheatre(res);
      toast.success("Theatre Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setTheatre({
      name: "",
      description: "",
      city: "",
      pincode: 0,
      owner: "",
      movies: [],
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="   flex  justify-center items-center  ">
      <div className="rounded-sm border border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <h3 className="font-medium text-black dark:text-white">
            Theatre Information
          </h3>
        </div>
        <div className="p-8 justify-center xsm:w-[319px] md:w-[750px] items-center">
          <form action="#">
            <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="mb-3 block text-sm font-medium text-black dark:text-white"
                  htmlFor="fullName"
                >
                  Theatre Name
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="name"
                    type="text"
                    placeholder="Type here"
                    value={theatre.name}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="w-full sm:w-1/2">
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  City
                </label>
                <input
                  className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                  name="city"
                  type="text"
                  value={theatre.city}
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
                  Pincode
                </label>
                <div className="relative">
                  <input
                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                    name="pincode"
                    type="text"
                    value={theatre.pincode}
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
                  Select Movies
                </label>
                <details
                  className="dropdown mb-4  w-full relative z-50"
                  id="userTypeDropDown"
                >
                  <summary className="w-full rounded-lg border border-stroke bg-transparent py-4 pl-6 pr-10 text-black outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary ">
                    Select Movies
                  </summary>
                  <ul className="w-full rounded-lg border border-stroke bg-transparent z-50 py-4 pl-6 pr-10 text-blcak outline-none focus:border-primary focus-visible:shadow-none dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary">
                    {allMovies &&
                      allMovies.map((movie, index) => (
                        <div key={index} className="flex items-center ">
                          <input
                            type="checkbox"
                            value={movie._id}
                            onChange={handleMovieSelection}
                            checked={theatre.movies.includes(movie._id)}
                          />
                          <label>{movie.name}</label>
                        </div>
                      ))}
                  </ul>
                </details>
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
                  value={theatre.description}
                  onChange={handleChange}
                  rows={3}
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center gap-4.5">
              <button
                onClick={handleSubmit}
                className="flex justify-center w-70 rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateTheatre;
