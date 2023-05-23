import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import store from "./Store";
import TextField from "@mui/material/TextField";

const ArticleAddDlg = () => {
  const [title, setTitle] = useState<string>("");
  const [categories, setCategories] = useState<string>("");
  const [text, setText] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [disableCreate, setDisableCreate] = useState<boolean>(true);

  const clear = () => {
    setTitle("");
    setCategories("");
    setText("");
    setCreator("");
  };

  const create = () => {
    store.onAddArticle(title, categories, text, creator);
    clear();
  };

  const close = () => {
    store.setAddDlg();
    clear();
  };

  useEffect(() => {
    setDisableCreate(
      !(
        title.trim() &&
        !categories
          .split("/")
          .map((str) => str.trim())
          .some((str) => str === "") &&
        text.trim() &&
        creator.trim()
      )
    );
  });

  return (
    <Dialog open={store.isOpenAddDlg}>
      <DialogTitle>Создание новой статьи</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="standard"
          size="small"
          label={"Название"}
          error={title.trim() === ""}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          variant="standard"
          size="small"
          label={"Категория"}
          helperText={"Категория должна быть в формате: кат1/кат2..."}
          error={categories
            .split("/")
            .map((str) => str.trim())
            .some((str) => str === "")}
          value={categories}
          onChange={(e) => setCategories(e.target.value)}
        />
        <TextField
          fullWidth
          multiline
          variant="standard"
          size="small"
          rows={10}
          label={"Текст статьи"}
          error={text.trim() === ""}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <TextField
          fullWidth
          variant="standard"
          size="small"
          label={"Автор"}
          error={creator.trim() === ""}
          value={creator}
          onChange={(e) => setCreator(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={create} disabled={disableCreate}>
          Создать
        </Button>
        <Button onClick={close}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(ArticleAddDlg);
