const { faker } = require('@faker-js/faker');

function generateUser() {
    const randomNumber = Math.random().toString().slice(2, 6);
    const username = faker.internet.userName();
    const age = Math.random().toString().slice(2, 4);
    const salary = Math.random().toString().slice(2, 6);
    const email = username + '@mail.com';
    const password = 'haslo123456!';
    const username2 = username + 'test';
    const department = 'IT';

    return { username, username2, email, password, age, salary, department };
}

module.exports = { generateUser };