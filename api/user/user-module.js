const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  findById
};

async function add(user) {
  try {
    const [id] = await db("users").insert(user);
    return findById(id);
  } catch (error) {
    throw new Error(error);
  }
}

async function findById(id) {
  const user = await db("users")
    .where({ id })
    .first();
  return user;
}
