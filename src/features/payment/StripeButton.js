import React, {useState, useEffect} from "react";
import StripeCheckout from "react-stripe-checkout";
import {Button} from "@mui/material";
import axios from "../../config/axios";

import {AsyncStorage} from "../../lib/helpers/storage";
import {URL} from "../../config/api";

// store
import {useDispatch} from "react-redux";

function StripeButton({amount, plan_id, plan_title}) {
    const dispatch = useDispatch();

    const [BearerToken, setBearerToken] = useState("");

    const makePayment = async (token) => {
        const payload = {
            token,
            amount,
            plan_id
        };

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNjMzOTk2NzU2YjdmZDU4OTFhYzQyYWQ5IiwiaWF0IjoxNjY1OTE0MTk1LCJleHAiOjE2NjY1MTg5OTV9.YHgGwbex6MDY3JOfwTwntAvD02KFNHYMMYynnvAZe4w`
        };

        console.log(headers);

        const res = await axios.post(URL.API.subscription, payload, {headers});

        console.log(res);
    };

    const getBearerToken = async () => {
        const token = await AsyncStorage.getItem("token");
        setBearerToken(token);
    };

    useEffect(() => {
        getBearerToken();
    }, []);

    return (
        <StripeCheckout
            stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
            token={makePayment}
            name={`Buy ${plan_title} Subscription`}
            amount={amount * 100}>
            <Button fullWidth variant="contained">
                Paynow
            </Button>
        </StripeCheckout>
    );
}

export default StripeButton;
