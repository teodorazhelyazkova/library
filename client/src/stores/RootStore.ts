import { makeAutoObservable } from 'mobx';
import { BooksStore } from './BooksStore';
import { AuthStore } from './AuthStore';

export class RootStore {
    public booksStore: BooksStore;
    public authStore: AuthStore;

    constructor() {
        makeAutoObservable(this);
        this.booksStore = new BooksStore();
        this.authStore = new AuthStore();
    }
}
