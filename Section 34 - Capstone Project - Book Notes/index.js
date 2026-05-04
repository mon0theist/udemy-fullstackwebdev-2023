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

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// db query function(s)
async function getBooks() {
    const result = await db.query("SELECT * FROM finished_books");
    let books = [];
    result.rows.forEach((book => {
        books.push(book);
        // console.log("Book found:", book);
    }));
    return books;
}

// api query function(s)
// search book to get OLID
// use OLID to search covers

// routes
// homepage
app.get("/", async (req, res) => {
    const books = await getBooks();
    res.render("index.ejs", {
        books: books,
    });
});

// add new book
app.post("/add", async (req, res) => {
    const title = req.body.newBookTitle;
    const author = req.body.newBookAuthor;
    console.log(title, author);
    res.redirect("/");
});

// view/edit book info
app.get("/edit", async (req, res) => {
    const books = await getBooks();
    // console.log(books);
    const book = books[0];
    res.render("edit.ejs", {
        book: book,
    });
});

// submit changes
app.post("/edit", async (req, res) => {

});


// run
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});