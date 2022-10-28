import React from "react";
import Event from "./Event";
import EventDetails from "./EventDetails";

import {useLocation, Navigate} from "react-router-dom";

function EventContainer() {
    const location = useLocation();
    console.log(location);

    if (location.pathname === "/events") {
        return <Event />;
    }

    if (location.pathname === "/events/details") {
        return <EventDetails />;
    }

    return <Navigate to="/" replace={true} />;
}

export default EventContainer;
