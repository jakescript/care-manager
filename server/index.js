const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const {conn, seed} = require("./db");

const apiRoutes = require("../routes/api")

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use("/public", express.static(path.join(__dirname, "../public")));

app.use("/api", apiRoutes)
app.get("/", (req, res, next) => res.sendFile(path.join(__dirname, "../public/index.html")));

const init = async () => {
    try {
        await conn.authenticate();
        // await seed()
        app.listen(8080, () => console.log("Listening"));
    } catch (error) {
        console.log(error);
    };
};

init()
