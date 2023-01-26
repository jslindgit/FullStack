const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/user");
const helper = require("./test_helper");
const url = "/api/users/";

beforeEach(async () => {
  const initialUsers = await helper.getInitialUsers();
  await User.deleteMany({});
  let userObject = await new User(initialUsers[0]);
  await userObject.save();
  userObject = await new User(initialUsers[1]);
  await userObject.save();
});

test("users are returned as json", async () => {
  await api
    .get("/api/users")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("username must be unique and min 3 chars, password must be min 3 chars", async () => {
  const initialUsers = await helper.getInitialUsers();
  let response = await api
    .post(url)
    .send({
      username: initialUsers[0].username,
      realname: "New User",
      password: "newpassword",
    })
    .expect(400);
  expect(response.body.error).toContain("already taken");

  response = await api
    .post(url)
    .send({ username: "ab", realname: "New User", password: "newpassword" })
    .expect(400);
  expect(response.body.error).toContain("atleast 3 characters");

  response = await api
    .post(url)
    .send({ username: "newusername", realname: "New User", password: "ab" })
    .expect(400);
  expect(response.body.error).toContain("atleast 3 characters");

  const usersInDb = await helper.usersInDb();
  expect(usersInDb).toHaveLength(initialUsers.length);
});

afterAll(() => {
  mongoose.connection.close();
});
