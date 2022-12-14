import React from "react";
import {Dialog, DialogTitle, DialogContent, Typography} from "@mui/material";

function AddOrganizerModal(props) {
    const {title, children, openModal, setOpenModal} = props;
    return (
        <Dialog
            open={openModal}
            maxWidth="sm"
            onClose={() => setOpenModal(false)}>
            <DialogTitle>
                <Typography variant="span">Add Organizer</Typography>
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            {/* <image src={}/> */}
        </Dialog>
    );
}

export default AddOrganizerModal;
