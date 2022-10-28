import React, {useState} from "react";
import {Navigate, Outlet, useLocation, useParams} from "react-router-dom";
import LayoutWrapper from "../layout";

import useAuth from "../../lib/hooks/useAuth";
import {permissions} from "../../config/permission";

const CheckRole = () => {
    const {role} = useAuth();
    const location = useLocation();
    const params = useParams();
    var currentPath = "";

    if (params.id) {
        currentPath = location.pathname.replace(`/${params.id}`, "");
    } else {
        currentPath = location.pathname;
    }

    const checkAccess = () => {
        const allowedUsers = permissions.filter((permission) => {
            if (permission.path === currentPath) {
                return permission;
            }
        });

        return allowedUsers[0].allowedUsers.includes(role);
    };

    return checkAccess() ? <Outlet /> : <Navigate to="/dashboard" />;
};

export default CheckRole;
