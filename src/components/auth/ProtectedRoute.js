import React from "react";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import LayoutWrapper from "../layout";
import useAuth from "../../lib/hooks/useAuth";

function ProtectedRoute() {
    const user = useAuth();

    return user ? (
        <LayoutWrapper>
            <Outlet />
        </LayoutWrapper>
    ) : (
        <Navigate to="/login" />
    );
}

export default ProtectedRoute;
