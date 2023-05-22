import { makeAutoObservable } from "mobx";

export interface IArticle {
  idArticle: string;
  title: string;
  categories: Array<string>;
  creator: string;
  creationDate: string;
  text?: string;
}

interface IArticleListResponse {
  articles: Array<IArticle>;
  count: number;
}

class Store {
  private readonly countArticlePage: number;
  private readonly url: string;
  articles: Array<IArticle> = [];
  countPage: number = 0;
  page: number = 0;
  selectArticle?: IArticle;
  isOpenAddDlg: boolean = false;
  isOpenDelDlg: boolean = false;
  isOpenEditor: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.countArticlePage = 25;
    this.url = "/api/article";
    this.loadArticles(1);
  }

  loadArticles = (page: number): void => {
    this.page = page;
    const url: URL = new URL(`${this.url}/list`, window.location.origin);
    url.searchParams.append(
      "skip",
      ((page - 1) * this.countArticlePage).toString()
    );
    url.searchParams.append("limit", this.countArticlePage.toString());
    fetch(url, { method: "GET" })
      .then((res: Response) => res.json())
      .then((res: IArticleListResponse) => {
        this.articles = res.articles;
        this.countPage = Math.ceil(res.count / this.countArticlePage);
      });
  };

  setAddDlg = (): boolean => (this.isOpenAddDlg = !this.isOpenAddDlg);

  setDelDlg = (article?: IArticle): void => {
    this.selectArticle = article;
    this.isOpenDelDlg = !this.isOpenDelDlg;
  };

  setEditor = (article?: IArticle): void => {
    article &&
      fetch(`${window.location.origin}${this.url}/${article.idArticle}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => (this.selectArticle = res));
    this.isOpenEditor = !this.isOpenEditor;
  };

  onAddArticle = (
    title: string,
    categories: string,
    text: string,
    creator: string
  ): void => {
    fetch(`${window.location.origin}${this.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        categories: categories.split("/"),
        text: text,
        creator: creator,
      }),
    })
      .then((res: Response) => res.json())
      .then((res: IArticle) => {
        this.articles.pop();
        delete res.text;
        this.articles.unshift(res);
      });
  };

  onDelArticle = (): void => {
    if (!this.selectArticle) {
      return;
    }
    fetch(
      `${window.location.origin}${this.url}/${this.selectArticle.idArticle}`,
      { method: "DELETE" }
    ).then((res) => res.status === 200 && this.loadArticles(this.page));
  };

  onUpdArticle = (title: string, categories: string, text: string): void => {
    fetch(`${window.location.origin}${this.url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        categories: categories,
        text: text,
      }),
    })
      .then((res: Response) => res.json())
      .then((res: IArticle) => {
        const index = this.articles.findIndex(
          (article) => article.idArticle === res.idArticle
        );
        this.articles[index] = res;
        this.articles = [...this.articles];
      });
  };
}

export default new Store();
