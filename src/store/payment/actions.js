import axios from "../../config/axios";
import {URL} from "../../config/api";
import {AsyncStorage} from "../../lib/helpers/storage";
import {STORAGE} from "../../config/constant";

export const getSales = () => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });
        } catch (error) {
            console.log(error);
        }
    };
};
