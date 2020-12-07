const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const {conn, seed, models: {User, Med}} = require("./db");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/api/users", async(req, res, next) => {
    try {
        const users = await User.findAll({
            include: [ 
                {model: User, as: "caretaker"},
                {model: User, as: "patients"}
            ]
        });

        res.send(users)
    } catch (error) { next(error )};
});

app.get("/api/users/:id", async(req, res, next) => {
    try {
        const user = await User.findAll({
            where: {id: req.params.id},
            include: [Med]
        });

        res.send(user)
    } catch (error) { next(error )};
});

app.post("/api/users", async(req, res, next) => {
    try {
        const { name } = req.body
        const user = await User.create({name})

        res.send(user)
    } catch (error) { next(error) };
});

app.delete("/api/users/:uid", async(req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        console.log(user)
        user.destroy();
        res.send(`Removed userID ${user.id}`)
    } catch (error) { next(error) };
});

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