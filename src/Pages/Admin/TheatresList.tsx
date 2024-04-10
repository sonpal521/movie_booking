import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import getAllTheatres, { deleteTheatre } from "../../Api/Theatre/theatre";
import Breadcrumb from "../../Components/Admin/Breadcrumbs/Breadcrumb";
import SidebarLayout from "../../Layouts/SidebarLayout";

type Theater = {
  _id: string;
  name: string;
  city: string;
  pincode: number;
};

function TheatresList() {
  const [allTheatre, setAllTheatre] = useState<Theater[]>([]);

  async function fetchTheatres() {
    try {
      const theathres = await getAllTheatres();
      setAllTheatre(theathres);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  }
  const removeTheatre = async (theatreId: string) => {
    try {
      await deleteTheatre(theatreId);
      fetchTheatres();
      toast.success("Theatre deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete theatre");
    }
  };
  useEffect(() => {
    fetchTheatres();
  }, []);


  return (
    <SidebarLayout>
      <Breadcrumb pageName="TheatreList" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Theatre Name
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  City
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Pincode
                </th>

                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {allTheatre.map((theatre, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {theatre.name}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{theatre.city}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {theatre.pincode}
                    </p>
                  </td>

                  <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                    <button
                      className="bg-pink-500  hover:bg-pink-700 text-white font-semibold py-2 px-3 rounded ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => removeTheatre(theatre._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarLayout>
  );
}

export default TheatresList;
