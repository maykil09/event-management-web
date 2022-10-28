import React, {useState, useEffect} from "react";
import {Typography, Box} from "@mui/material";
import LogsTable from "../../components/display/tables/logs";

// store
import {useDispatch} from "react-redux";
import {getAllLogs} from "../../store/logs/actions";

function Logs() {
    const dispatch = useDispatch();
    const [logsData, setLogsData] = useState(null);

    useEffect(() => {
        if (logsData === null) {
            dispatch(getAllLogs(setLogsData));
        }
    }, []);

    return (
        <>
            <Typography variant="h4">Logs</Typography>
            <Box pt={2}>
                <LogsTable logsData={logsData} />
            </Box>
        </>
    );
}

export default Logs;
