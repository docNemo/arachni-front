import React from "react";
import { observer } from "mobx-react-lite";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import store from "./Store";
import Search from "./Search";

const Header = () => {
  return (
    <AppBar component={"nav"} sx={{ position: "relative" }}>
      <Toolbar>
        <Typography variant={"h5"} sx={{ flexGrow: 1 }}>
          Курсовая работа
        </Typography>
        <Box display={"flex"}>
          <Search />
          <IconButton sx={{ color: "white" }} onClick={store.setAddDlg}>
            <AddIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default observer(Header);
