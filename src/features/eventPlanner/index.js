import React, {useState, useEffect} from "react";
import {Typography, Box, Grid, Button} from "@mui/material";
import EventPlannerTable from "../../components/display/tables/eventPlanner";
import AddEventPlannerForm from "../../components/display/forms/eventPlanner/AddEventPlannerForm";
import AddEventPlannerModal from "../../components/display/modals/eventPlanner/AddEventPlannerModal";
import ConfirmationModal from "../../components/display/modals/organizer/ConfirmationModal";

import AddIcon from "@mui/icons-material/Add";

// store
import {useDispatch} from "react-redux";
import {
    getAllEventPlanner,
    activateEventPlannerAccount,
    createPlannerAccount
} from "../../store/planner/actions";

// toast
import {toast} from "react-toastify";

function EventPlanner() {
    const dispatch = useDispatch();

    const [userForm, setUserForm] = useState({
        email: "",
        password: "Secret",
        role: "planner"
    });

    // state
    // modal State
    const [openModal, setOpenModal] = useState(false);
    const [openConfModal, setOpenConfModal] = useState(false);

    //
    const [eventPlannerData, setEventPlannerData] = useState(null);
    const [selectedPlanner, setSelectedPlanner] = useState("");
    const [didUpdate, setDidUpdate] = useState(0);

    const selectPlanner = (id) => {
        const newArr = eventPlannerData.filter((data) => {
            return data._id === id;
        });
        setSelectedPlanner(newArr[0]);
        setOpenConfModal(true);
    };

    const activateAccount = () => {
        console.log(selectedPlanner._id);
        dispatch(
            activateEventPlannerAccount(
                selectedPlanner._id,
                setSelectedPlanner,
                setDidUpdate,
                setOpenConfModal
            )
        );
    };

    const submitForm = () => {
        var validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (userForm.email !== "" && userForm.password !== "") {
            if (userForm.email.match(validRegex)) {
                toast.success("Save account");
                dispatch(
                    createPlannerAccount(
                        userForm,
                        setUserForm,
                        setOpenModal,
                        setDidUpdate
                    )
                );
            } else {
                toast.error("Invalid email");
            }
        } else {
            toast.error("Please fill up all fields");
        }
    };

    useEffect(() => {
        if (eventPlannerData === null || didUpdate > 0) {
            dispatch(getAllEventPlanner(setEventPlannerData));
        }
    }, [didUpdate]);

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
                <EventPlannerTable
                    eventPlannerData={eventPlannerData}
                    selectPlanner={selectPlanner}
                />
            </Box>
            <AddEventPlannerModal
                openModal={openModal}
                setOpenModal={setOpenModal}>
                <AddEventPlannerForm
                    userForm={userForm}
                    setUserForm={setUserForm}
                    submitForm={submitForm}
                />
            </AddEventPlannerModal>
            <ConfirmationModal
                openModal={openConfModal}
                setOpenModal={setOpenConfModal}
                selected={selectedPlanner}
                setSelected={setSelectedPlanner}
                activateAccount={activateAccount}
            />
        </>
    );
}

export default EventPlanner;
