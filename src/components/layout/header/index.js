import React, {useState} from "react";
// Mui components
import {
    Typography,
    AppBar,
    Toolbar,
    styled,
    IconButton,
    Menu,
    MenuItem
} from "@mui/material";

// Icons
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import {useNavigate} from "react-router-dom";

const StyleToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
});

function Header() {
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const openMenu = () => {
        setAnchorEl(true);
    };

    const closeMenu = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="static">
                <StyleToolbar>
                    <Typography
                        variant="h6"
                        sx={{display: {xs: "none", sm: "block"}}}>
                        Event System
                    </Typography>
                    <CalendarMonthIcon
                        sx={{display: {xs: "block", sm: "none"}}}
                    />
                    <IconButton
                        size="large"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={openMenu}
                        color="inherit">
                        <AccountCircleIcon />
                    </IconButton>
                    <Menu
                        sx={{mt: "45px"}}
                        id="menu-appbar"
                        anchorEl={anchorEl}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right"
                        }}
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}>
                        <MenuItem onClick={closeMenu}>Profile</MenuItem>
                        <MenuItem
                            onClick={() => {
                                setAnchorEl(null);
                                navigate("/");
                            }}>
                            Logout
                        </MenuItem>
                    </Menu>
                </StyleToolbar>
            </AppBar>
        </>
    );
}

export default Header;
