const express = require("express");
const app = express();
const {conn, seed, models: {User, Med}} = require("./db");

app.get("/api/users", async(req, res, next) => {
    try {
        const users = await User.findAll({
            include: [ 
                {model: User, as: "caretaker"},
                {model: User, as: "patients"}
            ]
        });

        res.send(users)
    } catch (error) { next(error )}
})

app.get("/api/users/:id", async(req, res, next) => {
    try {
        const user = await User.findAll({
            where: {id: req.params.id},
            include: [Med]
        });
        console.log(user)
        res.send(user)
    } catch (error) { next(error )}
})

const init = async () => {
    try {
        await conn.authenticate();
        // await seed()

        app.listen(8080, () => console.log("Listening"))
    } catch (error) {
        console.log(error)
    }
}

init()