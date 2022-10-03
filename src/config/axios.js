import axios from "axios";
import {URL} from "./api";

const instance = axios.create({
    baseURL: URL.BASE_API,
    headers: {
        Accept: "appliction/json",
        "Content-type": "appliction/json"
    }
});

export default instance;
