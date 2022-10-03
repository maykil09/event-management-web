import React from "react";
import {TableHead, TableCell, TableRow, TableSortLabel} from "@mui/material";
import {organizerTableColumn} from "../../../../config/constant";
function TableHeader(props) {
    return (
        <TableHead>
            <TableRow>
                {organizerTableColumn.map((row, i) => (
                    <TableCell key={i}>
                        <TableSortLabel>{row}</TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

export default TableHeader;
