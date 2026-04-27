import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentUserId = 1;

let users = [
  { id: 1, name: "Angela", color: "teal" },
  { id: 2, name: "Jack", color: "powderblue" },
];

async function checkVisisted() {
  const result = await db.query(
    "SELECT country_code FROM visited_countries WHERE user_id = $1",
    [currentUserId],
  );
  let countries = [];
  // push object
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}
app.get("/", async (req, res) => {
  const countries = await checkVisisted();
  res.render("index.ejs", {
    countries: countries,
    total: countries.length,
    users: users,
    color: "teal",
  });
});
app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()],
    );

    const data = result.rows[0];
    const countryCode = data.country_code;
    try {
      await db.query(
        "INSERT INTO visited_countries (country_code) VALUES ($1)",
        [countryCode],
      );
      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  } catch (err) {
    console.log(err);
  }
});

// TODO:
// Create users table: name and CSS color. pk Links to visited_countries table
// modify visited_countries table
// add user_id column to visited_countries

// switch views between users
app.post("/user", async (req, res) => {
  if (req.body.add) {
    console.log(`adding new user: ${req.body.add}`);
    res.render("new.ejs");
  }
  else if (req.body.user) {
    currentUserId = req.body.user;
    console.log(`currentUserID changed: ${req.body.user}`);
    res.redirect("/");
  }
  // query db for list of users
  // users is a many-to-many join table? maybe?
  // check value submitted to /user
  // if existing user, display their countries
  // if NOT existing user, render/redirect to the new.ejs
  
  // const result = await db.query();
  // res.redirect("/");
});

app.post("/new", async (req, res) => {
  //Hint: The RETURNING keyword can return the data that was inserted.
  //https://www.postgresql.org/docs/current/dml-returning.html
  const name = req.body.name;
  const color = req.body.color;
  const result = await db.query("INSERT INTO users (user_name, user_color) VALUES ($1, $2) RETURNING *",[req.body.name, req.body.color]);
  console.log(result.rows);
  users.push({id: result.rows[0].id, name: result.rows[0].user_name, color: result.rows[0].user_color});
  console.log(users);
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
