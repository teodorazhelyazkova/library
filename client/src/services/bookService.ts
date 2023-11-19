import { IBook } from '../components/BookItem/BookItem';

const baseUrl = 'http://localhost:3030/jsonstore/collections/books';

export interface ICreateBook {
    author: string;
    title: string;
    creator: string;
}

export const getAll = async (): Promise<IBook[]> => {
    const response = await fetch(baseUrl);
    const result = await response.json();
    const books: IBook[] = Object.keys(result).map((id) => {
        const creator = localStorage.getItem(id) ?? '';
        return {
            _id: id,
            author: result[id].author,
            title: result[id].title,
            creator,
        };
    });

    return books;
};

export const create = async (data: ICreateBook) => {
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();

    return result;
};

export const deleteBook = async (id: string) => {
    const response = await fetch(`${baseUrl}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();

    localStorage.removeItem(id);

    return result;
};

export const edit = async (data: IBook) => {
    const response = await fetch(`${baseUrl}/${data._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    const result = await response.json();

    return result;
};
