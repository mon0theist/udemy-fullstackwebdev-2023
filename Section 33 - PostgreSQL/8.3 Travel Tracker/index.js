import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

// app
const app = express();
const port = 3000;

// db
const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: 'postgres',
  port: 5432,
});
db.connect();

// middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// load main page
// the if/else structure that Dr. Yu explains is the "old" way 
// GPT says this try/catch structure is the "new" way
app.get("/", async (req, res) => {
  try {
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
  }
  catch (err) {
    console.error(err)
    res.status(500).send("Internal Server Error");
  }
});

// add new country
app.post("/add", async (req, res) => {
  try {
    // parse req.body to find submitted form data (req.body.name?)
    let country = req.body.country;
    // query db with submitted form data to get country code
    const country_result = await db.query("SELECT country_code FROM countries WHERE LOWER(country_name) = LOWER($1)", [country]);
    console.log(country_result.rows);
    // use query to update visisted_countries
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
