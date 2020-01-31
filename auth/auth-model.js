const db = require("../database/dbConfig.js");

module.exports = {
  register,
  login
};

async function register(newUser) {
  const [id] = await db("users").insert(newUser, "id");
  return db("users")
    .where({ id })
    .first();
}

function login(username) {
  return db("users")
    .where({ username })
    .first();
}