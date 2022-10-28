import React, {useState} from "react";

import {BrowserRouter as Router, Route, Routes} from "react-router-dom";

// Layout wrapper
import LayoutWrapper from "./components/layout";

// Pages
import DashboardPage from "./pages/dashboard";
import UsersPage from "./pages/Users";
import OrganizerPage from "./pages/organizer";
import EventPlanner from "./features/eventPlanner";
import LogsPage from "./pages/Logs";
import LoginPage from "./pages/auth/login";
import ProfilePage from "./pages/profile";
import PaymentPage from "./pages/payment";
import Map from "./components/google/Map";
import NotFound from "./pages/404/index";
import PlanPage from "./pages/plan";
import BookingPage from "./pages/booking";
import EventPage from "./pages/event";

// toast
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import Checkauth from "./components/auth/Checkauth";
import CheckRole from "./components/auth/CheckRole";

function App() {
    return (
        <>
            <ToastContainer />
            {/* <Map /> */}
            <Routes>
                <Route element={<Checkauth />}>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route path="/login" element={<LoginPage />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<CheckRole />}>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/organizers" element={<OrganizerPage />} />
                        <Route
                            path="/event-planners"
                            element={<EventPlanner />}
                        />
                        <Route path="/logs" element={<LogsPage />} />
                        <Route path="/bookings" element={<BookingPage />} />
                        <Route path="/events" element={<EventPage />} />
                        <Route path="/events/details" element={<EventPage />} />
                        <Route path="/plans" element={<PlanPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/profile/:id" element={<ProfilePage />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    );
}

export default App;
