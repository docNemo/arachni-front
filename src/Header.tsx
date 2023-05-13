import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const Header = () => {
  return (
    <AppBar component={'nav'}>
      <Toolbar>
        <Typography variant={"h5"} sx={{ flexGrow: 1 }}>
          TermPaper
        </Typography>
        <Box display={"flex"}>
          <IconButton sx={{ color: "white" }}>
            <AddIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
