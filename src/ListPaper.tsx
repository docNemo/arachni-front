import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import store from "./Store";

const ListPaper = () => {
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    store.loadArticles(page);
  };

  return (
    <Stack sx={{ flexGrow: 1, overflowY: "hidden" }}>
      <Stack sx={{ alignItems: "center", overflowY: "auto" }}>
        {store.articles.map((article) => (
          <Paper
            key={article.uuid}
            elevation={8}
            sx={{
              padding: "4px",
              marginBottom: "8px",
              width: "600px",
            }}
          >
            <Typography variant="h6" fontWeight={"bold"}>
              {article.title}
            </Typography>
            <Typography variant="body1">{article.categories}</Typography>
            <Typography align="right" variant="body2" color={"#666666"}>
              {article.creator} ({article.creation_date})
            </Typography>
          </Paper>
        ))}
      </Stack>
      <Stack sx={{ alignItems: "center" }}>
        <Box
          sx={{
            padding: "4px",
            marginBottom: "8px",
            width: "600px",
          }}
        >
          <Pagination
            showFirstButton
            showLastButton
            count={store.countPage}
            defaultPage={1}
            onChange={handleChangePage}
            sx={{
              "> ul": {
                justifyContent: "space-between",
              },
            }}
          />
        </Box>
      </Stack>
    </Stack>
  );
};

export default observer(ListPaper);
