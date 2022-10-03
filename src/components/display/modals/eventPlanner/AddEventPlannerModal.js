import React from "react";
import {Dialog, DialogTitle, DialogContent, Typography} from "@mui/material";

function AddEventPlannerModal(props) {
    const {title, children, openModal, setOpenModal} = props;
    return (
        <Dialog
            open={openModal}
            maxWidth="sm"
            onClose={() => setOpenModal(false)}>
            <DialogTitle>
                <Typography variant="h6">Add Event Planner</Typography>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
        </Dialog>
    );
}

export default AddEventPlannerModal;
