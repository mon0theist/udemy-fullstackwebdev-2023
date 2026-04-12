import express from "express";

const app = express();
const port = 3000;

// bodyParser
app.use(express.urlencoded({ extended: true }));

// public
app.use(express.static("public"));

// array used instead of a database
const blogPosts = [];

// persistent username
const username = "";

// define blogPost object
class blogPost {
  constructor(author, content) {
    this.author = author;
    this.postContent = content;
  }
}

app.get("/", (req, res) => {
  res.render("index.ejs", { blogPosts: blogPosts });
});

app.post("/post", (req, res) => {
    const author = req.body.author;
    const postContent = req.body.postContent;
    console.log(`Author: ${author}\nContent: ${postContent}`);

    const newPost = new blogPost(author, postContent);
    blogPosts.push(newPost);
    res.render("index.ejs", { blogPosts: blogPosts });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
