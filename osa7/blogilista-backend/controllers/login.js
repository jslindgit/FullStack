const jwt = require("jsonwebtoken");
const bcrpyt = require("bcrypt");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  const user = await User.findOne({ username });
  const passwordCorrect =
    user === null ? false : await bcrpyt.compare(password, user.passwordhash);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET);

  response.status(200).send({
    token,
    username: user.username,
    realname: user.realname,
    id: user.id,
  });
});

module.exports = loginRouter;
