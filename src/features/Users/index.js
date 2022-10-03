import React from "react";
import {Typography, Box} from "@mui/material";
import UserTable from "../../components/display/tables/users";

function Users() {
    return (
        <>
            <Typography variant="h4">Users</Typography>
            <Box pt={2}>
                <UserTable />
            </Box>
        </>
    );
}

export default Users;
