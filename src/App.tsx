import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import ListPaper from "./ListPaper";
import ArticleDelDlg from "./ArticleDelDlg";
import ArticleAddDlg from "./ArticleAddDlg";

const App = () => {
  return (
    <>
      <Stack sx={{ height: "100vh" }}>
        <Header />
        <ListPaper />
      </Stack>
      <ArticleDelDlg />
      <ArticleAddDlg />
    </>
  );
};

export default App;
