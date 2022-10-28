import React, {useState, useEffect} from "react";
import PlanTable from "../../components/display/tables/plan";
import {Typography, Box, Grid, Button} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Modal
import ConfirmationModal from "../../components/display/modals/plan/ConfirmationModal";
import AddPlanModal from "../../components/display/modals/plan/AddPlanModal";

//store
import {useDispatch} from "react-redux";
import {
    getAllPlans,
    updatePlanStatus,
    createPlan
} from "../../store/plan/actions";

// toast
import {toast} from "react-toastify";

function Plan() {
    const dispatch = useDispatch();

    // modal state
    const [openModal, setOpenModal] = useState(false);
    const [openConfModal, setOpenConfModal] = useState(false);

    const [planForm, setPlanForm] = useState({
        plan_name: "",
        price_per_month: "",
        plan_description: "",
        plan_status: false
    });
    const [planData, setPlanData] = useState(null);

    const [selectedPlan, setSelectedPlan] = useState("");
    const [didUpdate, setDidUpdate] = useState(0);

    const selectPlan = (id) => {
        const newObj = planData.filter((data) => {
            return (data._id = id);
        });
        setSelectedPlan(newObj[0]);

        setOpenConfModal(true);
    };

    const submitForm = () => {
        if (
            planForm.plan_name !== "" &&
            planForm.price_per_month !== "" &&
            planForm.plan_description !== ""
        ) {
            dispatch(createPlan(planForm, setDidUpdate, setOpenModal));
        } else {
            toast.error("Please fill up all fields");
        }
    };

    const updatePlan = () => {
        console.log("activate Plan");
        const payload = {
            id: selectedPlan._id,
            status: selectedPlan.plan_status
        };

        console.log(payload);
        dispatch(updatePlanStatus(payload, setDidUpdate, setOpenConfModal));
    };

    useEffect(() => {
        if (planData === null || didUpdate > 0) {
            console.log("fething");
            dispatch(getAllPlans(setPlanData));
        }
    }, [didUpdate]);

    return (
        <>
            <Grid container justifyContent="space-between">
                <Grid item xs={12} sm={6}>
                    <Typography variant="h4">Plans</Typography>
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
                <PlanTable planData={planData} selectPlan={selectPlan} />
            </Box>
            <AddPlanModal
                planForm={planForm}
                setPlanForm={setPlanForm}
                openModal={openModal}
                setOpenModal={setOpenModal}
                submitForm={submitForm}
            />
            <ConfirmationModal
                openModal={openConfModal}
                setOpenModal={setOpenConfModal}
                selectedPlan={selectedPlan}
                updatePlan={updatePlan}
            />
        </>
    );
}

export default Plan;
