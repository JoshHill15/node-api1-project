// implement your API here
const express = require("express");
const server = express();
const Users = require("./data/db.js");
const cors = require("cors")
server.use(express.json());
server.use(cors())
const port = process.env.PORT || 8000;

//get
server.get("/", (req, res) => {
  res.send({ hello: "worlllllddd" });
});

server.get("/api/users", (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res
        .status(500)
        .json({ errorMessage: "THe users information couldn't be retreived." });
    });
});

server.get(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  console.log(id);

  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log("err", err);
      res
        .status(404)
        .json({ message: "the user witht he specified ID doesn't exist" });
    });
});

//post

server.post("/api/users", (req, res) => {
  const userData = req.body;
  console.log("sdlf", userData);
  Users.insert(userData)
    .then(user => {
      console.log(user);
      if (!userData.name && !userData.bio) {
        res
          .status(400)
          .json({ errorMessage: "please provide name and bio for the user" });
      } else res.status(201).json(userData);
    })
    .catch(err => {
      console.log("errr", err);
      res.status(500).json({
        errorMessage:
          "there was an error while saving the user to the database "
      });
    });
});

// delete
server.delete(`/api/users/:id`, (req, res) => {
  const id = req.params.id;
  Users.remove(id)
    .then(user => {
      console.log(Users, user, id);

      if (user === 0) res.status(404).json({ errorMessage: "no user with the id" });
      res
        .status(200).json({ successMessage: `the object with the id of ${id} has been deleted` });
    })
    .catch(err => {
      console.log("err", err);
      res.status(500).json({ errorMessage: "the user couldn't be removed" });
    });
});

//put
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const userData = req.body;
  if (!userData.name || !userData.bio)
    res
      .status(400)
      .json({ errorMessage: "please provide name and bio for the user" });
  else {
    Users.update(id, userData)
      .then(updated => {
        console.log(id, userData, updated);
        if (updated === 0) {
          res
            .status(404)
            .json({ message: "the user with the specified id doens't exist " });
        } else res.status(204).json(updated);
      })
      .catch(err => {
        console.log("err", err);
        res
          .status(500)
          .json({ errorMessage: "The user information could not be modified" });
      });
  }
});
server.listen(port, () => console.log(`API RUNNING ON ${port}`));
