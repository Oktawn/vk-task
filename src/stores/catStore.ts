import ky from "ky";
import { makeAutoObservable, runInAction } from "mobx";

export type Cat = {
    id: string,
    url: string,
    width: number,
    height: number
}

class CatStore {
    private ky = ky.create({ prefixUrl: "https://api.thecatapi.com/v1/images/search" })
    cats: Cat[] = []
    private page = 0
    isLoading = true

    constructor() {
        makeAutoObservable(this);
        this.loadCats();
    }

    async loadCats() {
        this.isLoading = true;
        try {
            const data = await this.ky("?limit=10").json<Cat[]>();
            runInAction(() => {
                data.map(el =>
                    this.cats.push(el)
                )
                this.isLoading = false;
            })

            this.page++;
        } catch (error) {
            console.error("Failed to load cats", error);
            runInAction(() => { this.isLoading = false; });

        }
    }
    async loadNextCats() {
        this.isLoading = true;
        try {
            const data = await this.ky(`?limit=10&page=${this.page}`).json<Cat[]>();
            runInAction(() => {
                data.map(el => {
                    this.cats.push(el);
                })
                this.isLoading = false;

            })
            this.page++;
        } catch (error) {
            console.error("Failed to load cats", error);
            runInAction(() => { this.isLoading = false; });

        }
    }

    updateCat(id: string, updateData: any) {
        runInAction(() => {
            this.cats = this.cats.map(cat => cat.id === id ? { ...cat, ...updateData } : cat)
        })
    }

    deleteCat(cat: Cat) {
        runInAction(() =>
            this.cats.splice(this.cats.indexOf(cat), 1))
    }
}

export default new CatStore();