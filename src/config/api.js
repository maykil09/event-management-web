const env = "dev";

const base_api_url = {
    dev: "http://localhost:5000/api/",
    prod: "https://event-management-back.herokuapp.com/api/"
};

const api_url = {
    login: "user/login"
};

export const URL = {
    BASE_API: base_api_url[env],
    API: api_url
};
