//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming

import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
const pw = "ILoveProgramming";

// Enable body-parser
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
    if (req.body.password === pw){
        res.sendFile(__dirname + "/public/secret.html");
        console.log(req.body)
    }
    else {
        res.sendFile(__dirname + "/public/index.html");
        console.log(req.body);
    }
});


