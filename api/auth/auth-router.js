const router = require("express").Router();
const bcrypt = require("bcrypt");
const tokenSvc = require("./token-service");
const User = require("../user/user-module.js");

router.post("/register", (req, res) => {
  let user = req.body;

  // hash user's password, overwrite orig for storage
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  // gen token
  const token = tokenSvc.generateToken(user);

  User.add(user)
    .then(saved => {
      res.status(201).json({ saved, token });
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
