import React from "react";
import {Box, Typography, Avatar, Button, TextField} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useNavigate} from "react-router-dom";

// store
import {useDispatch} from "react-redux";
import {login} from "../../../store/auth/actions";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onSubmit = async () => {
        const payload = {
            email: "super-admin@gmail.com",
            password: "Secret"
        };

        console.log(payload);

        dispatch(login(payload, navigate));
    };

    return (
        <Box
            sx={{
                marginTop: 8,
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
            <Avatar sx={{m: 1, bgcolor: "secondary.main"}}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Login
            </Typography>
            <Box component="form" noValidate sx={{mt: 1}}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    onClick={() => {
                        onSubmit();
                    }}
                    fullWidth
                    variant="contained"
                    sx={{mt: 3, mb: 2}}>
                    Sign In
                </Button>
            </Box>
        </Box>
    );
}

export default Login;
