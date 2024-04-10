import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import getAllShows, { deleteShow } from "../../Api/Show/show";
import Breadcrumb from "../../Components/Admin/Breadcrumbs/Breadcrumb";
import SidebarLayout from "../../Layouts/SidebarLayout";
import Show from "../../Types/Show";

function ShowList() {
  const [showData, setShowData] = useState<Show[]>([]);

  async function fetchShowData() {
    try {
      const shows = await getAllShows();
      setShowData(shows);
      toast.success("Successfully fetch data");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  const removeShow = async (showId: string) => {
    try {
      await deleteShow(showId); // Use theatreId here
      fetchShowData();
      toast.success("Show deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete show");
    }
  };
  useEffect(() => {
    fetchShowData();
  }, []);
  return (
    <SidebarLayout>
      <Breadcrumb pageName="ShowList" />
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Number Of Seat
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Price
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Time
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {showData.map((show, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {show.noOfSeats}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{show.price}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{show.timing}</p>
                  </td>
                  <td className="border-b border-[#eee] py-2 px-1 dark:border-strokedark">
                    <button
                      className="bg-pink-500  hover:bg-pink-700 text-white font-semibold py-2 px-3 rounded ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => removeShow(show._id)}
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

export default ShowList;
