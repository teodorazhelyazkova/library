import { action, autorun, makeObservable, observable } from 'mobx';
import * as bookService from '../services/bookService';
import { IBook } from '../components/BookItem/BookItem';

export class BooksStore {
    public books: IBook[] = [];
    public myBookList: IBook[] = [];

    constructor() {
        makeObservable(this, {
            books: observable,
            myBookList: observable,

            setBooks: action.bound,
            addBook: action.bound,
            deleteBook: action.bound,
            addToMyBookList: action.bound,
            removeFromMyBookList: action.bound,
        });

        autorun(() => this.initializeStoreData());
    }

    public initializeStoreData() {
        this.fetchBooks();
    }

    public setBooks(books: IBook[]) {
        this.books = books;
    }

    public addBook(book: IBook) {
        this.books.push(book);
    }

    public deleteBook(bookId: string) {
        this.books = this.books.filter((book) => book.id !== bookId);
    }

    public async fetchBooks() {
        try {
            bookService.getAll().then((result) => this.setBooks(result));
        } catch (error) {
            console.log(error);
        }
    }

    public addToMyBookList(item: IBook) {
        const existingBook = this.myBookList.find((book: IBook) => book.id === item.id);

        if (existingBook) {
            return;
        }

        this.myBookList.push(item);
    }

    public removeFromMyBookList(bookId: string) {
        this.myBookList = this.myBookList.filter((book: IBook) => book.id !== bookId);
    }
}
