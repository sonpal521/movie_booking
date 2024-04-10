import { Route, Routes } from "react-router-dom";

import BookingList from "../Pages/Admin/BookingList";
import CreateMoviePage from "../Pages/Admin/CreateMoviePage";
import CreateShowPage from "../Pages/Admin/CreateShowPage";
import CreateTheatrePage from "../Pages/Admin/CreateTheatrePage";
import Dashboard from "../Pages/Admin/Dashboard";
import MovieList from "../Pages/Admin/MovieList";
import ShowList from "../Pages/Admin/ShowList";
import TheatresList from "../Pages/Admin/TheatresList";
import Signin from "../Pages/Auth/Signin";
import Signup from "../Pages/Auth/Signup";
import Bookings from "../Pages/Bookings";
import Home from "../Pages/Home";
import MovieListings from "../Pages/MovieListing";
import PaymentSuccess from "../Pages/PaymentSuccess";
import SeatConfig from "../Pages/SeatConfig";
import AuthRoutes from "./AuthRoutes";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/login" element={<Signin />} />
      <Route path="/signup" element={<Signup />} /> 
    <Route path="/movie/listing" element={<MovieListings />} />
      <Route path="/movie/seatSelection" element={<SeatConfig />} />
      <Route path="/bookings" element={<Bookings />} /> 

      <Route path="/payment/success" element={<PaymentSuccess />} />

 <Route element={<AuthRoutes allowListedRoles={["ADMIN"]} />}> 
        <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/movieList" element={<MovieList />} />
        <Route path="/theatreList" element={<TheatresList />} />
        <Route path="/bookingList" element={<BookingList />} />
        <Route path="/showList" element={<ShowList />} />

        <Route path="/createMovie" element={<CreateMoviePage />} />
        <Route path="/createTheatre" element={<CreateTheatrePage />} />
        <Route path="/createShow" element={<CreateShowPage />} />
      </Route> 
    </Routes>
  );
}

export default MainRoutes;
