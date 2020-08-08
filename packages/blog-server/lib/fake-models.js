const faker = require("faker");

function makeUser() {
  return {
    user: faker.internet.userName(),
    email: faker.internet.email(),
    confirmed: faker.random.boolean(),
    password: faker.internet.password(10, true)
  };
}

module.exports = {
  makeUser,
};
