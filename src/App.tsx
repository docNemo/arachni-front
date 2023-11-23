import React from "react";
import { observer } from "mobx-react-lite";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Stack from "@mui/material/Stack";
import Header from "./Header";
import MainView from "./MainView";
import ArticleView from "./ArticleView";
import InfoBox from "./InfoBox";
import Progress from "./Progress";
import store from "./Store";

const ViewEnum = {
  "LIST": <MainView />,
  "ARTICLE": <ArticleView />,
}

const App = () => {

  return <>
    <Stack sx={{ height: "100vh" }}>
      <Header />
      {ViewEnum[store.modeView]}
    </Stack>
    <InfoBox {...store.infoBox} />
    <Progress {...store.progress} />
  </>;
};

export default observer(App);
