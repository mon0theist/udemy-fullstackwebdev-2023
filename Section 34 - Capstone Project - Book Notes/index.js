// imports
import express from "express";
import pg from "pg";

// app 
const app = express();
const port = 3000;
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "burnsbookblog",
    password: "postgres",
    port: 5432,
});
db.connect();

// middlewareconst express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// db query function(s)
async function getBooks() {
    const result = await db.query("SELECT * FROM finished_books");
    let books = [];
    result.rows.forEach((book => {
        books.push(book);
        console.log("Book found:", book);
    }));
    return books;
}

// api query function(s)
// search book to get OLID
// use OLID to search covers

// routes
app.get("/", async (req, res) => {
    const books = await getBooks();
    res.render("index.ejs", {
        books: books,
    });
});

// run
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});