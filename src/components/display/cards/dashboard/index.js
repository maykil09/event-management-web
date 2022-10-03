import React from "react";
import {Typography, Box, Card, CardContent} from "@mui/material";
import CountUp from "react-countup";

function index({name, totalCount, color, Icon}) {
    return (
        <Card variant="outlined" sx={{display: "flex"}}>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                    <CardContent sx={{flex: "1 0 auto"}}>
                        <Typography component="div" variant="h3">
                            <Box
                                sx={{
                                    fontWeight: "bold"
                                }}>
                                <CountUp end={totalCount} duration={1} />
                            </Box>
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            color="text.secondary"
                            component="div">
                            <Box
                                sx={{
                                    fontWeight: "bold"
                                }}>
                                {name}
                            </Box>
                        </Typography>
                    </CardContent>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                    <Typography variant="h1">
                        <Box
                            sx={{
                                color: color ? color : "primary.main"
                            }}>
                            <Icon fontSize="inherit" />
                        </Box>
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
}

export default index;
