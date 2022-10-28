import React, {useState, useEffect} from "react";
import {Navigate, Outlet} from "react-router-dom";
import LayoutWrapper from "../layout";

import useAuth from "../../lib/hooks/useAuth";

const Checkauth = () => {
    const user = useAuth();
    return user ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default Checkauth;
