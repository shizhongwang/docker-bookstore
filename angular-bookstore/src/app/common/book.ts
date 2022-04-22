import { BookCategory } from "./book-category";

export class Book {
    id: number;
    firstParty: string;
    name: string;
    description: string;
    amount: number;
    imageUrl: string;
    active: boolean;
    unitsInStock: number;
    createAt: Date;
    updateAt: Date;
    categoryId: number;
}
