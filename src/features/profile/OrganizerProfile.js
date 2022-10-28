import React, {useState, useEffect} from "react";
import {
    Typography,
    Grid,
    Box,
    Avatar,
    Button,
    TextField,
    Stack,
    CircularProgress,
    IconButton,
    Tooltip
} from "@mui/material";
import {useParams} from "react-router-dom";

import AddLocationIcon from "@mui/icons-material/AddLocation";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddImage from "../../components/display/modals/organizer/AddImage";

// store
import {useDispatch} from "react-redux";
import {
    getOrganizerProfile,
    uploadAvatar,
    uploadGallery,
    updateAddress,
    updateProfileInfo
} from "../../store/organizer/actions";
import {Container} from "@mui/system";

import {STORAGE} from "../../config/constant";
import {AsyncStorage} from "../../lib/helpers/storage";

import Map from "../../components/google/Map";

function OrganizerProfile() {
    const dispatch = useDispatch();
    // get ID from url
    const params = useParams();

    const [userID, setUserID] = useState(null);
    const [userSession, setUserSession] = useState(null);
    const [role, setRole] = useState("super-admin");
    const [isEdit, setIsEdit] = useState(false);
    const [previewSource, setPreviewSource] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [responseData, setResponseData] = useState("");
    const [didUpdate, setDidUpdate] = useState(0);

    // user States
    const [userAvatar, setUserAvatar] = useState(null);
    const [userProfileInfo, setUserProfileInfo] = useState({
        accountId: "",
        name: {
            first: "",
            last: ""
        },
        contact: ""
    });

    // user gallery
    const [openModal, setOpenModal] = useState(false);
    const [userGallery, setUserGallery] = useState({
        imageStr: "",
        description: ""
    });

    // user address
    const [userAddress, setUserAddress] = useState({
        name: "",
        coordinates: {
            latitude: "",
            longitude: ""
        }
    });
    const [mapSaveButton, setMapSaveButton] = useState(true);

    const handleInputFile = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setPreviewSource(reader.result);
            setUserAvatar(reader.result);
        };
    };

    const handleSave = () => {
        console.log("Saving...");
        // console.log(userProfileInfo);
        if (userAvatar !== null) {
            dispatch(uploadAvatar(previewSource, setDidUpdate, setIsEdit));
        }
        if (
            userProfileInfo.name.first !== "" &&
            userProfileInfo.name.last !== "" &&
            userProfileInfo.contact !== ""
        ) {
            dispatch(
                updateProfileInfo(userProfileInfo, setDidUpdate, setIsEdit)
            );
        }
        if (userGallery.imageStr !== "" && userGallery.description !== "") {
            console.log("saving to gallery");
            dispatch(
                uploadGallery(
                    userGallery,
                    setUserGallery,
                    setDidUpdate,
                    setOpenModal
                )
            );
        }
    };

    useEffect(() => {
        if (
            userAddress.name !== "" &&
            userAddress.coordinates.latitude !== "" &&
            userAddress.coordinates.longitude !== ""
        ) {
            setMapSaveButton(false);
        }
    }, [userAddress]);

    const saveAddress = (id) => {
        const payload = {
            accountId: id,
            address: userAddress
        };

        dispatch(
            updateAddress(
                payload,
                setDidUpdate,
                setUserAddress,
                setMapSaveButton
            )
        );
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

    console.log(responseData);
    useEffect(() => {
        if (responseData !== "") {
            if (responseData.message === undefined) {
                setUserProfileInfo({
                    accountId: responseData.accountId._id,
                    name: {
                        first: responseData.name.first,
                        last: responseData.name.last
                    },
                    contact: responseData.contact.number
                });
            }
        }
    }, [responseData]);

    useEffect(() => {
        if (userSession === null) {
            getUserSession();
        }
    }, []);

    useEffect(() => {
        if (userID !== null || didUpdate > 0) {
            fetchProfile();
        }
    }, [userID, didUpdate]);

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
                                        {previewSource ||
                                        responseData.avatar ? (
                                            <Avatar
                                                sx={{width: 56, height: 56}}
                                                src={
                                                    previewSource
                                                        ? previewSource
                                                        : responseData.avatar
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
                                            <Button
                                                variant="contained"
                                                onClick={() => {
                                                    handleSave();
                                                }}>
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
                                                    if (isEdit) {
                                                        setPreviewSource("");
                                                    }
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
                                    </Box>
                                </Box>
                                <TextField
                                    disabled={true}
                                    defaultValue={responseData.accountId.email}
                                    label="Email"
                                    variant="outlined"
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
                                        setUserProfileInfo((prevState) => ({
                                            ...prevState,
                                            name: {
                                                ...prevState.name,
                                                first: e.target.value
                                            }
                                        }));
                                    }}
                                />
                                <TextField
                                    disabled={!isEdit}
                                    defaultValue={responseData.name.last}
                                    label="Last Name"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setUserProfileInfo((prevState) => ({
                                            ...prevState,
                                            name: {
                                                ...prevState.name,
                                                last: e.target.value
                                            }
                                        }));
                                    }}
                                />
                                <TextField
                                    disabled={!isEdit}
                                    defaultValue={responseData.contact.number}
                                    label="Contact Number"
                                    variant="outlined"
                                    onChange={(e) => {
                                        setUserProfileInfo({
                                            ...userProfileInfo,
                                            contact: e.target.value
                                        });
                                    }}
                                />
                            </Stack>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} mt={5}>
                        <Grid item xs={3}>
                            <Typography variant="h6">Address</Typography>
                        </Grid>
                        <Grid item container xs={9} spacing={2}>
                            <Grid item xs={11}>
                                <Typography variant="span">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            fontWeight: "bold"
                                        }}>
                                        Current address:
                                    </Box>
                                    {responseData.address.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                <Tooltip title="Add image">
                                    <IconButton
                                        disabled={mapSaveButton}
                                        color="primary"
                                        onClick={() =>
                                            saveAddress(
                                                responseData.accountId._id
                                            )
                                        }>
                                        <AddLocationIcon fontSize="large" />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            <Grid item xs={12}>
                                <Container>
                                    <Box
                                        sx={{
                                            minHeight: "500px",
                                            minWidth: "500px"
                                        }}>
                                        <Map
                                            userAddress={responseData.address}
                                            setUserAddress={setUserAddress}
                                        />
                                    </Box>
                                </Container>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} mt={5}>
                        <Grid item xs={3}>
                            <Typography variant="h6">Gallery</Typography>
                        </Grid>
                        <Grid item container xs={9} spacing={2}>
                            <Grid item xs={12}>
                                <Tooltip title="Add image">
                                    <IconButton
                                        color="primary"
                                        onClick={() => setOpenModal(true)}>
                                        <AddPhotoAlternateIcon />
                                    </IconButton>
                                </Tooltip>
                            </Grid>
                            {responseData.gallery.length !== 0
                                ? responseData.gallery.map((img) => {
                                      return (
                                          <Grid
                                              item
                                              xs={4}
                                              key={img.id}
                                              spacing={2}>
                                              <Box
                                                  component="img"
                                                  sx={{
                                                      height: 233,
                                                      width: 350,
                                                      maxHeight: {
                                                          xs: 233,
                                                          md: 167
                                                      },
                                                      maxWidth: {
                                                          xs: 350,
                                                          md: 250
                                                      }
                                                  }}
                                                  src={img.url}
                                              />
                                          </Grid>
                                      );
                                  })
                                : ""}
                        </Grid>
                        <AddImage
                            openModal={openModal}
                            setOpenModal={setOpenModal}
                            userGallery={userGallery}
                            setUserGallery={setUserGallery}
                            handleSave={handleSave}
                        />
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export default OrganizerProfile;
