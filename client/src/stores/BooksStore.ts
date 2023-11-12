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
        const existingBook = this.myBookList.find((book: IBook) => book._id === item._id);

        if (existingBook) {
            return;
        }

        this.myBookList.push(item);
    }

    public removeFromMyBookList(bookId: string) {
        this.myBookList = this.myBookList.filter((book: IBook) => book._id !== bookId);
    }
}
