import axios from "axios";
import {URL} from "./api";

const instance = axios.create({
    baseURL: URL.BASE_API
});

export default instance;
