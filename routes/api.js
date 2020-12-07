const express = require("express");
const router = express.Router();
const { models: {User, Med} } = require("../server/db");

router.get("/users", async(req, res, next) => {
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

router.get("/users/:id", async(req, res, next) => {
  try {
      const user = await User.findAll({
          where: {id: req.params.id},
          include: [Med]
      });

      res.send(user)
  } catch (error) { next(error )};
});

router.post("/users", async(req, res, next) => {
  try {
      const { name } = req.body
      const user = await User.create({name})

      res.send(user)
  } catch (error) { next(error) };
});

router.delete("/users/:uid", async(req, res, next) => {
  try {
      const user = await User.findByPk(req.params.id);
      console.log(user)
      user.destroy();
      res.send(`Removed userID ${user.id}`)
  } catch (error) { next(error) };
});

module.exports = router;
