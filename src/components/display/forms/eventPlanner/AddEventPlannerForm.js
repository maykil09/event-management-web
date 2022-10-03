import React from "react";
import {TextField, Button, Grid, Container} from "@mui/material";

function AddEventPlannerForm() {
    return (
        <form>
            <Container>
                <Grid container spacing={2} pt={2}>
                    <Grid item sm={12}>
                        <TextField type="text" label="First name" fullWidth />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField type="text" label="Last name" fullWidth />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField type="text" label="Address" fullWidth />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField type="text" label="Email" fullWidth />
                    </Grid>
                    <Grid item sm={12}>
                        <TextField
                            type="number"
                            label="Contact number"
                            fullWidth
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <Button variant="contained" fullWidth>
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </form>
    );
}

export default AddEventPlannerForm;
