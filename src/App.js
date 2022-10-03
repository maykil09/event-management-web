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

// State
import {Provider} from "react-redux";
import store from "./store";

// toast
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";

function App() {
    const [isLogged, setIsLogged] = useState(true);

    return (
        <Provider store={store}>
            <ToastContainer />
            <Router>
                <Routes>
                    <Route exact path="/" element={<LoginPage />} />
                    <Route exact path="/login" element={<LoginPage />} />
                </Routes>
                <LayoutWrapper>
                    <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/organizers" element={<OrganizerPage />} />
                        <Route
                            path="/event-planners"
                            element={<EventPlanner />}
                        />
                        <Route path="/logs" element={<LogsPage />} />
                    </Routes>
                </LayoutWrapper>
            </Router>
        </Provider>
    );
}

export default App;
