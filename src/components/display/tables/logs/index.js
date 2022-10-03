import React, {useState} from "react";
import TableHeader from "./TableHeader";
import {
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Chip,
    Button,
    Stack
} from "@mui/material";

// Mui colors
import {red, green} from "@mui/material/colors";

// Mui icons
// import {CheckIcon} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const rowSampleData = [
    {
        date: "10/09/2022",
        message: "Approve a user",
        user: "John Doe"
    },
    {
        date: "10/09/2022",
        message: "Approve a user",
        user: "John Doe"
    },
    {
        date: "10/09/2022",
        message: "Approve a organizer",
        user: "John Doe"
    },
    {
        date: "10/09/2022",
        message: "Logged in",
        user: "John Doe"
    }
];

function LogsTable() {
    // table State
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0
            ? Math.max(0, (1 + page) * rowsPerPage - rowSampleData.length)
            : 0;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBody>
                    {rowSampleData
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((row, i) => (
                            <TableRow key={i}>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.message}</TableCell>
                                <TableCell>{row.user}</TableCell>
                            </TableRow>
                        ))}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{
                                height: 53 * emptyRows
                            }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 50]}
                component="div"
                count={rowSampleData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default LogsTable;
