const faker = require('faker');

function generateUser() {
  const random = Math.random().toString().slice(2, 6);
  const firstName = faker.internet.userName() + '_' + random;
  const lastName = faker.internet.userName() + '_1' + random;
  const email = `${firstName}@mail.com`;
  const age = faker.random.number({ min: 1, max: 100 });
  const salary = faker.random.number({ min: 1000, max: 20000 });
  const department = 'test_section';

  return { email, firstName, lastName, age, salary, department };
}

module.exports = { generateUser };
