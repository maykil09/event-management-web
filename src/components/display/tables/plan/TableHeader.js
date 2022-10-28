import React from "react";
import {TableHead, TableCell, TableRow, TableSortLabel} from "@mui/material";
import {planTableColumn} from "../../../../config/constant";
function TableHeader() {
    return (
        <TableHead>
            <TableRow>
                {planTableColumn.map((row, i) => (
                    <TableCell key={i}>
                        <TableSortLabel>{row}</TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;
