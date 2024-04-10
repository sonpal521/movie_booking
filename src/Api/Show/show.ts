import axiosInstance from "../../Config/AxiosInstance";
type ShowData ={
 
  theatreId: string;
  movieId: string;
  price?: number;
  noOfSeats?: number;
  timing: string;
  seatConfiguration: string;
  format: string;
}


export default async function getAllShows() {
  try {
    const res = await axiosInstance.get("/mba/api/v1/shows");
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching shows");
  }
}

export async function deleteShow(showId: string) {
  try {
    const res = await axiosInstance.delete(`/mba/api/v1/shows/${showId}`, {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while deleting show");
  }
}
 export async function createNewShow(show: ShowData) {
 

  try {
    const res = await axiosInstance.post("/mba/api/v1/shows", show, {
      headers: {
        "x-access-token":  localStorage.getItem("token"),
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while creating a new show");
  }
}