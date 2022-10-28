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

function EventPlannerTable({eventPlannerData, selectPlanner}) {
    // menu state
    const [openAction, setOpenAction] = useState(null);

    const openMenu = () => {
        setOpenAction(true);
    };

    const closeMenu = () => {
        setOpenAction(null);
    };

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
            ? Math.max(
                  0,
                  (1 + page) * rowsPerPage -
                      (eventPlannerData !== null ? eventPlannerData.length : 0)
              )
            : 0;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBody>
                    {eventPlannerData === null
                        ? ""
                        : eventPlannerData
                              .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                              .map((row, i) => (
                                  <TableRow key={i}>
                                      <TableCell>{row._id}</TableCell>
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
                                                      component: "planner"
                                                  }}
                                                  to={
                                                      row.disabled
                                                          ? ""
                                                          : `/profile/${row._id}`
                                                  }
                                                  style={{
                                                      textDecoration: "none",
                                                      color: blue[500],
                                                      cursor: row.disabled
                                                          ? "no-drop"
                                                          : "pointer"
                                                  }}>
                                                  <Button
                                                      disabled={row.disabled}
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
                                                      cursor: !row.disabled
                                                          ? "no-drop"
                                                          : "pointer"
                                                  }}>
                                                  <Button
                                                      fullWidth
                                                      disabled={!row.disabled}
                                                      variant="outlined"
                                                      color="success"
                                                      startIcon={<DoneIcon />}
                                                      onClick={() =>
                                                          selectPlanner(row._id)
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
                count={eventPlannerData !== null ? eventPlannerData.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default EventPlannerTable;
