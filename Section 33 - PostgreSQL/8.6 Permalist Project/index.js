import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "postgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// replace with db query?
// write a function like she did on the previous project?
// let items = [
//   { id: 1, title: "Buy milk" },
//   { id: 2, title: "Finish homework" },
// ];
async function checkItems() {
  // add try/catch ?
  const result = await db.query("SELECT * FROM items");
  // console.log(result.rows);
  let items = [];
  result.rows.forEach((item) => {
    items.push(item);
    // console.log('item found: ', item);
    // console.log(`items: ${items}`);
  });
  return items;
};

app.get("/", async (req, res) => {
  const items = await checkItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;
  items.push({ title: item });
  res.redirect("/");
});

// db.query
app.post("/edit", async (req, res) => {
  // console.log(req.body);
  const item_id = req.body.updatedItemId;
  const item_title = req.body.updatedItemTitle;
  // add try/catch
  const query = await db.query(`
    UPDATE items
    SET title = $1
    WHERE id = $2;
    `, 
    [item_title, item_id]
  );
  res.redirect("/");
});

// db.query
app.post("/delete", async (req, res) => {
  // DELETE FROM table_name WHERE condition;
  // try/catch ?
  const query = await db.query(`
    DELETE FROM items
    WHERE id = $1;
    `,
    [req.body.deleteItemId]
  );
  console.log(req.body);
  res.redirect("/");
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
