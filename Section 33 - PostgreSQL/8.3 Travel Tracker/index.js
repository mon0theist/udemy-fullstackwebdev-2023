import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: 'postgres',
  port: 5432,
});
db.connect();

app.get("/", async (req, res) => {
  const result = await db.query("SELECT * FROM visited_countries");
  // console.log(typeof(result));
  // console.log(result);
  // console.log(result.rows.length);

  let countries = [];
  for (var i = 0; i < result.rows.length; i++){
    countries.push(result.rows[i].country_code);
  }
  console.log(countries);

  res.render("index.ejs", {
    'total': result.rows.length,
    'countries': countries,
  });
  db.end();
});

app.post("/add", async (req, res) => {
  // parse req.body to find submitted form data
  // query db with submitted form data
  // use query to update visisted_countries
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
