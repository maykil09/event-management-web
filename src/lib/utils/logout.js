import {AsyncStorage} from "../helpers/storage";

export const manualLogout = async (navigate) => {
    AsyncStorage.clear();
    navigate("/");
    setTimeout(() => {
        if (typeof window !== undefined) {
            window.location.reload();
        }
    }, 1000);
};
