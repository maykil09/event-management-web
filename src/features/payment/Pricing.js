import React from "react";
import {
    Container,
    Grid,
    Box,
    Typography,
    Card,
    CardHeader,
    CardContent,
    CardActions
} from "@mui/material";
import {grey, lightBlue} from "@mui/material/colors";
import StripeButton from "./StripeButton";

function Pricing() {
    return (
        <Container
            maxWidth="md"
            sx={{
                paddingTop: "10px", // add padding if more than 6
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh" // add 100vh if less 6
            }}>
            <Grid container spacing={5} alignItems="flex-end">
                <Grid item xs={12} md={4}>
                    <PriceCard
                        title={"Standard"}
                        description={"Standard Promo"}
                        price={"500"}
                        plan_id={"6343fdf4e8cfbdf2c24a0cd3"}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <PriceCard
                        title={"Standard"}
                        description={"Standard Promo"}
                        price={"500"}
                        plan_id={"6343fdf4e8cfbdf2c24a0cd3"}
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <PriceCard
                        title={"Standard"}
                        description={"Standard Promo"}
                        price={"500"}
                        plan_id={"6343fdf4e8cfbdf2c24a0cd3"}
                    />
                </Grid>
            </Grid>
        </Container>
    );
}

const PriceCard = ({title, description, price, plan_id}) => {
    return (
        <Card>
            <CardHeader
                title={title}
                subheader={""}
                titleTypographyProps={{
                    align: "center",
                    color: lightBlue[600],
                    fontWeight: "bold"
                }}
                subheaderTypographyProps={{
                    align: "center"
                }}
                sx={{
                    backgroundColor: grey[300]
                }}
            />
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2
                    }}>
                    <Typography
                        component="h4"
                        variant="h3"
                        color="text.primary">
                        ${price}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                        /mo
                    </Typography>
                </Box>
                <Typography variant="subtitle1" align="center">
                    {description}
                </Typography>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}>
                <StripeButton
                    amount={price}
                    plan_id={plan_id}
                    plan_title={title}
                />
            </CardActions>
        </Card>
    );
};

export default Pricing;
