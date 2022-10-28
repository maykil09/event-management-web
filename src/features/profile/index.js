import React from "react";
import OrganizerProfile from "./OrganizerProfile";
import EventPLannerProfile from "./EventPLannerProfile";
import CustomerProfile from "./CustomerProfile";
import {useLocation} from "react-router-dom";

function ProfileContainer() {
    const location = useLocation();

    const NewComponent = () => {
        const serveComponent = {
            organizer: <OrganizerProfile />,
            planner: <EventPLannerProfile />,
            customer: <CustomerProfile />
        };

        return serveComponent[location.state.component];
    };
    return <NewComponent />;
}

export default ProfileContainer;
