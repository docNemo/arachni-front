import {makeAutoObservable} from "mobx";
import store from "./Store";


interface ICreatorsListResponse {
    data: Array<string>;
    count: number;
}

class FilterStore {
    creators: string[] = [];
    categories: string[] = []
    loadCreators = (value: string) => {
        fetch("/api/arachni-articles/creator/list?order=ASC&searchString=" + value)
            .then((res: Response) => res.status === 200 ? res.json() : Promise.reject(res))
            .then((res: ICreatorsListResponse) => {this.creators = res.data.sort()})
            .catch((err: Response) => console.log(err));
        console.log(this.creators)
    }

    loadCategories = (value: string) => {
        // fetch("/api/arachni-articles/category/list?order=ASC&searchString=" + (store.filter.categories.pop() ?? ""))
        fetch("/api/arachni-articles/category/list?order=ASC&searchString=" + value)
            .then((res: Response) => res.status === 200 ? res.json() : Promise.reject(res))
            .then((res: ICreatorsListResponse) => {this.categories = res.data.sort()})
            .catch((err: Response) => console.log(err));
        console.log(this.creators)
    }

    constructor() {
        makeAutoObservable(this);
        this.loadCreators("");
        this.loadCategories("");
    }
}

export default new FilterStore();
