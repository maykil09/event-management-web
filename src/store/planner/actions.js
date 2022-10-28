import axios from "../../config/axios";
import {URL} from "../../config/api";
import {AsyncStorage} from "../../lib/helpers/storage";
import {STORAGE} from "../../config/constant";
import {toast} from "react-toastify";

export const getAllEventPlanner = (setEventPlannerData) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.get(URL.API.getAllEventPlanner);
            setEventPlannerData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
};

export const activateEventPlannerAccount = (
    user_id,
    setSelectedPlanner,
    setDidUpdate,
    setOpenConfModal
) => {
    return async () => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });
            const res = await axios.post(URL.API.activateEventPlanner, {
                user_id
            });

            if (res.status === 200) {
                setSelectedPlanner("");
                setDidUpdate((prevState) => {
                    return prevState + 1;
                });
                setOpenConfModal(false);
                toast.success("Activate successfully");
            }

            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
};

export const createPlannerAccount = (
    userForm,
    setUserForm,
    setOpenModal,
    setDidUpdate
) => {
    return async () => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.post(URL.API.createUser, userForm);

            console.log(res);

            if (res.status === 201) {
                setOpenModal(false);
                setDidUpdate((prevState) => {
                    return prevState + 1;
                });
                setUserForm({
                    email: "",
                    password: "Secret",
                    role: "organizer"
                });
                toast.success("Create successful");
            }
        } catch (error) {
            console.log(error);
        }
    };
};
