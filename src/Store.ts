import { makeAutoObservable } from "mobx";
import { State, IInfoBox } from "./InfoBox";
import { IProgress } from "./Progress";

export interface IArticle {
  idArticle: string;
  title: string;
  categories: Array<string>;
  creator: string;
  creationDate: string;
  text?: string;
  crawled: boolean;
}

interface IArticleListResponse {
  data: Array<IArticle>;
  count: number;
}
interface IClassifiedCategoryResponse {
  category: string;
}

interface IErrorResponse {
  errorCode: string;
  message: string;
}

export enum SortBy {
  DATE = "Дата",
  TITLE = "Название",
  CREATOR = "Автор",
}

interface IFilter {
  beginDate?: string;
  endDate?: string;
  creator?: string;
  categories: Array<string>;
}

class Store {
  private readonly countArticlePage: number = 25;
  private readonly url: string = "/api/arachni-articles/article";
  articles: Array<IArticle> = [];
  countArticles: number = 0;
  countPage: number = 1;
  page: number = 1;
  selectArticle?: IArticle;
  searchText: string = "";
  isOpenDelDlg: boolean = false;
  infoBox: IInfoBox = {
    open: false,
    text: "",
    close: () => this.setInfoBox(),
  };
  progress: IProgress = {
    open: false,
    text: undefined,
  }
  sortBy: string = "DATE";
  orderBy: "ASC" | "DESC" = "DESC";
  modeView: "LIST" | "ARTICLE" = "LIST";
  modeArticle?: "ADD" | "EDIT" | "CLASS";
  filter: IFilter = { categories: [] }

  constructor() {
    makeAutoObservable(this);
    this.loadArticles();
  }

  loadArticles = (): void => {
    this.setProgress(true, "Загрузка");
    const url: URL = new URL(`${this.url}/list`, window.location.origin);
    url.searchParams.append(
      "skip",
      ((this.page - 1) * this.countArticlePage).toString()
    );
    url.searchParams.append("limit", this.countArticlePage.toString());
    url.searchParams.append("order", this.orderBy);
    url.searchParams.append("sortBy", this.sortBy);
    if (this.filter.creator && this.filter.creator != 'Любой') {
      url.searchParams.append("creator", this.filter.creator);
    }
    if (this.filter.categories != undefined && this.filter.categories.length > 0) {
      url.searchParams.append("categories", this.filter.categories.toString());
    }
    if (this.filter.beginDate != undefined) {
      url.searchParams.append("startDate", this.filter.beginDate);
    }
    if (this.filter.endDate) {
      url.searchParams.append("finishDate", this.filter.endDate);
    }
    this.searchText.trim() &&
      url.searchParams.append("searchString", this.searchText.trim());
    fetch(url, { method: "GET" })
      .then((res: Response) =>
        res.status === 200 ? res.json() : Promise.reject(res)
      )
      .then((res: IArticleListResponse) => {
        this.articles = res.data;
        this.countArticles = res.count;
        this.countPage = Math.ceil(res.count / this.countArticlePage);
        this.setProgress();
      })
      .catch(this.errorHandler);
  };

  setSearchText = (str: string): string => (this.searchText = str);

  setPage = (page: number): void => {
    this.page = page;
    this.loadArticles();
  };

  setAddDlg = (): void => {
    this.modeView = "ARTICLE";
    this.modeArticle = "ADD";
  };

  setClassificationDlg = (): void => {
    this.modeView = "ARTICLE";
    this.modeArticle = "CLASS";
  }

  setDelDlg = (article?: IArticle): void => {
    this.selectArticle = article;
    this.isOpenDelDlg = !this.isOpenDelDlg;
  };

  setEditor = (article?: IArticle): void => {
    if (!article) {
      this.modeView = "LIST";
      this.modeArticle = undefined;
      return;
    }
    fetch(`${window.location.origin}${this.url}/${article.idArticle}`, {
      method: "GET",
    })
      .then((res: Response) =>
        res.status === 200 ? res.json() : Promise.reject(res)
      )
      .then((res: IArticle) => {
        this.selectArticle = res;
        this.modeView = "ARTICLE";
        this.modeArticle = "EDIT";
      })
      .catch(this.errorHandler);
  };

  onAddArticle = (
    title: string,
    categories: string,
    text: string,
    creator: string
  ): Promise<boolean> =>
    fetch(`${window.location.origin}${this.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        categories: categories.split("/").map((str) => str.trim()),
        text: text,
        creator: creator,
      }),
    })
      .then((res: Response) =>
        res.status === 200 ? res.json() : Promise.reject(res)
      )
      .then((res: IArticle) => {
        if (this.articles.length === this.countArticlePage) {
          this.articles.pop();
        }
        delete res.text;
        this.articles.unshift(res);
        this.countArticles = this.countArticles + 1;
        this.countPage = Math.ceil(this.countArticles / this.countArticlePage);
        this.setInfoBox(`Добавлена статья ${res.title}`, "success");
        return true;
      })
      .catch((err) => {
        this.errorHandler(err);
        return false;
      });

  onDelArticle = (): Promise<void> =>
    fetch(
      `${window.location.origin}${this.url}/${this.selectArticle?.idArticle}`,
      { method: "DELETE" }
    )
      .then((res: Response) => {
        if (res.status === 200) {
          this.setInfoBox(
            `Удалена статья: ${this.selectArticle?.title}`,
            "success"
          );
          this.loadArticles();
          this.setDelDlg();
          return;
        }
        Promise.reject(res);
      })
      .catch(this.errorHandler);

  onUpdArticle = (
    title: string,
    categories: Array<string>,
    text: string,
    creator: string,
    creationDate: string
  ): Promise<void> =>
    fetch(
      `${window.location.origin}${this.url}/${this.selectArticle?.idArticle}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, categories, text, creator, creationDate }),
      }
    )
      .then((res: Response) =>
        res.status === 200 ? res.json() : Promise.reject(res)
      )
      .then((res: IArticle) => {
        const index = this.articles.findIndex(
          (article) => article.idArticle === res.idArticle
        );
        this.articles[index] = res;
        this.articles = [...this.articles];
        this.selectArticle = res;
        this.setInfoBox(`Обновлена статья: ${res.title}`, "success");
      })
      .catch(this.errorHandler);

  onClassifyArticle = (
    text: string
  ): Promise<void | string> =>
    fetch(
      `/api/arachni-classifier/classifier/category`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: text
        }),
      }
    )
      .then((res: Response) =>
        res.status === 200 ? res.json() : Promise.reject(res)
      )
      .then((res: IClassifiedCategoryResponse) =>
        res.category
      )
      .catch(this.errorHandler);

  setInfoBox = (text?: string, state?: State): void => {
    const newState: IInfoBox = {
      open: text !== undefined,
      text: text ?? "",
      close: this.infoBox.close,
    };
    state && (newState.state = state);
    this.infoBox = newState;
  };

  setProgress = (open: boolean = false, text?: string): IProgress => (this.progress = { open, text })

  errorHandler = (err: Response) =>
    err
      .json()
      .then((res: IErrorResponse | any) =>
        this.setInfoBox(
          res.message ?? `${res.status ?? ""} ${res.error ?? ""}`,
          "error"
        )
      );

  setSortBy = (str: string) => {
    this.sortBy = str;
    this.page = 1;
    this.loadArticles();
  };

  setOrderBy = () => {
    this.orderBy = this.orderBy === "ASC" ? "DESC" : "ASC";
    this.page = 1;
    this.loadArticles();
  };
}

export default new Store();
