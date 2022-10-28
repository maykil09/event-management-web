import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Button
} from "@mui/material";

function ConfirmationModal({
    openModal,
    setOpenModal,
    selected,
    setSelected,
    activateAccount
}) {
    return (
        <Dialog
            open={openModal}
            maxWidth="sm"
            onClose={() => {
                setSelected("");
                setOpenModal(false);
            }}>
            <DialogTitle>
                <Typography variant="">Activate Account</Typography>
            </DialogTitle>
            <DialogContent>
                Do you want to activate{" "}
                <span style={{fontWeight: "bold"}}>{selected.email}</span>{" "}
                account?
            </DialogContent>
            <DialogActions>
                <Button variant="contained" onClick={() => activateAccount()}>
                    Activate
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationModal;
