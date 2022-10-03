import React from "react";

// Mui components
import {Box, List} from "@mui/material";
import SideItem from "./SideItem";

// Menu
import {superAdminMenu} from "./menu";

function Sidebar() {
    return (
        <Box
            bgcolor="#e0e0e0"
            flex={0.5}
            p={2}
            sx={{display: {xs: "none", sm: "block"}}}>
            <List>
                {superAdminMenu.map((menu, i) => {
                    return (
                        <SideItem
                            key={i}
                            name={menu.name}
                            Icon={menu.icon}
                            path={menu.path}
                        />
                    );
                })}
            </List>
        </Box>
    );
}

export default Sidebar;
