import React, {useState, useEffect} from "react";
import {STORAGE} from "../../config/constant";
import {AsyncStorage} from "../../lib/helpers/storage";

const useAuth = () => {
    const user = JSON.parse(localStorage.getItem(STORAGE.SESSION));

    return user;
};
export default useAuth;
