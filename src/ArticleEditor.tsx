import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import store from "./Store";
import TextField from "@mui/material/TextField";

const ArticleEditor = () => {
  const [title, setTitle] = useState<string>(
    store.selectArticle?.title.trim() ?? ""
  );
  const [categories, setCategories] = useState<string>(
    store.selectArticle?.categories.join("/") ?? ""
  );
  const [text, setText] = useState<string>(
    store.selectArticle?.text?.trim() ?? ""
  );
  const [edit, setEdit] = useState<boolean>(false);
  const [change, setChange] = useState<boolean>(false);
  const [errCategories, setErrCategories] = useState<boolean>(false);

  const update = () => {
    store.onUpdArticle(title, categories, text);
  };
  const close = () => store.setEditor();

  const readOnly = {
    readOnly: true,
  };

  useEffect(() => {
    setChange(
      title.trim() !== store.selectArticle?.title.trim() ||
        categories.trim() !== store.selectArticle?.categories.join("/") ||
        text.trim() !== store.selectArticle?.text?.trim()
    );
    setErrCategories(
      categories
        .split("/")
        .map((str) => str.trim())
        .some((str) => str === "")
    );
  });

  return (
    <Dialog open={store.isOpenEditor} PaperProps={{ sx: { maxWidth: "none" } }}>
      <DialogTitle sx={{ display: "flex", backgroundColor: "#0288d1" }}>
        <Box flexGrow={1}>
          <IconButton sx={{ color: "white" }} onClick={() => setEdit(!edit)}>
            <EditIcon />
          </IconButton>
          <Button onClick={update} disabled={edit && change}>
            Обновить
          </Button>
        </Box>
        <IconButton onClick={close}>
          <CloseIcon sx={{ color: "white" }} />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ paddingTop: "20px !important" }}>
        <TextField
          fullWidth
          variant="standard"
          size="small"
          label={"Название"}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          InputProps={edit ? readOnly : {}}
        />
        <TextField
          fullWidth
          variant="standard"
          size="small"
          label={"Категория"}
          error={errCategories}
          helperText={
            errCategories ? "Категория должна быть в формате: кат1/кат2..." : ""
          }
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
          InputProps={edit ? readOnly : {}}
        />
        <TextField
          fullWidth
          multiline
          variant="standard"
          size="small"
          rows={10}
          label={"Текст статьи"}
          value={text}
          onChange={(e) => setText(e.target.value)}
          InputProps={edit ? readOnly : {}}
        />
        <TextField
          fullWidth
          variant="standard"
          size="small"
          label={"Автор"}
          value={store.selectArticle?.creator}
          InputProps={{
            readOnly: true,
          }}
        />
      </DialogContent>
    </Dialog>
  );
};

export default observer(ArticleEditor);
