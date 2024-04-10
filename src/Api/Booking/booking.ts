import axiosInstance from "../../Config/AxiosInstance";

export default async function getAllBookings() {
  try {
    const res = await axiosInstance.get("/mba/api/v1/bookings/all", {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while fetching bookings");
  }
}


