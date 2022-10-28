import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    TextField,
    Box,
    Button,
    Container
} from "@mui/material";

function AddImage({
    openModal,
    setOpenModal,
    userGallery,
    setUserGallery,
    handleSave
}) {
    const handleInputFile = (e) => {
        const file = e.target.files[0];
        previewFile(file);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setUserGallery({...userGallery, imageStr: reader.result});
        };
    };

    return (
        <Dialog
            open={openModal}
            maxWidth="md"
            onClose={() => {
                setOpenModal(false);
                setUserGallery({
                    imageStr: "",
                    description: ""
                });
            }}>
            <DialogTitle>
                <Typography variant="span">Add image</Typography>
            </DialogTitle>
            <DialogContent>
                <Container>
                    <form>
                        <Button component="label">
                            Upload File
                            <input
                                type="file"
                                hidden
                                onChange={handleInputFile}
                            />
                        </Button>
                    </form>
                    {userGallery.imageStr ? (
                        <Box
                            component="img"
                            sx={{
                                display: "block",
                                height: 233,
                                width: 350,
                                maxHeight: {xs: 233, md: 167},
                                maxWidth: {xs: 350, md: 250},
                                marginBottom: "15px"
                            }}
                            src={userGallery.imageStr}
                        />
                    ) : (
                        ""
                    )}
                    <TextField
                        type="text"
                        fullWidth
                        label="Description"
                        onChange={(e) =>
                            setUserGallery({
                                ...userGallery,
                                description: e.target.value
                            })
                        }
                    />
                    <Box pt={2}>
                        <Button
                            variant="contained"
                            fullWidth
                            onClick={() => handleSave()}>
                            Save
                        </Button>
                    </Box>
                </Container>
            </DialogContent>
        </Dialog>
    );
}

export default AddImage;
