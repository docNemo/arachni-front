import React from "react";
import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import store, { SortBy } from "./Store";

const Sort = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "white",
    }}
  >
    <FormControl
      size="small"
      variant="standard"
      sx={{ margin: "4px", flexGrow: 1 }}
    >
      <Select
        label="Фильтр"
        value={store.sortBy}
        onChange={(e) => store.setSortBy(e.target.value)}
      >
        {Object.keys(SortBy).map((key) => (
          <MenuItem key={key} value={key}>
            {SortBy[key as keyof typeof SortBy]}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
    <IconButton onClick={store.setOrderBy}>
      {store.orderBy === "ASC" ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
    </IconButton>
  </Box>
);

export default observer(Sort);
