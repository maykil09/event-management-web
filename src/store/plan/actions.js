import axios from "../../config/axios";
import {URL} from "../../config/api";

// toast
import {toast} from "react-toastify";

// helpers
import {AsyncStorage} from "../../lib/helpers/storage";
import {STORAGE} from "../../config/constant";

export const getAllPlans = (setPlanData) => {
    return async () => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.get(URL.API.plan);
            setPlanData(res.data);
        } catch (error) {}
    };
};

export const updatePlanStatus = (payload, setDidUpdate, setOpenConfModal) => {
    return async () => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.post(URL.API.updatePlan, payload);
            console.log(res.data);
            if (res.status === 200) {
                setDidUpdate((prevState) => {
                    return prevState + 1;
                });
                setOpenConfModal(false);
                toast.success("Update successful");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const createPlan = (planForm, setDidUpdate, setOpenModal) => {
    return async () => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const payload = {
                name: planForm.plan_name,
                description: planForm.plan_description,
                price: planForm.price_per_month,
                status: planForm.plan_status
            };

            const res = await axios.post(URL.API.plan, payload);
            if (res.status === 201) {
                setDidUpdate((prevState) => {
                    return prevState + 1;
                });
                setOpenModal(false);
                toast.success("Create successful");
            }
        } catch (error) {
            console.log(error);
        }
    };
};
