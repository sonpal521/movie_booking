import axiosInstance from "../../Config/AxiosInstance";
import Theatre from "../../Types/Theatre";


export default async function getAllTheatres() {
  try {
    const res = await axiosInstance.get("/mba/api/v1/theatres");
    return res.data.data;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong while fetching theatres");
  }
}

export async function deleteTheatre(theatreId: string) {
  try {
    const res = await axiosInstance.delete(`/mba/api/v1/theatres/${theatreId}`, {
      headers: {
        "x-access-token": localStorage.getItem("token") || "",
      },
    });
    return res.data.data;
  } catch (error) {
    console.error(error);
    throw new Error("Something went wrong while creating a new movie");
  }
}



export async function createNewTheatre(theatre:Theatre) {
     try{
        const res = await axiosInstance.post("/mba/api/v1/theatres",theatre,{
          headers:{
            "x-access-token":localStorage.getItem("token") || "",
          }
        });
        return res.data.data;
     }catch(error){
       console.log(error);
       throw new Error("Something went wrong while fetching theatres");
     }
  
}
