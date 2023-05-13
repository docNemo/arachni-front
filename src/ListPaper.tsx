import React from "react";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";

const ListPaper = () => {
  return (
    <Stack>
      <Box flexGrow={1} height={200}></Box>
      <Box height={200}></Box>
    </Stack>
  );
};

export default ListPaper;
