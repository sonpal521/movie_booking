import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import TheaterShowCard from "../Components/TheaterShowCard";
import axiosInstance from "../Config/AxiosInstance";
import HomeLayout from "../Layouts/HomeLayout";
type MovieShows = {
  id: string; // show id
  timing: string;
  format: string;
  theatreId: string;
  movieId: string;
  price: number;
  noOfSeats: number;
  seatConfiguration: string;
};

type TheatreData = {
  id: string; // theatreId
  theatreName: string;
  shows: [MovieShows];
};

type theatre = {
  city: string;
  createdAt: string;
  updatedAt: string;
  movies: [string];
  name: string;
  owner: string;
  pincode: number;
  _v: number;
  _id: string;
};

type show = {
  createdAt: string;
  format: string;
  movieId: string;
  noOfSeats: number;
  price: number;
  timing: string;
  updatedAt: string;
  _v: number;
  _id: string;
  theatreId: theatre;
  seatConfiguration: string;
};

type TheatreState = {
  [key: string]: TheatreData;
};

// {skjfdjkns: {theatreData}, adfnksfnv: {theatreData}}
function MovieListings() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [theatreData, setTheatreData] = useState<TheatreState>({});

  async function fetchShowDetails() {
    try {
      const response = await axiosInstance.get(
        `mba/api/v1/shows?movieId=${state.movieId}`
      );
      const shows = response.data.data;
      const showState: TheatreState = {};
      shows.map((show: show) => {
        if (show.theatreId._id in showState) {
          showState[show.theatreId._id].shows.push({
            id: show._id, // show id
            timing: show.timing,
            format: show.format,
            price: show.price,
            movieId: show.movieId,
            theatreId: show.theatreId._id,
            noOfSeats: show.noOfSeats,
            seatConfiguration: show.seatConfiguration
              ? show.seatConfiguration
              : "",
          });
        } else {
          showState[show.theatreId._id] = {
            id: show.theatreId._id, // theatreId
            theatreName: show.theatreId.name,
            shows: [
              {
                id: show._id, // show id
                timing: show.timing,
                format: show.format,
                price: show.price,
                movieId: show.movieId,
                theatreId: show.theatreId._id,
                noOfSeats: show.noOfSeats,
                seatConfiguration: show.seatConfiguration
                  ? show.seatConfiguration
                  : "",
              },
            ],
          };
        }
      });

      console.log(showState);
      setTheatreData(showState);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!state || !state.movieName) navigate("/");
    fetchShowDetails();
  }, []);
  return (
    <>
      <HomeLayout>
        <div className="min-h-screen bg-slate-300">
          <div className="bg-[#333545] text-white">
            <div className="font-light text-7xl pt-8 pb-6 w-full max-w-6xl mx-auto">
              {state && state.movieName && state.movieName}
              <div className="flex flex-wrap items-center gap-3 mt-6">
                <button className="btn btn-xs text-sm border-2 border-white bg-transparent text-white hover:bg-transparent">
                  Drama
                </button>
                <button className="btn btn-xs text-sm border-2 border-white bg-transparent text-white hover:bg-transparent">
                  Biography
                </button>
              </div>
            </div>
          </div>
          <div className="bg-slate-300 mt-4 w-full">
            <div className="max-w-6xl mx-auto rounded-xl cursor-pointer bg-white">
              {Object.keys(theatreData).map((theatreId: string) => (
                <TheaterShowCard
                  shows={theatreData[theatreId].shows}
                  key={theatreId}
                  name={theatreData[theatreId].theatreName}
                />
              ))}
            </div>
          </div>
        </div>
      </HomeLayout>
    </>
  );
}

export default MovieListings;
