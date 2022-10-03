import React from "react";
import Header from "./header";
import Sidebar from "./sidebar";
import {Stack, Box, Container} from "@mui/material";
import {useLocation} from "react-router-dom";

function LayoutWrapper(props) {
    const {children} = props;
    const location = useLocation();
    return (
        <Box
            sx={{
                display: location.pathname === "/" ? "none" : "block"
            }}>
            <Header />
            <Stack
                height={"100vh"}
                direction="row"
                spacing={2}
                justifyContent="space-between"
                bgcolor="#eeeeee">
                <Sidebar />
                <Box flex={2} pt={2}>
                    <Container>{children}</Container>
                </Box>
            </Stack>
        </Box>
    );
}

export default LayoutWrapper;
