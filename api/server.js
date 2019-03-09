const express = require("express");

const configMiddleware = require("./middleware.js");

const db = require("../data/dbConfig.js");

const server = express();

configMiddleware(server);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Server says hi." });
});

server.get("/testDb", async (req, res) => {
  const rows = await db("test");
  res.status(200).json(rows);
});

module.exports = server;
