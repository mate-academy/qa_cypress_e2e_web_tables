const faker = require('faker');

function generateUser() {
  const random = Math.random().toString().slice(2, 6);
  const userName = faker.internet.userName();
  const userSurname = faker.internet.userName();
  const email = `${userName}@mail.com`;
  const age = random;
  const number = random;
  const department = faker.internet.userName();


  return { userName, userSurname, email, age, number,department };
}

module.exports = { generateUser };

