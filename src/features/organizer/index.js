import React, {useState} from "react";
import {Typography, Box, Grid, Button} from "@mui/material";
import OrganizerTable from "../../components/display/tables/organizers";
import AddIcon from "@mui/icons-material/Add";

import AddOrganizerModal from "../../components/display/modals/organizer/AddOrganizerModal";
import AddOragnizerForm from "../../components/display/forms/organizer/AddOragnizerForm";

function Organizer() {
    // Modal state
    const [openModal, setOpenModal] = useState(false);
    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">Organizers</Typography>
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
                <OrganizerTable />
            </Box>

            <AddOrganizerModal
                openModal={openModal}
                setOpenModal={setOpenModal}>
                <AddOragnizerForm />
            </AddOrganizerModal>
        </>
    );
}

export default Organizer;
