import React, {useState, useEffect} from "react";
import {Typography, Box} from "@mui/material";
import BookingTable from "../../components/display/tables/bookings";

// store
import {useDispatch} from "react-redux";
import {getAllBookings, updateBooking} from "../../store/booking/actions";

import useAuth from "../../lib/hooks/useAuth";

function Booking() {
    const dispatch = useDispatch();
    const user = useAuth();

    const [bookingData, setBookingData] = useState(null);
    const [didUpdate, setDidUpdate] = useState(0);

    const handleAccept = (id) => {
        const payload = {
            _id: id,
            status: "in-progress"
        };
        console.log(payload);
        dispatch(updateBooking(payload, setDidUpdate));
    };

    useEffect(() => {
        if (bookingData === null || didUpdate > 0) {
            dispatch(getAllBookings(user.id, setBookingData));
        }
    }, [didUpdate]);

    return (
        <>
            <Typography variant="h4">Bookings</Typography>
            <Box pt={2}>
                <BookingTable
                    bookingData={bookingData}
                    handleAccept={handleAccept}
                />
            </Box>
        </>
    );
}

export default Booking;
