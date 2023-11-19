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

            setMyBookList: action.bound,
            setBooks: action.bound,
            addBook: action.bound,
            deleteBook: action.bound,
            addToMyBookList: action.bound,
            removeFromMyBookList: action.bound,
            editBook: action.bound,
            setBook: action.bound,
        });

        autorun(() => this.initializeStoreData());
    }

    public initializeStoreData() {
        this.fetchBooks();
    }

    public setBooks(books: IBook[]) {
        this.books = books;
    }

    public setMyBookList(books: IBook[]) {
        this.myBookList = books;
    }

    public setBook(book: IBook, index: number) {
        this.books[index] = { ...book };
    }

    public addBook(book: IBook) {
        this.books.push(book);
    }

    public editBook(bookData: IBook) {
        const bookIndex = this.books.findIndex((book) => book._id === bookData._id);
        this.setBook(bookData, bookIndex);
    }

    public deleteBook(bookId: string) {
        this.books = this.books.filter((book) => book._id !== bookId);
    }

    public async fetchBooks() {
        try {
            bookService.getAll().then((result) => this.setBooks(result));
        } catch (error) {
            console.log(error);
        }
    }

    public addToMyBookList(item: IBook) {
        const accessToken = localStorage.getItem('accessToken')!;
        const user = localStorage.getItem('user')!;

        if (!accessToken) {
            return;
        }

        this.myBookList = JSON.parse(localStorage.getItem(user) || '[]');

        const existingBook = this.myBookList.find((book: IBook) => book._id === item._id);

        if (existingBook) {
            return;
        }

        this.myBookList.push(item);
        localStorage.setItem(user, JSON.stringify(this.myBookList));
    }

    public removeFromMyBookList(bookId: string) {
        const accessToken = localStorage.getItem('accessToken')!;

        if (!accessToken) {
            return;
        }

        const user = localStorage.getItem('user')!;
        const favoritesJSON = localStorage.getItem(user);

        if (!favoritesJSON) {
            return;
        }

        this.myBookList = JSON.parse(favoritesJSON).filter((book: IBook) => book._id !== bookId);

        localStorage.setItem(user, JSON.stringify(this.myBookList));
    }
}
