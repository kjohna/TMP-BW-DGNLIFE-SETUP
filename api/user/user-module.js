const db = require("../../data/dbConfig.js");

module.exports = {
  add,
  findBy
};

async function add(user) {
  try {
    console.log("user: ", user);
    const [id] = await db("users").insert(user, "id");
    console.log("added, id: ", id);
    return findBy({ id });
  } catch (error) {
    throw new Error(error);
  }
}

async function findBy(filter) {
  try {
    const user = await db("users")
      .where(filter)
      .first();
    return user;
  } catch (error) {
    throw new Error(error);
  }
}
