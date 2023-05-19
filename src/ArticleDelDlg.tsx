import React from "react";
import { observer } from "mobx-react-lite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import store from "./Store";

const ArticleDelDlg = () => {
  //TODO
  const close = () => store.setDelDlg();
  return (
    <Dialog open={!!store.delArticle}>
      <DialogTitle>Удалить</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Вы точно хотите безвозратно удалить статью "{store.delArticle?.title}"
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={store.onDelArticle}>Удалить</Button>
        <Button onClick={close}>Закрыть</Button>
      </DialogActions>
    </Dialog>
  );
};

export default observer(ArticleDelDlg);
