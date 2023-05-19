import { makeAutoObservable } from "mobx";
import { list } from "./res";

export interface IArticle {
  uuid: string;
  title: string;
  categories: string;
  creator: string;
  creation_date: string;
  text: string;
}

class Store {
  articles: Array<IArticle> = [];
  private readonly countArticlePage: number;
  countPage: number;

  constructor() {
    makeAutoObservable(this);
    this.countArticlePage = 10;
    this.countPage = 15;
    this.loadArticles(1);
  }

  loadArticles = (page: number): void => {
    this.articles = list as Array<IArticle>;
    console.debug(page);
  };
}

export default new Store();
