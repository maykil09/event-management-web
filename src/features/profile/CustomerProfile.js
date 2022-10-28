import React, {useState, useEffect} from "react";
import {
    Typography,
    Grid,
    Box,
    Avatar,
    Button,
    TextField,
    Stack,
    CircularProgress
} from "@mui/material";
import {useParams} from "react-router-dom";

// store
import {useDispatch} from "react-redux";
import {getOrganizerProfile} from "../../store/organizer/actions";
import {Container} from "@mui/system";

import {STORAGE} from "../../config/constant";
import {AsyncStorage} from "../../lib/helpers/storage";

function CustomerProfile() {
    const dispatch = useDispatch();
    // get ID from url
    const params = useParams();

    console.log(params.id);
    const [userID, setUserID] = useState(null);
    const [userSession, setUserSession] = useState(null);
    const [role, setRole] = useState("super-admin");
    const [isEdit, setIsEdit] = useState(false);
    const [previewSource, setPreviewSource] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [responseData, setResponseData] = useState("");
    const [userAvatar, setUserAvatar] = useState();
    const [userProfile, setUserProfile] = useState({
        avatar: "",
        firstname: "Michael",
        lastname: "Guilaran",
        contactNumber: "09676641244",
        email: "test@gmail.com",
        address: {
            name: "Manila"
        }
    });

    const handleInputFile = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const fetchProfile = () => {
        dispatch(getOrganizerProfile(userID, setResponseData, setIsLoading));
    };

    const getUserSession = async () => {
        await AsyncStorage.getItem(STORAGE.SESSION).then((session) => {
            setUserSession(JSON.parse(session));
            setRole(JSON.parse(session).role);
        });
    };

    useEffect(() => {
        if (userSession === null) {
            getUserSession();
        }
    }, []);

    useEffect(() => {
        if (userID !== null) {
            fetchProfile();
        }
    }, [userID]);

    useEffect(() => {
        if (params.id) {
            setUserID(params.id);
        } else {
            if (userSession !== null) {
                setUserID(userSession.id);
            }
        }
    }, [userSession]);

    return (
        <>
            {isLoading ? (
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "80vh"
                    }}>
                    <Typography variant="h6" mb={2}>
                        Fechting Organizer profile
                    </Typography>
                    <CircularProgress size={"8rem"} />
                </Container>
            ) : !isLoading && responseData.message !== undefined ? (
                <Container
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "80vh"
                    }}>
                    <Typography variant="h6">{responseData.message}</Typography>
                </Container>
            ) : (
                <Grid container mt={2}>
                    <Grid item container xs={12}>
                        <Grid item xs={3}>
                            <Typography variant="h6">
                                Account Details
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Stack spacing={2}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between"
                                    }}>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}>
                                        {previewSource || userProfile.avatar ? (
                                            <Avatar
                                                sx={{width: 56, height: 56}}
                                                src={
                                                    previewSource
                                                        ? previewSource
                                                        : userProfile.avatar
                                                }
                                            />
                                        ) : (
                                            <Avatar
                                                sx={{width: 56, height: 56}}
                                                src>
                                                {
                                                    Array.from(
                                                        responseData.name.first
                                                    )[0]
                                                }
                                            </Avatar>
                                        )}
                                        {role !== "super-admin" ? (
                                            <form style={{marginLeft: "20px"}}>
                                                <Button
                                                    disabled={!isEdit}
                                                    component="label">
                                                    Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={
                                                            handleInputFile
                                                        }
                                                    />
                                                </Button>
                                            </form>
                                        ) : params.id === undefined ? (
                                            <form style={{marginLeft: "20px"}}>
                                                <Button
                                                    disabled={!isEdit}
                                                    component="label">
                                                    Upload File
                                                    <input
                                                        type="file"
                                                        hidden
                                                        onChange={
                                                            handleInputFile
                                                        }
                                                    />
                                                </Button>
                                            </form>
                                        ) : (
                                            ""
                                        )}
                                    </Box>
                                    <Box>
                                        {isEdit ? (
                                            <Button variant="contained">
                                                Save
                                            </Button>
                                        ) : (
                                            ""
                                        )}
                                        {role !== "super-admin" ? (
                                            <Button
                                                sx={{
                                                    marginLeft: "10px"
                                                }}
                                                variant="contained"
                                                color={
                                                    isEdit ? "error" : "primary"
                                                }
                                                onClick={() => {
                                                    setIsEdit(!isEdit);
                                                }}>
                                                {isEdit ? "Cancel" : "Edit"}
                                            </Button>
                                        ) : params.id === undefined ? (
                                            <Button
                                                sx={{
                                                    marginLeft: "10px"
                                                }}
                                                variant="contained"
                                                color={
                                                    isEdit ? "error" : "primary"
                                                }
                                                onClick={() => {
                                                    setIsEdit(!isEdit);
                                                }}>
                                                {isEdit ? "Cancel" : "Edit"}
                                            </Button>
                                        ) : (
                                            ""
                                        )}

                                        <Button
                                            variant="contained"
                                            color="success">
                                            Approve
                                        </Button>
                                    </Box>
                                </Box>
                                <TextField
                                    disabled={!isEdit}
                                    defaultValue={responseData.accountId.email}
                                    label="Email"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setUserProfile({
                                            ...userProfile,
                                            email: e.target.value
                                        });
                                    }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} mt={5}>
                        <Grid item xs={3}>
                            <Typography variant="h6">
                                Personal Information
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Stack spacing={2}>
                                <TextField
                                    disabled={!isEdit}
                                    defaultValue={responseData.name.first}
                                    label="First Name"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setUserProfile({
                                            ...userProfile,
                                            firstname: e.target.value
                                        });
                                    }}
                                />
                                <TextField
                                    disabled={!isEdit}
                                    defaultValue={responseData.name.last}
                                    label="Last Name"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setUserProfile({
                                            ...userProfile,
                                            lastname: e.target.value
                                        });
                                    }}
                                />
                                <TextField
                                    disabled={!isEdit}
                                    defaultValue={responseData.contact.number}
                                    label="Contact Number"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setUserProfile({
                                            ...userProfile,
                                            contactNumber: e.target.value
                                        });
                                    }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} mt={5}>
                        <Grid item xs={3}>
                            <Typography variant="h6">Requirements</Typography>
                        </Grid>
                        <Grid item container xs={9} spacing={2}>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                            <Grid item xs={2}>
                                <Box
                                    sx={{
                                        backgroundColor: "black",
                                        height: "100px",
                                        width: "100px"
                                    }}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default CustomerProfile;
