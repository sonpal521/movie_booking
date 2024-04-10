import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

import axiosInstance from "../Config/AxiosInstance";
import HomeLayout from "../Layouts/HomeLayout";

function Bookings() {
  const { state } = useLocation();
  const navigate = useNavigate();

  async function makePayment() {
    try {
      const response = await axiosInstance.post(
        "/mba/api/v1/payments",
        {
          showId: state.showId,
          bookingId: state.booking.data._id,
          amount: state.booking.data.totalCost,
        },
        {
          headers: {
            "x-access-token": localStorage.getItem("token") || "",
          },
        }
      );
      toast.success("Successfully fetched the booking and payment details");
      if (response.data.success) {
        navigate("/payment/success");
      }
    } catch (error) {
      console.log(error);
      toast.error(
        "The payment took more than 5 minutes to get processed, hence you booking got expired, please try again"
      );
    }
  }

  return (
    <HomeLayout>
      <div className="min-h-80 mt-10 flex justify-center items-center">
        <div className="w-[400px] border border-gray-300 bg-green-300 rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">
            Theatre Name: {state.booking?.data?.theatreId?.name}
          </h2>
          <p className="text-lg font-semibold mb-2">
            Price: {state.booking?.data?.totalCost}
          </p>
          <p className="text-lg font-semibold mb-2">
            Time: {state.booking?.data?.timing}
          </p>

          <div className="flex justify-end">
            <button
              onClick={makePayment}
              className="btn-primary px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Make Payment
            </button>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default Bookings;
