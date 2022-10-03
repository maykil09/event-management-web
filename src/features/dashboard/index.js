import React from "react";
import {Typography, Grid, Box} from "@mui/material";

// Custom components
import DashboardCard from "../../components/display/cards/dashboard";
import LineChart from "../../components/display/charts/LineChart";
import SalesChart from "../../components/display/charts/sales";

// Icon
import PeopleIcon from "@mui/icons-material/People";

function Dashboard() {
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
                            name="Total Users"
                            totalCount={100}
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
                            totalCount={40}
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
                            totalCount={30}
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
