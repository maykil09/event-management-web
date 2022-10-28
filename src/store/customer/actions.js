import axios from "../../config/axios";
import {URL} from "../../config/api";
import {AsyncStorage} from "../../lib/helpers/storage";
import {STORAGE} from "../../config/constant";
import {toast} from "react-toastify";

export const getAllCustomer = (setCustomerData) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.get(URL.API.getAllCustomer);
            setCustomerData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
};
