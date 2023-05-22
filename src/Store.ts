import { makeAutoObservable } from "mobx";
import { list } from "./res";

export interface IArticle {
  id: string;
  title: string;
  categories: string;
  creator: string;
  creation_date: string;
  text: string;
}

class Store {
  private readonly countArticlePage: number;
  private readonly url: string;
  articles: Array<IArticle> = [];
  countPage: number = 0;
  selectArticle?: IArticle;
  isOpenAddDlg: boolean = false;
  isOpenDelDlg: boolean = false;
  isOpenEditor: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.countArticlePage = 10;
    this.url = "/api/article";
    this.loadArticles(1);
  }

  loadArticles = (page: number): void => {
    // const url = new URL(`${this.url}/list`, window.location.origin);
    // url.searchParams.append(
    //   "skip",
    //   (page - 1 * this.countArticlePage).toString()
    // );
    // url.searchParams.append("limit", this.countArticlePage.toString());
    // fetch(url, { method: "GET" })
    //   .then((res) => res.json())
    //   .then((res) => console.debug(res));
    this.articles = list as Array<IArticle>;
    this.countPage = 15; // Math.ceil(list.length / this.countArticlePage);
    console.debug(page);
  };

  setAddDlg = (): boolean => (this.isOpenAddDlg = !this.isOpenAddDlg);

  setDelDlg = (article?: IArticle): void => {
    this.selectArticle = article;
    this.isOpenDelDlg = !this.isOpenDelDlg;
  };

  setEditor = (article?: IArticle): void => {
    // fetch(`${window.location.origin}${this.url}/${article.id}`, {
    //   method: "GET",
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.debug(res));
    this.selectArticle = article && { ...article };
    this.isOpenEditor = !this.isOpenEditor;
  };

  onAddArticle = (
    title: string,
    categories: string,
    text: string,
    creator: string
  ): void => {
    // fetch(`${window.location.origin}${this.url}`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: title,
    //     categories: categories,
    //     text: text,
    //     creator: creator,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.debug(res));
  };

  onDelArticle = (): void => {
    if (!this.selectArticle) {
      return;
    }
    fetch(`${window.location.origin}${this.url}/${this.selectArticle.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((res) => console.debug(res));
  };

  onUpdArticle = (title: string, categories: string, text: string): void => {
    // fetch(`${window.location.origin}${this.url}`, {
    //   method: "POST",
    //   body: JSON.stringify({
    //     title: title,
    //     categories: categories,
    //     text: text,
    //   }),
    // })
    //   .then((res) => res.json())
    //   .then((res) => console.debug(res));
  };
}

export default new Store();
