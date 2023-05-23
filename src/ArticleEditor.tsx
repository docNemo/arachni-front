import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
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
  const [updDlg, setUpdDlg] = useState<boolean>(false);
  const [resetDlg, setResetDlg] = useState<boolean>(false);
  const [closeDlg, setCloseDlg] = useState<boolean>(false);

  const update = () => {
    store.onUpdArticle(
      title,
      categories.split("/").map((str) => str.trim()),
      text
    );
    setUpdDlg(false);
    setChange(false);
  };
  const close = () =>
    edit && change && !errCategories ? setCloseDlg(true) : store.setEditor();
  const onEditMod = () => {
    if (!edit) {
      setEdit(true);
    } else if (!change) {
      setEdit(false);
    } else {
      setResetDlg(true);
    }
  };
  const reset = () => {
    setChange(false);
    setEdit(false);
    setResetDlg(false);
    setTitle(store.selectArticle?.title.trim() ?? "");
    setCategories(store.selectArticle?.categories.join("/") ?? "");
    setText(store.selectArticle?.text?.trim() ?? "");
  };

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
    <>
      <Dialog
        open={store.isOpenEditor}
        PaperProps={{ sx: { maxWidth: "none" } }}
      >
        <DialogTitle sx={{ display: "flex", backgroundColor: "#0288d1" }}>
          <Box flexGrow={1}>
            <IconButton
              sx={{ color: "white", opacity: edit ? 1 : 0.5 }}
              onClick={onEditMod}
            >
              <EditIcon />
            </IconButton>
            <Button
              onClick={() => setUpdDlg(!updDlg)}
              disabled={!(edit && change && !errCategories)}
              sx={{ color: "white" }}
            >
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
            InputProps={edit ? {} : readOnly}
          />
          <TextField
            fullWidth
            variant="standard"
            size="small"
            label={"Категория"}
            error={errCategories}
            helperText={
              errCategories
                ? "Категория должна быть в формате: кат1/кат2..."
                : ""
            }
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            InputProps={edit ? {} : readOnly}
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
            InputProps={edit ? {} : readOnly}
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
      <Dialog open={updDlg}>
        <DialogTitle>Обновление</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы точно хотите обновить статью?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={update}>Обновить</Button>
          <Button onClick={() => setUpdDlg(!updDlg)}>Закрыть</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={resetDlg}>
        <DialogTitle>Сброс изменений</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Cбросить несохраненные изменения?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={reset}>Сбросить</Button>
          <Button onClick={() => setResetDlg(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={closeDlg}>
        <DialogTitle>Закрыть статью</DialogTitle>
        <DialogContent>
          <DialogContentText>
            При закрытии статьи не будут сохранены изменения!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => store.setEditor}>Сбросить</Button>
          <Button onClick={() => setCloseDlg(false)}>Закрыть</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default observer(ArticleEditor);
