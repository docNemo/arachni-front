import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import store from "./Store";

const Filter = () => (
  <Box
    sx={{
      marginRight: "8px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
    }}
  >
    <FormControl
      size="small"
      variant="standard"
      sx={{ margin: "4px", width: "100px" }}
    >
      <Select
        label="Фильтр"
        value={store.sortBy}
        onChange={(e) => store.setSortBy(e.target.value)}
      >
        <MenuItem value={"DATE"}>Дата</MenuItem>
      </Select>
    </FormControl>
    <IconButton onClick={store.setOrderBy}>
      {store.orderBy === "ASC" ? (
        <KeyboardArrowUpIcon />
      ) : (
        <KeyboardArrowDownIcon />
      )}
    </IconButton>
  </Box>
);

export default observer(Filter);
