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
    Button
} from "@mui/material";

function BookingTable({bookingData, handleAccept}) {
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
                      (bookingData !== null ? bookingData.length : 0)
              )
            : 0;
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBody>
                    {bookingData === null
                        ? ""
                        : bookingData
                              .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                              .map((row, i) => (
                                  <TableRow key={i}>
                                      <TableCell>{row._id}</TableCell>
                                      <TableCell>{row.event.title}</TableCell>
                                      <TableCell>
                                          {row.header.customer.name.first}{" "}
                                          {row.header.customer.name.last}
                                      </TableCell>
                                      <TableCell>{row.status}</TableCell>
                                      <TableCell>{row.event.type}</TableCell>
                                      <TableCell>
                                          <Button
                                              disabled={
                                                  row.status !== "preparing"
                                                      ? true
                                                      : false
                                              }
                                              onClick={() => {
                                                  handleAccept(row._id);
                                              }}>
                                              Accept booking
                                          </Button>
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
                count={bookingData !== null ? bookingData.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default BookingTable;
