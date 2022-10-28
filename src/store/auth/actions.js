import axios from "../../config/axios";
import {URL} from "../../config/api";

// toast
import {toast} from "react-toastify";

// helpers
import {AsyncStorage} from "../../lib/helpers/storage";
import {STORAGE} from "../../config/constant";

export const login = (payload, navigate) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(URL.API.login, payload);

            console.log(res.data);
            if (res.status === 200) {
                await AsyncStorage.setItem(
                    STORAGE.ACCESS_TOKEN,
                    JSON.stringify(res.data.accessToken)
                );
                await AsyncStorage.setItem(
                    STORAGE.SESSION,
                    JSON.stringify({
                        id: res.data._id,
                        email: res.data.email,
                        role: res.data.role,
                        disabled: res.data.disabled,
                        verified: res.data.verified
                    })
                );

                toast.success("Login successful");
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTotalCustomer = (setTotalCustomer) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.get(URL.API.totalCustomer);

            setTotalCustomer(res.data.count);
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTotalOrganizer = (setTotalOrganizer) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.get(URL.API.totalOrganizer);

            console.log(res.data);

            setTotalOrganizer(res.data.count);
        } catch (error) {
            console.log(error);
        }
    };
};

export const getTotalEventPlanner = (setTotalEventPlanner) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.get(URL.API.totalEventPlanner);

            setTotalEventPlanner(res.data.count);
        } catch (error) {
            console.log(error);
        }
    };
};
