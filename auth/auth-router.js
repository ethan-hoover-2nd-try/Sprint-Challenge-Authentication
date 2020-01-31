const router = require("express").Router();
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const secrets = require("./secrets.js");
const db = require("./auth-model.js");

router.post("/register", (req, res) => {
  // implement registration
  const newUser = req.body;
  const hashedPw = bcrypt.hashSync(newUser.password, 12);
  newUser.password = hashedPw;
  db.register(newUser)
    .then(user => res.status(200).json(user))
    .catch(error => res.status(500).json({ error: "something went wrong while attempting to register new user" }));
});

router.post("/login", (req, res) => {
  // implement login
  let { username, password } = req.body;

  db.login(username)
    .then(user => {
      console.log(user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message: `Welcome ${user.username}! Heres a token...`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json({error: "something went wrong while attempting to login"});
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username
  };

  const options = {
    expiresIn: "1d"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;