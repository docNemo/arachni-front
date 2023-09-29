import React from "react";
import { observer } from "mobx-react-lite";
import IconButton from "@mui/material/IconButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const FilterButton = () => {
  return (
    <>
      <IconButton>
        <FilterAltIcon />
      </IconButton>
    </>
  );
};

export default observer(FilterButton);
