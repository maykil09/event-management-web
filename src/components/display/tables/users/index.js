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
    Box
} from "@mui/material";

// Mui colors
import {red, green} from "@mui/material/colors";

// Mui icons
// import {CheckIcon} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const rowSampleData = [
    {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        status: true
    },
    {
        id: 2,
        first_name: "John",
        last_name: "Snow",
        email: "johnsnow@gmail.com",
        status: false
    },
    {
        id: 3,
        first_name: "Felisa",
        last_name: "Wright",
        email: "felisa@gmail.com",
        status: true
    },
    {
        id: 4,
        first_name: "Virginia",
        last_name: "Paige",
        email: "virginia@gmail.com",
        status: true
    },
    {
        id: 5,
        first_name: "Christopher",
        last_name: "Hom",
        email: "Christopher@gmail.com",
        status: true
    },
    {
        id: 6,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        status: true
    },
    {
        id: 7,
        first_name: "John",
        last_name: "Snow",
        email: "johnsnow@gmail.com",
        status: true
    },
    {
        id: 8,
        first_name: "Felisa",
        last_name: "Wright",
        email: "felisa@gmail.com",
        status: true
    },
    {
        id: 9,
        first_name: "Virginia",
        last_name: "Paige",
        email: "virginia@gmail.com",
        status: true
    },
    {
        id: 10,
        first_name: "Christopher",
        last_name: "Hom",
        email: "Christopher@gmail.com",
        status: true
    },
    {
        id: 11,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        status: true
    },
    {
        id: 12,
        first_name: "John",
        last_name: "Snow",
        email: "johnsnow@gmail.com",
        status: true
    },
    {
        id: 13,
        first_name: "Felisa",
        last_name: "Wright",
        email: "felisa@gmail.com",
        status: true
    },
    {
        id: 14,
        first_name: "Virginia",
        last_name: "Paige",
        email: "virginia@gmail.com",
        status: true
    },
    {
        id: 15,
        first_name: "Christopher",
        last_name: "Hom",
        email: "Christopher@gmail.com",
        status: true
    },
    {
        id: 16,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        status: true
    },
    {
        id: 17,
        first_name: "John",
        last_name: "Snow",
        email: "johnsnow@gmail.com",
        status: true
    },
    {
        id: 18,
        first_name: "Felisa",
        last_name: "Wright",
        email: "felisa@gmail.com",
        status: true
    },
    {
        id: 19,
        first_name: "Virginia",
        last_name: "Paige",
        email: "virginia@gmail.com",
        status: true
    },
    {
        id: 20,
        first_name: "Christopher",
        last_name: "Hom",
        email: "Christopher@gmail.com",
        status: true
    }
];

function UserTable() {
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
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>
                                    <Chip
                                        color={row.status ? "success" : "error"}
                                        label={
                                            row.status
                                                ? "Verified"
                                                : "Not verified"
                                        }
                                        icon={
                                            row.status ? (
                                                <CheckCircleIcon color="primary" />
                                            ) : (
                                                <CancelIcon />
                                            )
                                        }
                                    />
                                </TableCell>
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

export default UserTable;
