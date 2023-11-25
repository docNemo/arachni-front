import React, {useState, useEffect} from "react";
import {observer} from "mobx-react-lite";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";
import store from "./Store";

const ArticleView = () => {
    const mode = store.modeArticle;

    const readOnly = {readOnly: true};

    const [title, setTitle] = useState<string>("");
    const [categories, setCategories] = useState<string>("");
    const [text, setText] = useState<string>("");
    const [creator, setCreator] = useState<string>("");

    const [disableButton, setDisableButton] = useState<boolean>(true);

    const [updDlg, setUpdDlg] = useState<boolean>(false);
    const [resetDlg, setResetDlg] = useState<boolean>(false);
    const [closeDlg, setCloseDlg] = useState<boolean>(false);

    const [edit, setEdit] = useState<boolean>(false);
    const [change, setChange] = useState<boolean>(false);

    const [failedClassifiedCategoryDlg, setFailedClassifiedCategoryDlg] = useState<boolean>(false)
    const [classifiedCategoryDlg, setClassifiedCategoryDlg] = useState<boolean>(false)
    const [classifiedCategory, setClassifiedCategory] = useState<string>("false")

    const onClick = () => {
        if (mode === "ADD") {
            store
                .onAddArticle(title, categories, text, creator)
                .then((res) => res && close());
            return;
        }

        setUpdDlg(true);
    }

    const onClickClassifier = () => {
        store
            .onClassifyArticle(text)
            .then(res => typeof res === "string" ? res : "")
            .then(res => {
                    if (res == "") {
                        setFailedClassifiedCategoryDlg(true)
                    } else {
                        setClassifiedCategoryDlg(true)
                        setClassifiedCategory(res)
                    }
                }
            );
        return;
    }

    const addCategory = () => {
        if (!categories.includes(classifiedCategory)) {
            setCategories(classifiedCategory.concat(categories.length > 0 ? '/'.concat(categories) : ""))
        }
        setClassifiedCategoryDlg(false)
        return;
    }

    const close = () => store.setEditor();

    const onEditMod = () => {
        if (!edit) {
            setEdit(true);
        } else if (!change) {
            setEdit(false);
        } else {
            setResetDlg(true);
        }
    };

    const update = () => {
        const arrCategories = Array.from(
            new Set(categories.split("/").map((str) => str.trim()))
        );
        store.onUpdArticle(title, arrCategories, text)?.then(() => {
            setCategories(arrCategories.join("/"));
            setUpdDlg(false);
            setChange(false);
        });
    };

    const reset = () => {

    }

    useEffect(() => {
        setDisableButton(
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

    useEffect(() => {
        if (mode === "EDIT") {
            setTitle(store.selectArticle?.title.trim() ?? "");
            setCategories(store.selectArticle?.categories.join("/") ?? "");
            setText(store.selectArticle?.text?.trim() ?? "");
            setCreator(store.selectArticle?.creator ?? "");
        } else {
            setTitle("");
            setCategories("");
            setText("");
            setCreator("");
        }
    }, [mode]);

    return (
        <>
            <Box sx={{display: "flex", flexGrow: 1, justifyContent: 'center', padding: "8px"}}>
                <Stack sx={{width: "800px", justifyContent: "center"}}>
                    <Box sx={{display: "flex"}}>
                        {mode === "ADD"
                            ? <Typography variant="h6" fontWeight={"bold"} flexGrow={1}>
                                Создание
                            </Typography>
                            : <Box flexGrow={1}>
                                <IconButton
                                    sx={{color: "rgba(0, 0, 0, 0.54)", opacity: edit ? 1 : 0.5}}
                                    onClick={onEditMod}
                                >
                                    <EditIcon/>
                                </IconButton>
                            </Box>}
                        <IconButton onClick={close}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                    <Stack>
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
                            rows={20}
                            label={"Текст статьи"}
                            error={text.trim() === ""}
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                        />
                        <TextField
                            fullWidth
                            variant="standard"
                            size="small"
                            disabled={mode === "EDIT"}
                            label={"Автор"}
                            error={creator.trim() === ""}
                            value={creator}
                            onChange={(e) => setCreator(e.target.value)}
                        />
                        {mode === "EDIT" && <TextField
                            disabled
                            fullWidth
                            variant="standard"
                            size="small"
                            label="Дата создания"
                            value={moment(store.selectArticle?.creationDate).format("LLLL")}
                            InputProps={{
                                readOnly: true,
                            }}
                        />}
                    </Stack>
                    <Box sx={{display: "flex", flexDirection: "row"}} justifyContent="space-between"
                         alignItems="center">
                        <Button onClick={onClickClassifier}>
                            Определить категорию
                        </Button>
                        <Button onClick={onClick} disabled={disableButton}>
                            {mode === "ADD" ? "Создать" : "Сохранить"}
                        </Button>
                    </Box>
                </Stack>
            </Box>
            <Dialog open={classifiedCategoryDlg}>
                <DialogTitle>Классификация</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Будет добавлена категория "{classifiedCategory}". Если она вас не устраивает, то ее можно
                        изменить.
                    </DialogContentText>
                    <TextField fullWidth
                               variant="standard"
                               size="small"
                               error={classifiedCategory.trim() === ""}
                               value={classifiedCategory}
                               onChange={(e) => setClassifiedCategory(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={addCategory}>Добавить</Button>
                    <Button onClick={() => setClassifiedCategoryDlg(false)}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={failedClassifiedCategoryDlg}>
                <DialogTitle>Классификация</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Не удалось определить категорию. Попробуйте позже.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setFailedClassifiedCategoryDlg(false)}>Понятно</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={updDlg}>
                <DialogTitle>Обновление</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Вы точно хотите обновить статью? (При сохранении дубликаты категорий
                        будут удалены!)
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
                    <Button onClick={() => store.setEditor()}>Сбросить</Button>
                    <Button onClick={() => setCloseDlg(false)}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default observer(ArticleView);