import React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Search from "./Search";
import Sort from "./Sort";
import Filter from "./Filter";

interface IPaperBoxProps {
    component: JSX.Element;
}

const PaperBox = ({ component }: IPaperBoxProps) => (
    <Paper
        elevation={8}
        sx={{
            padding: "4px",
            margin: "0px 8px 8px",
            width: "240px"
        }}
    >
        {component}
    </Paper>
);

const NavView = () => {
    return (
        <Stack sx={{ flexGrow: 1, overflowY: "hidden", paddingTop: "8px" }}>
            <PaperBox component={<Search />} />
            <PaperBox component={<Sort />} />
            <PaperBox component={<Filter />} />
        </Stack>
    )
}

export default NavView;
