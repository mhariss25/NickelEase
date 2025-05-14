import axios from "axios";

const createApiFunction = (method, url) => async (data) => {
    const response = await axios[method](`${process.env.NEXT_PUBLIC_BASE_URL}/${url}`, data)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            return err.response ? err.response.data : { message: 'An error occurred' };
        });
    return response;
};

export default function ApiVehicleBooking() {
    return {
        getAllUser: createApiFunction("get", "vehicle-booking/get-user"),
        getAllVehicles: createApiFunction("get", "vehicle-booking/get-vehicles"),
        getAllVehicleBooking: createApiFunction("get", "vehicle-booking/get-booking"),
        getAllBookingLog: createApiFunction("get", "vehicle-booking/get-bookinglog"),
        getBookingExcel: createApiFunction("get", "vehicle-booking/get-bookingexcel"),
        createVehicle: createApiFunction("post", "vehicle-booking/post-vehicle"),
        createBooking: createApiFunction("post", "vehicle-booking/post-booking"),
        updateVehicle: createApiFunction("put", "vehicle-booking/put-vehicle"),
        updateBooking: createApiFunction("put", "vehicle-booking/put-booking"),
        updateApproveBooking: createApiFunction("put", "vehicle-booking/put-approve-booking"),
        updateStatusVehicle: createApiFunction("put", "vehicle-booking/put-status-vehicle"),
        updateStatusBooking: createApiFunction("put", "vehicle-booking/put-status-booking"),
    };
}
