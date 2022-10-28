const env = "prod";

const base_api_url = {
    dev: "http://localhost:5000/api/",
    prod: "https://event-management-back.herokuapp.com/api/"
};

const api_url = {
    login: "user/login",
    subscription: "subscription",
    totalCustomer: "user/getTotalCustomer",
    totalOrganizer: "user/getTotalOrganizer",
    totalEventPlanner: "user/getTotalPlanner",
    getAllOrganizer: "user/getAllOrganizer",
    getAllEventPlanner: "user/getAllEventPlanner",
    getAllCustomer: "user/getAllCustomer",
    activateOrganizer: "user/activateOrganizer",
    activateEventPlanner: "user/activateEventPlanner",
    profile: "profile",
    getProfile: "profile/s/",
    plan: "/plan",
    updatePlan: "/plan/update-status",
    createUser: "user/create/account",
    uploadAvatar: "/profile/upload/avatar",
    uploadGallery: "/profile/upload/gallery",
    updateAddress: "/profile/address",
    logs: "/logs",
    event: "/event",
    allEvents: "/event/planner/all",
    plannerBooking: "/booking/get-by-planner",
    updateBooking: "booking/update/booking-status"
};

export const URL = {
    BASE_API: base_api_url[env],
    API: api_url
};
