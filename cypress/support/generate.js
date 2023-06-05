const { faker } = require('@faker-js/faker');

function generateUser() {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();
    const age = faker.number.int({min: 18, max: 80});
    const salary = faker.number.int({min: 1000, max: 20000});
    const department = 'QA';

    return { 
        firstName,
        lastName,
        email,
        age,
        salary,
        department 
    };
}

module.exports = { generateUser };
