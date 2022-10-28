import React from "react";
import {Container, Box, Typography} from "@mui/material";

function NotFound() {
    return (
        <Container>
            <Box
                sx={{
                    height: "100vh",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }}>
                <Typography variant="h2">
                    <Box
                        sx={{
                            fontWeight: "bold"
                        }}>
                        404 not found
                    </Box>
                </Typography>
            </Box>
        </Container>
    );
}

export default NotFound;
