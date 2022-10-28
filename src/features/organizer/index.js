import React, {useState, useEffect} from "react";
import {
    Typography,
    Box,
    Grid,
    Button,
    Experimental_CssVarsProvider
} from "@mui/material";
import OrganizerTable from "../../components/display/tables/organizers";
import AddIcon from "@mui/icons-material/Add";

import AddOrganizerModal from "../../components/display/modals/organizer/AddOrganizerModal";
import AddOragnizerForm from "../../components/display/forms/organizer/AddOragnizerForm";

import ConfirmationModal from "../../components/display/modals/organizer/ConfirmationModal";

// store
import {useDispatch} from "react-redux";
import {
    getAllOrganizer,
    activateOrganizerAccount,
    createOraganizerAccount
} from "../../store/organizer/actions";

// toast
import {toast} from "react-toastify";

function Organizer() {
    const dispatch = useDispatch();

    const [userForm, setUserForm] = useState({
        email: "",
        password: "Secret",
        role: "organizer"
    });

    // Modal state
    // add modal state
    const [openModal, setOpenModal] = useState(false);

    const [openConfModal, setOpenConfModal] = useState(false);

    const [organizerData, setOrganizerData] = useState(null);
    const [selectedOrg, setSelectedOrg] = useState("");
    const [didUpdate, setDidUpdate] = useState(0);

    const selectOrganizer = (id) => {
        const newObj = organizerData.filter((data) => {
            return data._id === id;
        });

        setSelectedOrg(newObj[0]);

        setOpenConfModal(true);
    };

    const submitForm = () => {
        console.log(userForm);
        var validRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (userForm.email !== "" && userForm.password !== "") {
            if (userForm.email.match(validRegex)) {
                // toast.success("Save account");
                dispatch(
                    createOraganizerAccount(
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

    const activateAccount = () => {
        console.log("activate account");
        dispatch(
            activateOrganizerAccount(
                selectedOrg._id,
                setSelectedOrg,
                setOpenConfModal,
                setDidUpdate
            )
        );
    };

    useEffect(() => {
        if (organizerData === null || didUpdate > 0) {
            dispatch(getAllOrganizer(setOrganizerData));
        }
    }, [didUpdate]);

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
                <OrganizerTable
                    organizerData={organizerData}
                    selectOrganizer={selectOrganizer}
                />
            </Box>

            <AddOrganizerModal
                openModal={openModal}
                setOpenModal={setOpenModal}>
                <AddOragnizerForm
                    userForm={userForm}
                    setUserForm={setUserForm}
                    submitForm={submitForm}
                />
            </AddOrganizerModal>

            <ConfirmationModal
                openModal={openConfModal}
                setOpenModal={setOpenConfModal}
                selected={selectedOrg}
                setSelected={setSelectedOrg}
                activateAccount={activateAccount}
            />
        </>
    );
}

export default Organizer;
