import React from "react";
import {TableHead, TableCell, TableRow, TableSortLabel} from "@mui/material";
import {bookingTableColumn} from "../../../../config/constant";

function TableHeader() {
    return (
        <TableHead>
            <TableRow>
                {bookingTableColumn.map((row, i) => (
                    <TableCell key={i}>
                        <TableSortLabel>{row}</TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;
