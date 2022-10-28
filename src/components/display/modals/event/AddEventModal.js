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
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Box,
    Tooltip
} from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import {eventTypes} from "../../../../config/constant";

function AddEventModal({
    openModal,
    setOpenModal,
    eventForm,
    setEventForm,
    handleSubmit
}) {
    const handleInputFile = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setEventForm((prevState) => ({
                ...prevState,
                event: {
                    ...prevState.event,
                    images: [...prevState.event.images, reader.result]
                }
            }));
        };
    };
    return (
        <Dialog
            open={openModal}
            maxWidth="sm"
            onClose={() => {
                setEventForm({
                    event: {
                        title: "",
                        details: "",
                        price: {
                            from: "",
                            to: ""
                        },
                        type: ""
                    }
                });
                setOpenModal(false);
            }}>
            <DialogTitle>
                <Typography variant="span">Add Event</Typography>
            </DialogTitle>
            <DialogContent>
                <Container>
                    <Grid container spacing={2} pt={2}>
                        <Grid item sm={12}>
                            <TextField
                                type="text"
                                label="Event Title"
                                defaultValue={eventForm.event.title}
                                onChange={(e) =>
                                    setEventForm((prevState) => ({
                                        ...prevState,
                                        event: {
                                            ...prevState.event,
                                            title: e.target.value
                                        }
                                    }))
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid item sm={12}>
                            <TextField
                                label="Event Details"
                                type="text"
                                defaultValue={eventForm.event.details}
                                multiline={true}
                                rows={5}
                                onChange={(e) =>
                                    setEventForm((prevState) => ({
                                        ...prevState,
                                        event: {
                                            ...prevState.event,
                                            details: e.target.value
                                        }
                                    }))
                                }
                                fullWidth
                            />
                        </Grid>
                        <Grid container item sm={12} spacing={1}>
                            <Grid item sm={6}>
                                <TextField
                                    helperText="Starting price"
                                    label="From"
                                    type="number"
                                    defaultValue={eventForm.event.price.from}
                                    onChange={(e) =>
                                        setEventForm((prevState) => ({
                                            ...prevState,
                                            event: {
                                                ...prevState.event,
                                                price: {
                                                    ...prevState.event.price,
                                                    from: e.target.value
                                                }
                                            }
                                        }))
                                    }
                                    fullWidth
                                />
                            </Grid>
                            <Grid item sm={6}>
                                <TextField
                                    helperText="Maximum price"
                                    label="To"
                                    type="number"
                                    defaultValue={eventForm.event.price.to}
                                    onChange={(e) =>
                                        setEventForm((prevState) => ({
                                            ...prevState,
                                            event: {
                                                ...prevState.event,
                                                price: {
                                                    ...prevState.event.price,
                                                    to: e.target.value
                                                }
                                            }
                                        }))
                                    }
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                        <Grid item sm={12}>
                            <FormControl fullWidth>
                                <InputLabel>Event Type</InputLabel>
                                <Select
                                    label="Event Type"
                                    defaultValue={eventForm.event.type}
                                    onChange={(e) =>
                                        setEventForm((prevState) => ({
                                            ...prevState,
                                            event: {
                                                ...prevState.event,
                                                type: e.target.value
                                            }
                                        }))
                                    }>
                                    {eventTypes.map((event, i) => {
                                        return (
                                            <MenuItem
                                                key={i}
                                                value={event.value}>
                                                {event.displayName}
                                            </MenuItem>
                                        );
                                    })}
                                </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid container item sm={12}>
                            <Grid container item sm={12}>
                                <Grid item sm={11}>
                                    <Box
                                        mb={2}
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center"
                                        }}>
                                        <form>
                                            <Button
                                                disabled={
                                                    eventForm.event.images
                                                        .length === 5
                                                        ? true
                                                        : false
                                                }
                                                component="label">
                                                Upload File
                                                <input
                                                    type="file"
                                                    hidden
                                                    onChange={handleInputFile}
                                                />
                                            </Button>
                                        </form>
                                        <Tooltip title="Upload 5 images">
                                            <ErrorOutlineIcon />
                                        </Tooltip>
                                    </Box>
                                </Grid>
                                <Grid item sm={1}>
                                    <Box
                                        mb={2}
                                        sx={{
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center"
                                        }}>
                                        {eventForm.event.images.length === 5 ? (
                                            <CheckCircleOutlineIcon color="success" />
                                        ) : (
                                            ""
                                        )}
                                    </Box>
                                </Grid>
                            </Grid>
                            <Grid container item sm={12}>
                                {eventForm.event.images.length !== 0
                                    ? eventForm.event.images.map((image, i) => {
                                          return (
                                              <Grid item sm={6} key={i}>
                                                  <Box
                                                      component="img"
                                                      sx={{
                                                          display: "block",
                                                          height: 233,
                                                          width: 350,
                                                          maxHeight: {
                                                              xs: 233,
                                                              md: 167
                                                          },
                                                          maxWidth: {
                                                              xs: 350,
                                                              md: 250
                                                          },
                                                          marginBottom: "15px"
                                                      }}
                                                      src={image}
                                                  />
                                              </Grid>
                                          );
                                      })
                                    : null}
                            </Grid>
                        </Grid> */}
                        <Grid item sm={12}>
                            <Button
                                variant="contained"
                                fullWidth
                                onClick={() => handleSubmit()}>
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </DialogContent>
        </Dialog>
    );
}

export default AddEventModal;
