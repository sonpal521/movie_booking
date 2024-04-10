interface Show {
  _id:string;
  theatreId: string;
  movieId: string;
  price?: number;
  noOfSeats?: number;
  timing: string;
  seatConfiguration: string;
  format: string;
}

export default Show;
