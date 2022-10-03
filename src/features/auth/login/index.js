import React, {useState} from "react";
import {Box, Typography, Avatar, Button, TextField} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {useNavigate} from "react-router-dom";

import {toast} from "react-toastify";

// store
import {useDispatch} from "react-redux";
import {login} from "../../../store/auth/actions";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: null,
        password: null
    });

    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
        // const payload = {
        //     email: "super-admin@gmail.com",
        //     password: "Secret"
        // };

        if (credentials.email !== null && credentials.password !== null) {
            console.log(credentials);
            dispatch(login(credentials, navigate));
        } else {
            toast.error("Fill up all field");
        }
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
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            email: e.target.value
                        })
                    }
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
                    onChange={(e) =>
                        setCredentials({
                            ...credentials,
                            password: e.target.value
                        })
                    }
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
