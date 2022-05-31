import { PrismaClient } from '@prisma/client'
import {TAG} from "../../src/domain/book/tag/tag";

export const createBooks = async (prisma:PrismaClient) => {
    await prisma.open_books.create({
        data: {
            id: "3c44f682-7e63-1983-2f00-4deebae6ea33",
            books: {
                create: {
                    id: "0ad33070-ae63-1076-841b-a222dceb7082",
                    name: "上流モデリングによる業務改善手法入門",
                    author: "世古 雅人",
                    tags: {createMany: {data: {tag_name: TAG.design}}}
                }
            },
        }
    })

    await prisma.open_books.create({
        data: {
            id: "8b7fc145-c8cd-3635-6900-031ca8d86ed6",
            books: {
                create: {
                    id: "54152aca-ad73-7aa1-52db-fb646f1c9084",
                    name: "良いコード/悪いコードで学ぶ設計入門 ―保守しやすい 成長し続けるコードの書き方",
                    author: "仙塲 大也",
                    tags: {createMany: {data: [{tag_name: TAG.design}, {tag_name: TAG.java}]}}

                }
            },
        }
    })

    await prisma.open_books.create({
        data: {
            id: "d855093c-7835-e35b-8c3b-433b41c56261",
            books: {
                create: {
                    id: "4d5f47fa-b590-101b-cc2b-41431074ffdc",
                    name: "プロを目指す人のためのTypeScript入門 安全なコードの書き方から高度な型の使い方まで",
                    author: "鈴木 僚太",
                    tags: {createMany: {data: [{tag_name: TAG.ts}]}}
                }
            },
        }
    })

    await prisma.open_books.create({
        data: {
            id: "d301042b-7416-369b-1a6a-040e3cc618e5",
            books: {
                create: {
                    id: "6f6304f9-894c-202e-d71b-2e75e7068266",
                    name: "システム運用アンチパターン ―エンジニアがDevOpsで解決する組織・自動化・コミュニケーション",
                    author: "Jeffery D. Smith",
                    tags: {createMany: {data: [{tag_name: TAG.ops}]}}
                }
            },
        }
    })


    await prisma.open_books.create({
        data: {
            id: "010c2437-b82a-722e-599e-4df2fb6b8c97",
            books: {
                create: {
                    id: "82c9434d-940c-ca48-8086-274ee8f4c7ee",
                    name: "リーダブルコード ―より良いコードを書くためのシンプルで実践的なテクニック",
                    author: "Dustin Boswell",
                }
            },
        }
    })


    await prisma.open_books.create({
        data: {
            id: "ab5cb68e-cf31-c38f-755c-e569660214a3",
            books: {
                create: {
                    id: "15eaa9ee-f0e7-a7a5-f6ac-6c1f4b52d3d6",
                    name: "プロになるJava―仕事で必要なプログラミングの知識がゼロから身につく最高の指南書",
                    author: "きしだ なおき",
                    tags: {createMany: {data: [{tag_name: TAG.java}, {tag_name: TAG.attitude}]}}

                }
            },
        }
    })


    await prisma.open_books.create({
        data: {
            id: "fd6ca333-4464-4058-ba0b-6ec13073bdca",
            books: {
                create: {
                    id: "1e274eaf-3735-813e-ef60-e0117933b340",
                    name: "プリンシプル オブ プログラミング3年目までに身につけたい一生役立つ101の原理原則",
                    author: "上田勲",
                    tags: {createMany: {data: [{tag_name: TAG.attitude}]}}
                }
            },
        }
    })


    await prisma.private_books.create({
        data: {
            id: "d2290b1c-a2fe-1e81-3de1-fd6bff8fb3a7",
            books: {
                create: {
                    id: "8e788630-707c-6ffe-52f2-f7d1c38ff339",
                    name: "HTML解体新書-仕様から紐解く本格入門",
                    author: "太田 良典",
                    tags: {createMany: {data: [{tag_name: TAG.html}]}}
                }
            },
        }
    })


    await prisma.private_books.create({
        data: {
            id: "11576864-e445-0627-c318-80d15572e753",
            books: {
                create: {
                    id: "33b48105-0578-f206-343d-433cc76d65fc",
                    name: "UIデザイン必携 ユーザーインターフェースの設計と改善を成功させるために",
                    author: "原田 秀司",
                    tags: {createMany: {data: [{tag_name: TAG.html}, {tag_name: TAG.ui}]}}

                }
            },
        }
    })


    await prisma.lost_books.create({
        data: {
            id: "dd01391f-caf4-aae9-41d4-179b0015be63",
            books: {
                create: {
                    id: "3fce68d8-a3b1-3790-d884-de497c832bdd",
                    name: "実用 Go言語 ―システム開発の現場で知っておきたいアドバイス",
                    author: "渋川 よしき",
                    tags: {createMany: {data: [{tag_name: TAG.go}]}}
                }
            },
        }
    })
}
