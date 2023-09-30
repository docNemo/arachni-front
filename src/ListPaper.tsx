import React from "react";
import { observer } from "mobx-react-lite";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Article from "./Article";
import ArticleEditor from "./ArticleEditor";
import ArticleAddDlg from "./ArticleAddDlg";
import ArticleDelDlg from "./ArticleDelDlg";
import store from "./Store";
import { Divider } from "@mui/material";

const ListPaper = () => {
  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) =>
    store.setPage(page);

  return (
    <>
      <Stack sx={{ flexGrow: 1, overflowY: "hidden" }}>
        <Typography variant="h6" sx={{ margin: "8px" }}>
          {`Найдено ${store.countArticles} статей`}
        </Typography>
        <Divider />
        <Stack sx={{ alignItems: "center", overflowY: "auto", flexGrow: 1 }}>
          {store.articles.map((article) => (
            <Article key={article.idArticle} article={article} />
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
              page={store.page}
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
      {store.isOpenAddDlg && <ArticleAddDlg />}
      <ArticleDelDlg />
      {store.isOpenEditor && <ArticleEditor />}
    </>
  );
};

export default observer(ListPaper);
