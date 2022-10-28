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
import moment from "moment";

import {Link} from "react-router-dom";

// Mui colors
import {blue} from "@mui/material/colors";

function EventTable({eventData}) {
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
                      (eventData !== null ? eventData.length : 0)
              )
            : 0;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBody>
                    {eventData !== null
                        ? eventData
                              .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                              .map((row, i) => (
                                  <TableRow key={i}>
                                      <TableCell>{row._id}</TableCell>
                                      <TableCell>{row.event.title}</TableCell>
                                      <TableCell>{row.event.type}</TableCell>
                                      <TableCell>
                                          {moment(row.createdAt).format(
                                              "MMMM Do YYYY, h:mm:ss a"
                                          )}
                                      </TableCell>
                                      <TableCell>
                                          <Link
                                              state={{
                                                  event: row
                                              }}
                                              to={"/events/details"}
                                              style={{
                                                  textDecoration: "none",
                                                  color: blue[500],
                                                  cursor: row.disabled
                                                      ? "no-drop"
                                                      : "pointer"
                                              }}>
                                              <Button
                                                  variant="outlined"
                                                  onClick={() =>
                                                      console.log(row._id)
                                                  }>
                                                  View Full Details
                                              </Button>
                                          </Link>
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
                count={eventData !== null ? eventData.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default EventTable;
