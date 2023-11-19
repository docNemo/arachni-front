import React from "react";
import { observer } from "mobx-react-lite";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Search from "./Search";
import Sort from "./Sort";
import Filter from "./Filter";
import store from "./Store";

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
            <Button onClick={store.loadArticles} variant="contained" sx={{margin: "8px"}}>Найти</Button>
        </Stack>
    )
}

export default observer(NavView);
