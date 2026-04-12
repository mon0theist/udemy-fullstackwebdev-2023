import express from "express";
const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server running on port ${port}.`);
});


app.get("/", (req, res) => {
    console.log(req);
    res.send("Hello world!");
});

app.get("/about", (req, res) => {
    console.log(req);
    res.send("<p>I don't want to brag, but I can print hello world in *several* programming languages.</p>");
});

app.get("/contact", (req, res) => {
    console.log(req);
    res.send("<h1>867-5309</h1>");
});


