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
app.get("/new", async (req, res) => {
    res.render("new.ejs");
});

app.post("/add", async (req, res) => {    
    try {
        const title = req.body.newBookTitle.trim().replaceAll(" ", "+");
        const author = req.body.newBookAuthor.trim().replaceAll(" ", "+");
        const api_response = await fetch(`https://openlibrary.org/search.json?title=${title}&author=${author}`);
        const data = await api_response.json();
        
        if (data.numFound > 0){
            const ol_id = data.docs[0].cover_edition_key;
            const coverImgURL = `https://covers.openlibrary.org/b/olid/${ol_id}-M.jpg`;
            const titlename = data.docs[0].title;
            const authorname = data.docs[0].author_name[0]; //author_name is an array for some reason
            const yrpub = data.docs[0].first_publish_year;
            const rating = req.body.rating;
            const yrread = req.body.yrread;
            const summary = req.body.summary;
            
            const query = await db.query(`
                INSERT INTO finished_books (ol_id, title, author, yr_pub, yr_read, rating, summary, cover_url)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
                [ol_id, titlename, authorname, yrpub, yrread, rating, summary, coverImgURL]
            );
            
            console.log(`${ol_id} successfully added to database`)
            res.redirect("/");
        }
        else {
            console.log("Error: No search results found");
            res.redirect("/");
        };
    }
    catch (err) {
        console.log(err);
        res.redirect("/");
    }
});

// view/edit book info
app.get("/edit", async (req, res) => {
    const books = await getBooks();
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