import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    TextField,
    Button,
    Grid,
    Container,
    FormGroup,
    FormControlLabel,
    Switch
} from "@mui/material";

function AddPlanModal({
    planForm,
    setPlanForm,
    openModal,
    setOpenModal,
    submitForm
}) {
    return (
        <Dialog
            open={openModal}
            maxWidth="sm"
            onClose={() => {
                setPlanForm({
                    plan_name: "",
                    price_per_month: "",
                    plan_description: "",
                    plan_status: false
                });
                setOpenModal(false);
            }}>
            <DialogTitle>
                <Typography variant="span">Add Plan</Typography>
            </DialogTitle>
            <DialogContent>
                <Container>
                    <Grid container spacing={2} pt={2}>
                        <Grid item sm={12}>
                            <TextField
                                type="text"
                                label="Plan Name"
                                defaultValue={planForm.plan_name}
                                onChange={(e) =>
                                    setPlanForm({
                                        ...planForm,
                                        plan_name: e.target.value
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                type="text"
                                label="Description"
                                defaultValue={planForm.plan_description}
                                onChange={(e) =>
                                    setPlanForm({
                                        ...planForm,
                                        plan_description: e.target.value
                                    })
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                type="text"
                                label="Plan price per month"
                                inputProps={{type: "number"}}
                                defaultValue={planForm.price_per_month}
                                onChange={(e) =>
                                    setPlanForm({
                                        ...planForm,
                                        price_per_month: e.target.value
                                    })
                                }
                                fullWidth
                            />
                        </Grid>

                        <Grid item sm={12}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={planForm.plan_status}
                                            onChange={() =>
                                                setPlanForm({
                                                    ...planForm,
                                                    plan_status:
                                                        !planForm.plan_status
                                                })
                                            }
                                        />
                                    }
                                    labelPlacement="start"
                                    label="Status"
                                />
                            </FormGroup>
                        </Grid>
                        <Grid item sm={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => submitForm()}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </DialogContent>
        </Dialog>
    );
}

export default AddPlanModal;
