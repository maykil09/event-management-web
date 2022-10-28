import React, {useState, useEffect} from "react";
import {Typography, Box, Grid, Button} from "@mui/material";
import EventTable from "../../components/display/tables/event";
import AddEventModal from "../../components/display/modals/event/AddEventModal";

// icon
import AddIcon from "@mui/icons-material/Add";

// store
import {useDispatch} from "react-redux";
import {getUseInfo, createEvent, getAllEvents} from "../../store/event/actions";

// hooks
import useAuth from "../../lib/hooks/useAuth";

function Event() {
    const dispatch = useDispatch();
    const user = useAuth();

    // modal State
    const [openModal, setOpenModal] = useState(false);

    const [plannerData, setPlannerData] = useState(null);

    const [eventForm, setEventForm] = useState({
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

    const [eventHeader, setEventHeader] = useState({
        header: {
            accountId: "",
            name: {
                first: "",
                last: ""
            },
            avatar: "",
            address: {
                name: "",
                coordinates: {
                    latitude: "",
                    longitude: ""
                }
            }
        }
    });

    const handleSubmit = () => {
        // console.log({event: eventForm, header: eventHeader});

        const payload = {event: eventForm.event, header: eventHeader.header};

        dispatch(createEvent(payload, setOpenModal, setEventForm));
    };

    // for tables data
    const [eventData, setEventData] = useState(null);

    useEffect(() => {
        if (eventData === null) {
            dispatch(getAllEvents(setEventData));
        }
    }, []);

    useEffect(() => {
        if (plannerData === null) {
            dispatch(getUseInfo(user.id, setPlannerData));
        } else {
            setEventHeader({
                header: {
                    accountId: user.id,
                    name: plannerData.name,
                    avatar: plannerData.avatar,
                    address: plannerData.address
                }
            });
        }
    }, [plannerData]);

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
                <EventTable eventData={eventData} />
            </Box>
            <AddEventModal
                openModal={openModal}
                setOpenModal={setOpenModal}
                eventForm={eventForm}
                setEventForm={setEventForm}
                handleSubmit={handleSubmit}
            />
        </>
    );
}

export default Event;
