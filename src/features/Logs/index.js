import React from "react";
import {Typography, Box} from "@mui/material";
import LogsTable from "../../components/display/tables/logs";

function Logs() {
    return (
        <>
            <Typography variant="h4">Logs</Typography>
            <Box pt={2}>
                <LogsTable />
            </Box>
        </>
    );
}

export default Logs;
