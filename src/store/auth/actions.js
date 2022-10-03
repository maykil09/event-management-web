import axios from "../../config/axios";
import {URL} from "../../config/api";

export const login = (payload, navigate) => {
    return async (dispatch) => {
        try {
            const res = await axios.post(URL.API.login);

            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
};
