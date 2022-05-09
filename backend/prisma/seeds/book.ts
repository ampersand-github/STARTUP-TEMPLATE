import { PrismaClient } from '@prisma/client'

export const createBooks = async (prisma:PrismaClient) => {
    await prisma.books.createMany({
        data: [book1,book2,book3,book4,book5,book6,book7,book8,book9,book10],
    })
}

export const book1 = {
    id : "0ad33070-ae63-1076-841b-a222dceb7085",
    name : "上流モデリングによる業務改善手法入門",
    author : "世古 雅人",
    rating : 4,
}

export const book2 = {
    id : "54152aca-ad73-7aa1-52db-fb646f1c9084",
    name : "良いコード/悪いコードで学ぶ設計入門 ―保守しやすい 成長し続けるコードの書き方",
    author : "仙塲 大也",
    rating : 5,
}

export const book3 = {
    id : "4d5f47fa-b590-101b-cc2b-41431074ffdc",
    name : "プロを目指す人のためのTypeScript入門 安全なコードの書き方から高度な型の使い方まで",
    author : "鈴木 僚太",
    rating : 4,
}


export const book4 = {
    id : "6f6304f9-894c-202e-d71b-2e75e7068266",
    name : "システム運用アンチパターン ―エンジニアがDevOpsで解決する組織・自動化・コミュニケーション",
    author : "Jeffery D. Smith",
    rating : 4,
}
export const book5 = {
    id : "82c9434d-940c-ca48-8086-274ee8f4c7ee",
    name : "リーダブルコード ―より良いコードを書くためのシンプルで実践的なテクニック",
    author : "Dustin Boswell",
    rating : 5,
}
export const book6 = {
    id : "15eaa9ee-f0e7-a7a5-f6ac-6c1f4b52d3d6",
    name : "プロになるJava―仕事で必要なプログラミングの知識がゼロから身につく最高の指南書",
    author : "きしだ なおき",
    rating : 4,
}
export const book7 = {
    id : "1e274eaf-3735-813e-ef60-e0117933b340\n",
    name : "プリンシプル オブ プログラミング3年目までに身につけたい一生役立つ101の原理原則",
    author : "上田勲",
    rating : 5,
}
export const book8 = {
    id : "8e788630-707c-6ffe-52f2-f7d1c38ff339",
    name : "HTML解体新書-仕様から紐解く本格入門",
    author : "太田 良典",
    rating : 5,
}
export const book9 = {
    id : "33b48105-0578-f206-343d-433cc76d65fc",
    name : "UIデザイン必携 ユーザーインターフェースの設計と改善を成功させるために",
    author : "原田 秀司",
    rating : 5,
}
export const book10 = {
    id : "3fce68d8-a3b1-3790-d884-de497c832bdd",
    name : "実用 Go言語 ―システム開発の現場で知っておきたいアドバイス",
    author : "渋川 よしき",
    rating : 4,
}
