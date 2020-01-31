const db = require("../database/dbConfig.js");

const user = require("./auth-model.js");
const request = require('supertest');
const server = require('../api/server');

describe("user model", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
  describe("register", () => {
    it("should register new user to the database", async () => {
      await user.register({
        username: "testusername1",
        password: "testpassword1"
      });
      await user.register({
        username: "testusername2",
        password: "testpassword2"
      });
      await user.register({
        username: "testusername3",
        password: "testpassword3"
      });
      const users = await db("users");
      expect(users).toHaveLength(3);
    });
    it('should insert the provided user', async () => {
        await user.register({ username: 'ethan', password: 'password' });
        await user.register({ username: 'josh', password: 'password' });
  
        const users = await db('users');
        expect(users).toHaveLength(2);
        expect(users[0].username).toBe('ethan');
        expect(users[1].username).toBe('josh');
      });
  });
  describe('login', () => {
    it("should login the provided user to the database", async () => {
        let newUser = await user.register({ username: "Ethan", password: "123" });
        expect(newUser.username).toBe("Ethan");
  
        newUser = await user.register({ username: "Josh", password: "1234" });
        expect(newUser.username).toBe("Josh");
  
        let loginUser = await user.login("Ethan");
        console.log(loginUser);
        expect(loginUser.username).toBe("Ethan");
      });
    it ('should NOT login a user', async function() {
    await request(server)
        .post('/api/auth/login')
        .send({ username: 'User5', password: 'pass' })
        .expect(401);
    });
  })
});