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
                console.log("setting token");
                await AsyncStorage.setItem(
                    STORAGE.ACCESS_TOKEN,
                    JSON.stringify(res.data.accessToken)
                );

                toast.success("Login successful");
                navigate("/dashboard");
            }
        } catch (error) {
            console.log(error);
        }
    };
};
