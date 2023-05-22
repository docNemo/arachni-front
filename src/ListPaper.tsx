import React from "react";
import { observer } from "mobx-react-lite";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import store from "./Store";
import Article from "./Article";
import ArticleEditor from "./ArticleEditor";
import ArticleAddDlg from "./ArticleAddDlg";
import ArticleDelDlg from "./ArticleDelDlg";

const ListPaper = () => {
  const handleChangePage = (_: React.ChangeEvent<unknown>, page: number) => {
    store.loadArticles(page);
  };

  return (
    <>
      <Stack sx={{ flexGrow: 1, overflowY: "hidden" }}>
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
      <ArticleAddDlg />
      <ArticleDelDlg />
      {store.isOpenEditor && <ArticleEditor />}
    </>
  );
};

export default observer(ListPaper);
