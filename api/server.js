const express = require("express");

const configMiddleware = require("./middleware.js");
// routers:
const authRouter = require("./auth/auth-router.js");

const db = require("../data/dbConfig.js");

const server = express();

configMiddleware(server);

// not protected, for login, register:
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server says hi." });
});

server.get("/testDb", async (req, res) => {
  const rows = await db("test");
  res.status(200).json(rows);
});

module.exports = server;
