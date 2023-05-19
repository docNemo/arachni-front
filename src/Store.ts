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
  articles: Array<IArticle> = [];
  countPage: number = 0;
  delArticle?: IArticle;
  isOpenAddDlg: boolean = false;

  constructor() {
    makeAutoObservable(this);
    this.countArticlePage = 10;
    this.countPage = 15;
    this.loadArticles(1);
  }

  loadArticles = (page: number): void => {
    //TODO
    this.articles = list as Array<IArticle>;
    console.debug(page);
  };

  onDelArticle = (): void => {
    //TODO
    console.debug(this.delArticle);
  };

  setDelDlg = (article?: IArticle) => {
    this.delArticle = article;
  };

  setOpenAddDlg = () => {
    this.isOpenAddDlg = !this.isOpenAddDlg;
  };

  onAddArticle = (
    title: string,
    categories: string,
    text: string,
    creator: string
  ): void => {
    fetch("http://arachni-back-develop.apps.os-lab-1.neo/api/article", {
      method: "POST",
      body: JSON.stringify({
        title: title,
        categories: categories,
        text: text,
        creator: creator,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
}

export default new Store();
