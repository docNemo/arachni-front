import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import store from "./Store";

const Search = () => {
  const search = () => store.setPage(1);
  return (
    <Box
      sx={{
        marginRight: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <IconButton
        size="small"
        sx={{ minWidth: 0, color: "#c0c0c0" }}
        onClick={search}
      >
        <SearchIcon />
      </IconButton>
      <InputBase
        value={store.searchText}
        onChange={(e) => store.setSearchText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            search();
            e.preventDefault();
          }
        }}
        sx={{ flexGrow: 1, paddingRight: "8px", marginLeft: "4px" }}
        placeholder={"Поиск..."}
      />
      {store.searchText && <IconButton
        size="small"
        sx={{ minWidth: 0, color: "#c0c0c0" }}
        onClick={() => store.setSearchText("")}
      >
        <CloseIcon />
      </IconButton>
      }
    </Box>
  );
};

export default observer(Search);
