import {makeAutoObservable} from "mobx";

interface ICreatorsListResponse {
    data: Array<string>;
    count: number;
}

class FilterStore {
    creators: string[] = [];
    categories: string[] = []
    loadCreators = () => {
        fetch("/api/arachni-articles/creator/list")
            .then((res: Response) => res.status === 200 ? res.json() : Promise.reject(res))
            .then((res: ICreatorsListResponse) => {this.creators = res.data.concat("Любой").sort()})
            .catch((err: Response) => console.log(err));
        console.log(this.creators)
    }

    loadCategories = () => {
        fetch("/api/arachni-articles/category/list")
            .then((res: Response) => res.status === 200 ? res.json() : Promise.reject(res))
            .then((res: ICreatorsListResponse) => {this.categories = res.data.sort()})
            .catch((err: Response) => console.log(err));
        console.log(this.creators)
    }

    constructor() {
        makeAutoObservable(this);
        this.loadCreators();
        this.loadCategories();
    }
}

export default new FilterStore();
