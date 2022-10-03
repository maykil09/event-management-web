import React, {useState} from "react";
import {Typography, Box, Grid, Button} from "@mui/material";
import EventPlannerTable from "../../components/display/tables/eventPlanner";
import AddEventPlannerForm from "../../components/display/forms/eventPlanner/AddEventPlannerForm";
import AddEventPlannerModal from "../../components/display/modals/eventPlanner/AddEventPlannerModal";

import AddIcon from "@mui/icons-material/Add";

function EventPlanner() {
    // Modal state
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">Event Planner</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="baseline">
                        <Button
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => setOpenModal(true)}>
                            Create
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Box pt={2}>
                <EventPlannerTable />
            </Box>
            <AddEventPlannerModal
                openModal={openModal}
                setOpenModal={setOpenModal}>
                <AddEventPlannerForm />
            </AddEventPlannerModal>
        </>
    );
}

export default EventPlanner;
