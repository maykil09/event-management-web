import axios from "../../config/axios";
import {URL} from "../../config/api";
import {AsyncStorage} from "../../lib/helpers/storage";
import {STORAGE} from "../../config/constant";
import {toast} from "react-toastify";

export const getAllOrganizer = (setOrganizerData) => {
    return async (dispatch) => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.get(URL.API.getAllOrganizer);
            setOrganizerData(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    };
};

export const activateOrganizerAccount = (
    user_id,
    setSelectedOrg,
    setOpenConfModal,
    setDidUpdate
) => {
    return async () => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });
            const res = await axios.post(URL.API.activateOrganizer, {user_id});

            if (res.status === 200) {
                setDidUpdate(1);
                setOpenConfModal(false);
                setSelectedOrg("");
                toast.success("Activate successful");
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const getOrganizerProfile = (id, setResponseData, setIsLoading) => {
    return async () => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            // console.log(URL.API.getOrganizerProfile + id);
            const res = await axios.get(URL.API.getProfile + id);
            console.log(res.data);
            if (res.data.message) {
                setResponseData(res.data);
                setIsLoading(false);
            }
            if (res.status === 200 && res.data.message === undefined) {
                setResponseData(res.data);
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const createOraganizerAccount = (
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

export const uploadAvatar = (imageStr, setDidUpdate, setIsEdit) => {
    return async () => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });
            console.log("actions");

            const res = await axios.post(URL.API.uploadAvatar, {imageStr});
            if (res.status === 200) {
                setDidUpdate((prevState) => {
                    return prevState + 1;
                });
                setIsEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const uploadGallery = (
    userGallery,
    setUserGallery,
    setDidUpdate,
    setOpenModal
) => {
    return async () => {
        try {
            await AsyncStorage.getItem(STORAGE.ACCESS_TOKEN).then((token) => {
                axios.defaults.headers.common[
                    "Authorization"
                ] = `Bearer ${JSON.parse(token)}`;
            });

            const res = await axios.post(URL.API.uploadGallery, userGallery);
            if (res.status === 200) {
                setOpenModal(false);
                setDidUpdate((prevState) => {
                    return prevState + 1;
                });
                setUserGallery({
                    imageStr: "",
                    description: ""
                });
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateAddress = (
    payload,
    setDidUpdate,
    setUserAddress,
    setMapSaveButton
) => {
    return async () => {
        try {
            const res = await axios.put(URL.API.updateAddress, payload);
            console.log(res);
            if (res.status === 200) {
                setDidUpdate((prevState) => {
                    return prevState + 1;
                });
                setUserAddress({
                    name: "",
                    coordinates: {
                        latitude: "",
                        longitude: ""
                    }
                });
                setMapSaveButton(true);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const updateProfileInfo = (userProfileInfo, setDidUpdate, setIsEdit) => {
    return async () => {
        try {
            const res = await axios.put(URL.API.profile, userProfileInfo);
            console.log(res);
            if (res.status === 200) {
                setDidUpdate((prevState) => {
                    return prevState + 1;
                });
                setIsEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    };
};
