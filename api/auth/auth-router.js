const router = require("express").Router();
const bcrypt = require("bcrypt");
const tokenSvc = require("./token-service");
const User = require("../user/user-module.js");

router.post("/register", async (req, res) => {
  let user = req.body;

  // hash user's password, overwrite orig for storage
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  // gen token
  const token = tokenSvc.generateToken(user);

  try {
    const saved = await User.add(user);
    res.status(201).json({
      username: saved.username,
      token
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.post("/login", async (req, res) => {
  let { username, password } = req.body;

  // lookup username
  try {
    const existing = await User.findBy({ username });
    if (existing && bcrypt.compareSync(password, existing.password)) {
      const token = tokenSvc.generateToken(existing);
      res.status(200).json({
        message: `Welcome back ${existing.username}!`,
        token: token
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials."
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
