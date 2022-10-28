import axios from "../../config/axios";
import {URL} from "../../config/api";
import {AsyncStorage} from "../../lib/helpers/storage";
import {STORAGE} from "../../config/constant";
import {toast} from "react-toastify";

export const getUseInfo = (id, setPlannerData) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.get(URL.API.getProfile + id);
            setPlannerData(res.data);
            if (res.data.message) {
                toast.error("Error in fetching event planners info");
            }
            if (res.status === 200 && res.data.message === undefined) {
                setPlannerData(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const createEvent = (payload, setOpenModal, setEventForm) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(URL.API.event, payload);
            console.log(res);
            if (res.status === 200) {
                setOpenModal(false);
                setEventForm({
                    event: {
                        title: "",
                        details: "",
                        price: {
                            from: "",
                            to: ""
                        },
                        type: ""
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getAllEvents = (setEventData) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.get(URL.API.allEvents);
            console.log(res.data);

            if (res.status === 200 && res.data.message === undefined) {
                setEventData(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
};
