import React from "react";

import {
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from "@mui/material";

import {Link} from "react-router-dom";

function SideItem({Icon, name, path}) {
    return (
        <Link to={path} style={{textDecoration: "none", color: "black"}}>
            <ListItem disablePadding>
                <ListItemButton>
                    <ListItemIcon>
                        <Icon />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                </ListItemButton>
            </ListItem>
        </Link>
    );
}

export default SideItem;
