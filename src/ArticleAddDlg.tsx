import React from "react";
import { observer } from "mobx-react-lite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import store from "./Store";
import TextField from "@mui/material/TextField";

const ArticleAddDlg = () => {
  const create = () => {};
  //TODO
  const close = () => store.setOpenAddDlg();
  return (
    <Dialog open={store.isOpenAddDlg}>
      <DialogTitle>Создание новой статьи</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          variant="standard"
          size="small"
          label={"Название"}
        />
        <TextField
          fullWidth
          variant="standard"
          size="small"
          label={"Категория"}
        />
        <TextField
          fullWidth
          multiline
          variant="standard"
          size="small"
          maxRows={10}
          label={"Текст статьи"}
        />
        <TextField fullWidth variant="standard" size="small" label={"Автор"} />
      </DialogContent>
      <DialogActions>
        <Button onClick={create}>Создать</Button>
        <Button onClick={close}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(ArticleAddDlg);
