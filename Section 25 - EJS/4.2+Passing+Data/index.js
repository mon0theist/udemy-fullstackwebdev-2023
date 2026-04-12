import express from "express";
// no longer needed
// import bodyParser from "body-parser"; 

const app = express();
const port = 3000;

// bodyParser package no longer needed
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// an h1 variable needs to be passed to EJS
app.get("/", (req, res) => {
  const h1 = "<h1>Enter your name below 👇</h1>";

  res.render('index.ejs', {h1: h1});
});

app.post("/submit", (req, res) => {
  console.log(req.body);
  const fname = req.body.fName;
  const lname = req.body.lName;
  const length = fname.length + lname.length;
  const h1 = `<h1>There are ${length} letters in your name 👍</h1>`;

  res.render('index.ejs', {h1: h1});
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
