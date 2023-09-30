import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import ListPaper from "./ListPaper";
import NavView from "./NavView";

const MainView = () => {
    return (
        <Box sx={{ display: "flex", flexGrow: 1, justifyContent: "center" }}>
            <Box sx={{ display: "flex" }}>
                <NavView />
                <ListPaper />
            </Box>
        </Box>
    );
}

export default observer(MainView);
