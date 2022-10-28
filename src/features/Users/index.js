import React, {useState, useEffect} from "react";
import {Typography, Box} from "@mui/material";
import UserTable from "../../components/display/tables/users";

// store
import {useDispatch} from "react-redux";
import {getAllCustomer} from "../../store/customer/actions";

function Users() {
    const dispatch = useDispatch();
    const [customerData, setCustomerData] = useState(null);

    useEffect(() => {
        if (customerData === null) {
            dispatch(getAllCustomer(setCustomerData));
        }
    }, []);

    console.log(customerData);

    return (
        <>
            <Typography variant="h4">Users</Typography>
            <Box pt={2}>
                <UserTable customerData={customerData} />
            </Box>
        </>
    );
}

export default Users;
