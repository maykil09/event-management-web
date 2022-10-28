import React, {useState, useEffect} from "react";
import {Typography, Grid, Box} from "@mui/material";

// Custom components
import DashboardCard from "../../components/display/cards/dashboard";
import SalesChart from "../../components/display/charts/sales";

// Icon
import PeopleIcon from "@mui/icons-material/People";

//store
import {useDispatch} from "react-redux";
import {
    getTotalCustomer,
    getTotalOrganizer,
    getTotalEventPlanner
} from "../../store/auth/actions";

function Dashboard() {
    const [totalCustomer, setTotalCustomer] = useState(null);
    const [totalOrganizer, setTotalOrganizer] = useState(null);
    const [totalEventPlanner, setTotalEventPlanner] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (totalCustomer === null) {
            console.log("fetching total customer");
            dispatch(getTotalCustomer(setTotalCustomer));
        }

        if (totalOrganizer === null) {
            console.log("fetching total organizer");
            dispatch(getTotalOrganizer(setTotalOrganizer));
        }

        if (totalEventPlanner === null) {
            dispatch(getTotalEventPlanner(setTotalEventPlanner));
        }
    }, []);

    return (
        <>
            <Typography variant="h4">Dashboard</Typography>
            <Grid container spacing={2} pt={2}>
                <Grid item xs={12} sm={4}>
                    <Box
                        sx={{
                            boxShadow: 2
                        }}>
                        <DashboardCard
                            name="Total Customer"
                            totalCount={totalCustomer}
                            Icon={PeopleIcon}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box
                        sx={{
                            boxShadow: 2
                        }}>
                        <DashboardCard
                            name="Total Organizers"
                            totalCount={totalOrganizer}
                            color="secondary.main"
                            Icon={PeopleIcon}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                    <Box
                        sx={{
                            boxShadow: 2
                        }}>
                        <DashboardCard
                            name="Total Event Planners"
                            totalCount={totalEventPlanner}
                            color="success.main"
                            Icon={PeopleIcon}
                        />
                    </Box>
                </Grid>
            </Grid>

            <Box
                mt={3}
                sx={{
                    height: "70vh",
                    width: "100%",
                    boxShadow: 5
                    // display: "flex",
                    // alignItems: "center",
                    // justifyContent: "center"
                }}>
                <Box
                    sx={{
                        height: "500px",
                        width: "100%"
                    }}>
                    <SalesChart />
                </Box>
            </Box>
        </>
    );
}

export default Dashboard;
