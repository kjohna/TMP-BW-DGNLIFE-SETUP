const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  findById
};

async function add(user) {
  console.log(user);
  const [id] = await db("users").insert(user);
  return findById(id);
}

async function findById(id) {
  const user = await db("users")
    .where({ id })
    .first();
  return user;
}
