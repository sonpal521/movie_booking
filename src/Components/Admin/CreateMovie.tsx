import React, { useState } from "react";
import toast from "react-hot-toast";

import { createNewMovie } from "../../Api/Movie/movie";
 type MovieDetails={
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

function CreateMovie() {
  const [movie, setMovie] = useState<MovieDetails>({
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

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    if (name === "casts") {
      // Handle casts as an array
      setMovie((prevState) => ({
        ...prevState,
        [name]: value.split(",").map((cast) => cast.trim()),
      }));
    } else {
      setMovie((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !movie.name ||
      !movie.director ||
      !movie.language ||
      !movie.poster ||
      !movie.casts.length ||
      !movie.description ||
      !movie.trailerUrl ||
      !movie.releaseDate
    ) {
      return toast.error("All Fields are mandatory");
    }

    try {
      const res = await createNewMovie(movie);
      setMovie(res);
      toast.success("Movie Created Successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
    setMovie({
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

  return (
    <>
      <div className="   flex  justify-center items-center  ">
        <div className="rounded-sm border border-stroke  bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Movie Information
            </h3>
          </div>
          <div className="p-8 xsm:w-[319px] md:w-[750px] justify-center items-center">
            <form action="#">
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
                      value={movie.name}
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
                    value={movie.director}
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
                      value={movie.language}
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
                    value={movie.releaseStatus}
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
                      value={movie.casts}
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
                    value={movie.releaseDate}
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
                      value={movie.trailerUrl}
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
                    value={movie.poster}
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
                    value={movie.description}
                    onChange={handleChange}
                    rows={3}
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-center gap-4.5">
                <button
                  onClick={handleSubmit}
                  className="flex justify-center rounded w-70 bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateMovie;
