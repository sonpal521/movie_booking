import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import axiosInstance from "../Config/AxiosInstance";
import HomeLayout from "../Layouts/HomeLayout";
import processSeatConfig from "../Utils/ProcessSeatConfig";

type Seat = {
  number: number;
  status: number;
};

type Row = {
  number: string;
  seats: Seat[];
};

type SeatState = Row[];

type SelectedSeat = {
  rowNumber: string;
  seatNumber: number;
};

function SeatConfig() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<SeatState>([
    { number: "", seats: [{ number: 0, status: 0 }] },
  ]);
  async function onBooking() {
    const selectedSeats: SelectedSeat[] = [];
    seats.forEach((row: Row) => {
      row.seats.forEach((currentSeat: Seat) => {
        if (currentSeat.status == 3) {
          const newSelectedSeat: SelectedSeat = {
            rowNumber: row.number,
            seatNumber: currentSeat.number,
          };
          selectedSeats.push(newSelectedSeat);
        }
      });
    });
    const seatsJson = JSON.stringify(selectedSeats).replaceAll('"', "'");

    const response = await axiosInstance.post(
      "/mba/api/v1/bookings",
      {
        seat: seatsJson,
        movieId: state.movieId,
        theatreId: state.theatreId,
        noOfSeats: selectedSeats.length,
        timing: state.timing,
        price: state.price,
        showId: state.showId,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token") || "",
        },
      }
    );
    const showId = state.showId;
    if (response.data.success) {
      navigate("/bookings", { state: { booking: response.data, showId } });
    }
  }
  function processSeatColor(seat: Seat) {
    if (seat.status == 0) return ""; // blocked
    else if (seat.status == 1)
      return "border border-green-300 hover:bg-green-300"; // available
    else if (seat.status == 3)
      return "border border-yellow-300 bg-yellow-300"; // selected seats
    else return "border border-gray-400 bg-gray-300"; // booked
  }

  function processSeatSelection(seatId: string) {
    const [rowNumber, seatNumber] = seatId.split("-");
    const updatedSeats = seats.map((row: Row) => {
      if (row.number != rowNumber) return row;
      else {
        const updatedRowSeats = row.seats.map((seat: Seat) => {
          if (seat.number != +seatNumber) return seat;
          else {
            seat.status = seat.status == 1 ? 3 : 1;
            return seat;
          }
        });
        row.seats = updatedRowSeats;
        return row;
      }
    });
    setSeats(updatedSeats);
  }
  useEffect(() => {
    const seatsConfigJson = processSeatConfig(state.config);
    console.log(seatsConfigJson);
    setSeats(seatsConfigJson.rows);
  }, []);
  console.log("state", state);
  return (
    <HomeLayout>
      <div className=" ">
        <div className="flex flex-col items-center justify-center p-16 w-full md:w-full sm:w-full ">
          {seats.map((row: Row) => {
            return (
              <div key={row.number} className="flex gap-8 ">
                <div className="mt-2">{row.number}</div>

                <div className="flex gap-2 my-2 mx-1  cursor-pointer">
                  {row.seats.map((seat: Seat, idx: number) => {
                    return seat.status == 0 ? (
                      <div
                        key={`${row.number}-${seat.number}-${idx}`}
                        className="h-[2rem] w-[2rem] "
                      ></div>
                    ) : (
                      <div
                        key={`${row.number}-${seat.number}-${idx}`}
                        onClick={() =>
                          processSeatSelection(`${row.number}-${seat.number}`)
                        }
                        className={`${processSeatColor(
                          seat
                        )} px-3 py-1 h-[2rem] w-[2rem]`}
                      >
                        {seat.number}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <div>
            <button
              onClick={onBooking}
              className="bg-red-500 px-4  mt-10 py-2 text-white font-semibold hover:bg-red-400"
            >
              Create Booking
            </button>
          </div>
          <div className="flex">
            <div className="flex mt-10 ml-8">
              <div className="w-[1.2rem] h-[1.2rem] mt-1 border rounded border-green-400 mr-3 "></div>
              <p className="text-semibold ">Availble</p>
            </div>
            <div className="flex mt-10 ml-8">
              <div className="w-[1.2rem] h-[1.2rem] mt-1 border rounded border-yellow-300 bg-yellow-300 mr-3"></div>
              <p className="  text-bold">Selected</p>
            </div>
            <div className="flex mt-10 ml-8">
              <div className="w-[1.2rem] h-[1.2rem] mt-1 border rounded border-gray-400 bg-gray-300 mr-3"></div>
              <p className=" text text-semibold">Sold</p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default SeatConfig;
