function addNewWorker() {
    const randomNumber = Math.random().toString().slice(2, 6);
    const firstName = 'Frodo';
    const lastName = 'Baggins';
    const email = `${firstName}${randomNumber}@mail.com`;
    const age = Math.random().toString().slice(2, 4);
    const salary = Math.random().toString().slice(2, 8);

    return { firstName, lastName, email, age, salary };
}

module.exports = { addNewWorker };
