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
    selectedPlan,
    updatePlan
}) {
    return (
        <Dialog
            open={openModal}
            maxWidth="sm"
            onClose={() => setOpenModal(false)}>
            <DialogTitle>
                <Typography variant="">Plan</Typography>
            </DialogTitle>
            <DialogContent>
                Do you want to{" "}
                {selectedPlan.plan_status ? "deactivate" : "activate"}{" "}
                <span style={{fontWeight: "bold"}}>
                    {selectedPlan.plan_name}
                </span>{" "}
                account?
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    color={selectedPlan.plan_status ? "error" : "primary"}
                    onClick={() => updatePlan()}>
                    {selectedPlan.plan_status ? "deactivate" : "activate"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmationModal;
