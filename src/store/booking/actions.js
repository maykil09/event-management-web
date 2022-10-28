import axios from "../../config/axios";
import {URL} from "../../config/api";
import {AsyncStorage} from "../../lib/helpers/storage";
import {STORAGE} from "../../config/constant";
import {toast} from "react-toastify";

export const getAllBookings = (id, setBookingData) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const payload = {
                accountId: id
            };
            console.log(payload);
            const res = await axios.get(URL.API.plannerBooking, {
                params: payload
            });

            console.log(res);
            setBookingData(res.data);
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateBooking = (payload, setDidUpdate) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            console.log(payload);
            const res = await axios.put(URL.API.updateBooking, payload);
            setDidUpdate((prevState) => {
                return prevState + 1;
            });
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    };
};
