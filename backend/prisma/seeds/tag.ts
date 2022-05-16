import { PrismaClient } from '@prisma/client'
import {book1, book10, book2, book3, book4, book5, book6, book7, book8, book9} from "./book";

export const createTags = async (prisma:PrismaClient) => {
    await prisma.tags.createMany({
        data: [tag1,tag2,tag3,tag4,tag5,tag6,tag7,tag8,tag9,tag10,tag11],
    })
}

const tag1 = {
    tag_name: "設計",
    book_id: book1.id
}
const tag2 = {
    tag_name: "設計",
    book_id: book2.id
}
const tag3 = {
    tag_name: "TypeScript",
    book_id: book3.id
}
const tag4 = {
    tag_name: "運用",
    book_id: book4.id
}
const tag5 = {
    tag_name: "運用",
    book_id: book5.id
}
const tag6 = {
    tag_name: "Java",
    book_id: book6.id
}
const tag7 = {
    tag_name: "設計",
    book_id: book6.id
}
const tag8 = {
    tag_name: "心構え",
    book_id: book7.id
}
const tag9 = {
    tag_name: "HTML",
    book_id: book8.id
}
const tag10 = {
    tag_name: "デザイン",
    book_id: book9.id
}
const tag11 = {
    tag_name: "Go",
    book_id: book10.id
}
