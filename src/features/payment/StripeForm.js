import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

import {
    Container,
    Grid,
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Button
} from "@mui/material";

import {AsyncStorage} from "../../lib/helpers/storage";

function StripeForm({amount, plan_id}) {
    const makePayment = async (token) => {
        const payload = {
            token,
            amount,
            plan_id
        };

        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await AsyncStorage.getItem(token)}`
        };

        const res = await axios.post(
            "http://localhost:5000/api/subscription",
            payload,
            headers
        );

        console.log(res);
    };

    return (
        <Container
            maxWidth="md"
            sx={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Card>
                <CardContent>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <Typography variant="h6">
                            Click paynow to start your subscription
                        </Typography>
                    </Box>
                </CardContent>
                <CardActions
                    sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>
                    <StripeCheckout
                        stripeKey={process.env.REACT_APP_STRIPE_PUB_KEY}
                        token={makePayment}
                        name="Buy Subscription"
                        amount={amount * 100}>
                        <Button fullWidth variant="contained">
                            Paynow
                        </Button>
                    </StripeCheckout>
                </CardActions>
            </Card>
        </Container>
    );
}

export default StripeForm;
