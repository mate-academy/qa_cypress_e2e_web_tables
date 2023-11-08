const faker = require('faker');
const workerData = [];

function generateWorker() {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email();
  const age = faker.random.number({ min: 18, max: 70 });
  const salary =
  Math.floor(Math.random() * 100000 / 1000) * 1000;
  const department = faker.fake('{{commerce.department}}');

  return { firstName, lastName, email, age, salary, department };
}

function newWorkerCreation(num) {
  for (let i = 0; i < num; i++) {
    workerData.length = 0;
    const {
      firstName,
      lastName,
      email,
      age,
      salary,
      department
    } = generateWorker();

    cy.get('#addNewRecordButton')
      .click();
    cy.get('#firstName')
      .type(firstName);
    cy.get('#lastName')
      .type(lastName);
    cy.get('#userEmail')
      .type(email);
    cy.get('#age')
      .type(age);
    cy.get('#salary')
      .type(salary);
    cy.get('#department')
      .type(department);
    cy.get('#submit')
      .click();

    workerData.push(
      firstName,
      lastName,
      email,
      age,
      salary,
      department
    );
  }
}

module.exports = { generateWorker, newWorkerCreation, workerData };
