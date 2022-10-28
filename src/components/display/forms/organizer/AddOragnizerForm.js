import React, {useState} from "react";
import {
    TextField,
    Button,
    Grid,
    Container,
    IconButton,
    InputAdornment
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

function AddOragnizerForm({userForm, setUserForm, submitForm}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Container>
            <Grid container spacing={2} pt={2}>
                <Grid item sm={12}>
                    <TextField
                        type="text"
                        label="Email"
                        defaultValue={userForm.email}
                        onChange={(e) =>
                            setUserForm({
                                ...userForm,
                                email: e.target.value
                            })
                        }
                        fullWidth
                    />
                </Grid>
                <Grid item sm={12}>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        label="Password"
                        defaultValue={userForm.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }>
                                        {showPassword ? (
                                            <VisibilityIcon />
                                        ) : (
                                            <VisibilityOffIcon />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                        onChange={(e) =>
                            setUserForm({
                                ...userForm,
                                password: e.target.value
                            })
                        }
                        fullWidth
                    />
                </Grid>
                <Grid item sm={12}>
                    <Button
                        variant="contained"
                        onClick={() => submitForm(userForm)}
                        fullWidth>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AddOragnizerForm;
