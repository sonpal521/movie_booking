
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { GiTheater } from "react-icons/gi";
import { MdMovie } from "react-icons/md";
import { SiBookmyshow } from "react-icons/si";
import { Link } from "react-router-dom";

import getAllBookings from "../../Api/Booking/booking";
import getAllMovies from "../../Api/Movie/movie";
import getAllShows from "../../Api/Show/show";
import getAllTheatres from "../../Api/Theatre/theatre";
import CardDataStats from "../../Components/Admin/CardDataStats";
import SidebarLayout from "../../Layouts/SidebarLayout";
import Movie from "../../Types/Movie";
import Show from "../../Types/Show";

type BookingData = {
  noOfSeats: number;
  totalCost: number;
  _id: string;
};

type Theater = {
  id: string;
  name: string;
  city: string;
  pincode: number;
};
function Dashboard() {
  const [movieCount, setMoviesCount] = useState<Movie[]>([]);
  const [bookingCount, setBookingsCount] = useState<BookingData[]>([]);
  const [theatreCount, setTheatreCount] = useState<Theater[]>([]);
  const [showCount, setShowCount] = useState<Show[]>([]);

  async function fetchData() {
    try {
      const movies = await getAllMovies();
      setMoviesCount(movies);
      const bookings = await getAllBookings();
      setBookingsCount(bookings);
      const theatres = await getAllTheatres();
      setTheatreCount(theatres);
      const shows = await getAllShows();
      setShowCount(shows);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <SidebarLayout>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
          <Link to="/movieList">
            <CardDataStats
              title="Total Movies"
              total={movieCount.length}
              rate="20.43%"
              levelUp
            >
              <MdMovie className="fill-primary dark:fill-white" />
            </CardDataStats>
          </Link>
          <Link to="/bookingList">
            <CardDataStats
              title="Total Bookings"
              total={bookingCount.length}
              rate="4.35%"
              levelUp
            >
              <BsFillTicketPerforatedFill className="fill-primary dark:fill-white" />
            </CardDataStats>
          </Link>
          <Link to="/theatreList">
            <CardDataStats
              title="Total Theatres"
              total={theatreCount.length}
              rate="12.59%"
              levelUp
            >
              <GiTheater className="fill-primary dark:fill-white" />
            </CardDataStats>
          </Link>
          <CardDataStats
            title="Total Shows"
            total={showCount.length}
            rate="40.95%"
            levelUp
          >
            <SiBookmyshow className="fill-primary dark:fill-white " />
          </CardDataStats>
        </div>
      </SidebarLayout>
    </>
  );
}

export default Dashboard;
