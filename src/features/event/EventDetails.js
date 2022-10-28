import React, {useState, useEffect} from "react";

import {useLocation, Navigate} from "react-router-dom";

import {
    Container,
    Typography,
    Box,
    Grid,
    Button,
    TextField,
    Tooltip
} from "@mui/material";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

function EventDetails() {
    const location = useLocation();
    const [eventDetails, setEventDetails] = useState(null);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        if (eventDetails === null && location.state !== null) {
            setEventDetails(location.state.event);
        }
    }, []);

    const handleInputFile = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            console.log(reader.result);
        };
    };

    if (location.state === null) {
        return <Navigate to="/events" replace={true} />;
    }

    return (
        <Container>
            <Grid container>
                <Grid item sm={10}>
                    <Typography variant="h4">Event Details</Typography>
                </Grid>
                <Grid item sm={2}>
                    <Box sx={{diplay: "flex"}}>
                        <Button
                            style={{marginRight: "5px"}}
                            variant="contained"
                            color={isEdit ? "error" : "primary"}
                            onClick={() => setIsEdit(!isEdit)}>
                            {isEdit ? "Cancel" : "Edit"}
                        </Button>
                        {isEdit ? (
                            <Button variant="contained">Save</Button>
                        ) : null}
                    </Box>
                </Grid>
                <Grid container item sm={12} mt={5}>
                    <Grid item sm={3}>
                        <Typography variant="h6">Event</Typography>
                    </Grid>
                    <Grid container item sm={9} spacing={2}>
                        <Grid item sm={12}>
                            {eventDetails !== null ? (
                                <TextField
                                    disabled={!isEdit}
                                    label="Title"
                                    defaultValue={eventDetails?.event.title}
                                    fullWidth
                                />
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid item sm={12}>
                            {eventDetails !== null ? (
                                <TextField
                                    disabled={!isEdit}
                                    label="Details"
                                    multiline={true}
                                    rows={5}
                                    defaultValue={eventDetails?.event.title}
                                    fullWidth
                                />
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid container item sm={12} spacing={2}>
                            {eventDetails !== null ? (
                                <>
                                    <Grid item sm={6}>
                                        <TextField
                                            disabled={!isEdit}
                                            helperText="Starting price"
                                            label="From"
                                            type="number"
                                            defaultValue={
                                                eventDetails.event.price.from
                                            }
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item sm={6}>
                                        <TextField
                                            disabled={!isEdit}
                                            helperText="Maximum price"
                                            label="To"
                                            type="number"
                                            defaultValue={
                                                eventDetails.event.price.to
                                            }
                                            fullWidth
                                        />
                                    </Grid>
                                </>
                            ) : (
                                ""
                            )}
                        </Grid>
                        <Grid container item sm={12}>
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
                                                disabled={!isEdit}
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
                                <Grid item sm={1}></Grid>
                            </Grid>
                            <Grid container item sm={12}>
                                {eventDetails !== null
                                    ? eventDetails.event.images.length !== 0
                                        ? eventDetails.event.images.map(
                                              (image, i) => {
                                                  return (
                                                      <Grid item sm={6} key={i}>
                                                          <Box
                                                              component="img"
                                                              sx={{
                                                                  display:
                                                                      "block",
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
                                                                  marginBottom:
                                                                      "15px"
                                                              }}
                                                              src={image}
                                                          />
                                                      </Grid>
                                                  );
                                              }
                                          )
                                        : null
                                    : ""}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
}

export default EventDetails;
