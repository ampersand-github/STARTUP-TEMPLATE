-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "books" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "is_losting" BOOLEAN NOT NULL DEFAULT false,
    "is_privates" BOOLEAN NOT NULL DEFAULT false,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tags" (
    "tag_name" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,

    CONSTRAINT "tags_pkey" PRIMARY KEY ("tag_name","book_id")
);

-- CreateTable
CREATE TABLE "borrow_histories" (
    "id" TEXT NOT NULL,
    "book_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "start_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_at" TIMESTAMP(3),

    CONSTRAINT "borrow_histories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "tags" ADD CONSTRAINT "tags_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow_histories" ADD CONSTRAINT "borrow_histories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "borrow_histories" ADD CONSTRAINT "borrow_histories_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
