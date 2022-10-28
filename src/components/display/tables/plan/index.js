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

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

function PlanTable({planData, selectPlan}) {
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
                      (planData !== null ? planData.length : 0)
              )
            : 0;

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHeader />
                <TableBody>
                    {planData === null
                        ? ""
                        : planData
                              .slice(
                                  page * rowsPerPage,
                                  page * rowsPerPage + rowsPerPage
                              )
                              .map((row, i) => (
                                  <TableRow key={i}>
                                      <TableCell>{row._id}</TableCell>
                                      <TableCell>{row.plan_name}</TableCell>
                                      <TableCell>
                                          {row.plan_description}
                                      </TableCell>
                                      <TableCell>
                                          {row.price_per_month}
                                      </TableCell>
                                      <TableCell>
                                          <Chip
                                              color={
                                                  row.plan_status
                                                      ? "success"
                                                      : "error"
                                              }
                                              label={
                                                  row.plan_status
                                                      ? "Active"
                                                      : "In-active"
                                              }
                                              icon={
                                                  row.plan_status ? (
                                                      <CheckCircleIcon color="primary" />
                                                  ) : (
                                                      <CancelIcon />
                                                  )
                                              }
                                          />
                                      </TableCell>
                                      <TableCell>
                                          <Button
                                              variant="contained"
                                              color={
                                                  row.plan_status
                                                      ? "error"
                                                      : "primary"
                                              }
                                              onClick={() => {
                                                  selectPlan(row._id);
                                              }}>
                                              {row.plan_status
                                                  ? "Deactivate"
                                                  : "Activate"}
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
                count={planData !== null ? planData.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}

export default PlanTable;
