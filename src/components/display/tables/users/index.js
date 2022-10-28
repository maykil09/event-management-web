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
    Box,
    Button,
    Stack
} from "@mui/material";

import {Link} from "react-router-dom";

// Mui colors
import {blue} from "@mui/material/colors";

// Mui icons
// import {CheckIcon} from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DoneIcon from "@mui/icons-material/Done";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const rowSampleData = [
    {
        id: 1,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        verified: true
    },
    {
        id: 2,
        first_name: "John",
        last_name: "Snow",
        email: "johnsnow@gmail.com",
        verified: false
    },
    {
        id: 3,
        first_name: "Felisa",
        last_name: "Wright",
        email: "felisa@gmail.com",
        verified: true
    },
    {
        id: 4,
        first_name: "Virginia",
        last_name: "Paige",
        email: "virginia@gmail.com",
        verified: true
    },
    {
        id: 5,
        first_name: "Christopher",
        last_name: "Hom",
        email: "Christopher@gmail.com",
        verified: true
    },
    {
        id: 6,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        verified: true
    },
    {
        id: 7,
        first_name: "John",
        last_name: "Snow",
        email: "johnsnow@gmail.com",
        verified: true
    },
    {
        id: 8,
        first_name: "Felisa",
        last_name: "Wright",
        email: "felisa@gmail.com",
        verified: true
    },
    {
        id: 9,
        first_name: "Virginia",
        last_name: "Paige",
        email: "virginia@gmail.com",
        verified: true
    },
    {
        id: 10,
        first_name: "Christopher",
        last_name: "Hom",
        email: "Christopher@gmail.com",
        verified: true
    },
    {
        id: 11,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        verified: true
    },
    {
        id: 12,
        first_name: "John",
        last_name: "Snow",
        email: "johnsnow@gmail.com",
        verified: true
    },
    {
        id: 13,
        first_name: "Felisa",
        last_name: "Wright",
        email: "felisa@gmail.com",
        verified: true
    },
    {
        id: 14,
        first_name: "Virginia",
        last_name: "Paige",
        email: "virginia@gmail.com",
        verified: true
    },
    {
        id: 15,
        first_name: "Christopher",
        last_name: "Hom",
        email: "Christopher@gmail.com",
        verified: true
    },
    {
        id: 16,
        first_name: "John",
        last_name: "Doe",
        email: "johndoe@gmail.com",
        verified: true
    },
    {
        id: 17,
        first_name: "John",
        last_name: "Snow",
        email: "johnsnow@gmail.com",
        verified: true
    },
    {
        id: 18,
        first_name: "Felisa",
        last_name: "Wright",
        email: "felisa@gmail.com",
        verified: true
    },
    {
        id: 19,
        first_name: "Virginia",
        last_name: "Paige",
        email: "virginia@gmail.com",
        verified: true
    },
    {
        id: 20,
        first_name: "Christopher",
        last_name: "Hom",
        email: "Christopher@gmail.com",
        verified: true
    }
];

function UserTable({customerData}) {
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
            ? Math.max(
                  0,
                  (1 + page) * rowsPerPage -
                      (customerData !== null ? customerData.length : 0)
              )
            : 0;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBody>
                    {customerData !== null
                        ? customerData
                              .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                              .map((row, i) => (
                                  <TableRow key={i}>
                                      <TableCell>{row.id}</TableCell>
                                      <TableCell>{row.email}</TableCell>
                                      <TableCell>
                                          <Chip
                                              color={
                                                  row.verified
                                                      ? "success"
                                                      : "error"
                                              }
                                              label={
                                                  row.verified
                                                      ? "Verified"
                                                      : "Not verified"
                                              }
                                              icon={
                                                  row.verified ? (
                                                      <CheckCircleIcon color="primary" />
                                                  ) : (
                                                      <CancelIcon />
                                                  )
                                              }
                                          />
                                      </TableCell>
                                      <TableCell>
                                          <Stack spacing={1}>
                                              <Link
                                                  state={{
                                                      component: "customer"
                                                  }}
                                                  to={`/profile/${row._id}`}
                                                  style={{
                                                      textDecoration: "none",
                                                      color: blue[500]
                                                  }}>
                                                  <Button
                                                      sx={{
                                                          width: "100%"
                                                      }}
                                                      variant="outlined"
                                                      color="info"
                                                      startIcon={
                                                          <VisibilityIcon />
                                                      }>
                                                      View
                                                  </Button>
                                              </Link>
                                              <span
                                                  style={{
                                                      width: "100%",
                                                      cursor: row.verified
                                                          ? "no-drop"
                                                          : "pointer"
                                                  }}>
                                                  <Button
                                                      fullWidth
                                                      disabled={row.verified}
                                                      variant="outlined"
                                                      color="success"
                                                      startIcon={<DoneIcon />}
                                                      onClick={() =>
                                                          console.log(row._id)
                                                      }>
                                                      Approve
                                                  </Button>
                                              </span>
                                              <Button
                                                  variant="outlined"
                                                  color="error"
                                                  startIcon={
                                                      <RestartAltIcon />
                                                  }>
                                                  Reset Password
                                              </Button>
                                          </Stack>
                                      </TableCell>
                                  </TableRow>
                              ))
                        : ""}
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
                count={customerData !== null ? customerData.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default UserTable;
