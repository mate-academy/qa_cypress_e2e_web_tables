const { faker } = require('@faker-js/faker');

function generateUser() {
    const username = faker.internet.userName();
    const email = faker.internet.email();
    const age = faker.datatype.number({ min: 18, max: 60 }).toString();
    const salary = faker.datatype.number({ min: 1000, max: 10000 }).toString();
    const department = faker.commerce.department();
    const lastname = `${username}_wisna`; 

    return { username, lastname, email, age, salary, department };
}

module.exports = { generateUser };

