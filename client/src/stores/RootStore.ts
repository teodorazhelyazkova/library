import { makeAutoObservable } from 'mobx';
import { BooksStore } from './BooksStore';

export class RootStore {
    public booksStore: BooksStore;

    constructor() {
        makeAutoObservable(this);
        this.booksStore = new BooksStore();
    }
}
