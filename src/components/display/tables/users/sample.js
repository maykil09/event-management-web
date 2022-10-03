import React, {useState} from "react";
import {
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Paper
} from "@mui/material";

import {DeleteIcon, FilterListIcon} from "@mui/icons-material";

const tableData = [
    {
        id: 1,
        first_name: "Washington",
        last_name: "Dovey",
        email: "wdovey0@hubpages.com",
        gender: "Male"
    },
    {
        id: 2,
        first_name: "Eugine",
        last_name: "Godman",
        email: "egodman1@nymag.com",
        gender: "Female"
    },
    {
        id: 3,
        first_name: "Corena",
        last_name: "Evershed",
        email: "cevershed2@squarespace.com",
        gender: "Female"
    },
    {
        id: 4,
        first_name: "Karleen",
        last_name: "Stanyer",
        email: "kstanyer3@sourceforge.net",
        gender: "Female"
    },
    {
        id: 5,
        first_name: "Sansone",
        last_name: "Vaan",
        email: "svaan4@gmpg.org",
        gender: "Male"
    },
    {
        id: 6,
        first_name: "Tommi",
        last_name: "Mouland",
        email: "tmouland5@digg.com",
        gender: "Female"
    },
    {
        id: 7,
        first_name: "Jacinthe",
        last_name: "O'Riordan",
        email: "joriordan6@gnu.org",
        gender: "Female"
    },
    {
        id: 8,
        first_name: "Maris",
        last_name: "Oxlade",
        email: "moxlade7@flavors.me",
        gender: "Female"
    },
    {
        id: 9,
        first_name: "Gerta",
        last_name: "Crocroft",
        email: "gcrocroft8@state.gov",
        gender: "Female"
    },
    {
        id: 10,
        first_name: "Hillery",
        last_name: "Copestick",
        email: "hcopestick9@craigslist.org",
        gender: "Male"
    }
];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === "desc"
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function UserTable() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [dense, setDense] = React.useState(false);
    const [order, setOrder] = React.useState("asc");
    const [orderBy, setOrderBy] = React.useState("calories");
    const [selected, setSelected] = React.useState([]);

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 5));
        setPage(0);
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === "asc";
        setOrder(isAsc ? "desc" : "asc");
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = tableData.map((n) => n.name);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1)
            );
        }

        setSelected(newSelected);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    const isSelected = (name) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

    return (
        <TableContainer component={Paper}>
            <Table arial-label="User Table" stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>First name</TableCell>
                        <TableCell>Last name</TableCell>
                        <TableCell>Gender</TableCell>
                        <TableCell>Email</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {stableSort(tableData, getComparator(order, orderBy))
                        .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{
                                    "&:last-child td, &:last-child th": {
                                        border: 0
                                    }
                                }}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    {emptyRows > 0 && (
                        <TableRow
                            style={{
                                height: (dense ? 33 : 53) * emptyRows
                            }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50]}
                component="div"
                count={tableData.length}
                page={page}
                rowsPerPage={rowsPerPage}
                onChange={handlePageChange}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default UserTable;
