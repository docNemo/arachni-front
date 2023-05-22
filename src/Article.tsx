import React from "react";
import { observer } from "mobx-react-lite";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import store, { IArticle } from "./Store";

interface IArticleProps {
  article: IArticle;
}

const Article = ({ article }: IArticleProps) => {
  const open = () => store.setEditor(article);
  const delArticle = () => store.setDelDlg(article);
  return (
    <Paper
      key={article.idArticle}
      elevation={8}
      onDoubleClick={open}
      sx={{
        padding: "4px",
        marginBottom: "8px",
        width: "600px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Stack flexGrow={1}>
          <Typography variant="h6" fontWeight={"bold"}>
            {article.title}
          </Typography>
          <Typography variant="body1">
            {article.categories.join("/")}
          </Typography>
          <Typography align="right" variant="body2" color={"#666666"}>
            {article.creator} ({article.creationDate})
          </Typography>
        </Stack>
        <IconButton onClick={delArticle}>
          <ClearIcon />
        </IconButton>
      </Box>
    </Paper>
  );
};

export default observer(Article);
