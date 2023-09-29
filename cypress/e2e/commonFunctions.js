const faker = require('faker');

const worker = {
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  email: faker.internet.email(),
  age: faker.random.number({ min: 18, max: 65 }),
  salary: faker.random.number({ min: 1000, max: 20000 }).toString(),
  department: faker.commerce.department()
};

export function addNewWorker(n) {
  for (let i = 0; i < n; i++) {
    cy.get('.btn#addNewRecordButton').contains('Add').click();
    cy.findByPlaceholder('First Name').type(worker.firstName);
    cy.findByPlaceholder('Last Name').type(worker.lastName);
    cy.findByPlaceholder('name@example.com').type(worker.email);
    cy.findByPlaceholder('Age').type(worker.age);
    cy.findByPlaceholder('Salary').type(worker.salary);
    cy.findByPlaceholder('Department').type(worker.department);
    cy.get('.btn').contains('Submit').click();
  }
}

export function deleteAllElements() {
  cy.get('[title="Delete"]').should('exist');
  let deletedCount = 0;

  while (deletedCount < 3) {
    cy.get('[title="Delete"]').first().click();
    deletedCount++;
  }
}

export function validateNewWorker() {
  cy.get('.rt-tbody').should('contain', worker.firstName);
  cy.get('.rt-tbody').should('contain', worker.lastName);
  cy.get('.rt-tbody').should('contain', worker.email);
  cy.get('.rt-tbody').should('contain', worker.age);
  cy.get('.rt-tbody').should('contain', worker.salary);
  cy.get('.rt-tbody').should('contain', worker.department);
}

export function findAndEdit() {
  cy.findByPlaceholder('Type to search').type(worker.lastName);
  cy.get('[title="Edit"]').eq(0).click();
  cy.findByPlaceholder('First Name').type(' PETROVICH');
  cy.findByPlaceholder('Last Name').clear().type(worker.lastName);
  cy.findByPlaceholder('name@example.com').clear().type(worker.email);
  cy.findByPlaceholder('Age').invoke('val').then((currentAge) => {
    const currentAgeNumber = parseInt(currentAge);
    const newAge = currentAgeNumber + 5;

    cy.findByPlaceholder('Age').clear().type(`${newAge}`);
  });
  cy.findByPlaceholder('Salary').invoke('val').then((currentSalary) => {
    const currentSalaryNumber = parseInt(currentSalary);
    const newSalary = currentSalaryNumber + 1000;

    cy.findByPlaceholder('Salary').clear().type(`${newSalary}`);
  });
  cy.findByPlaceholder('Department').clear().type(worker.department);
  cy.get('.btn').contains('Submit').click();
  cy.get('.rt-tbody').should('contain', 'PETROVICH');
}

export function checkColumnValues() {
  cy.findByPlaceholder('Type to search').type(worker.lastName);
  cy.get('.rt-tbody').should('contain', worker.lastName);
  cy.findByPlaceholder('Type to search').clear().type(worker.firstName);
  cy.get('.rt-tbody').should('contain', worker.firstName);
  cy.findByPlaceholder('Type to search').clear().type(worker.email);
  cy.get('.rt-tbody').should('contain', worker.email);
  cy.findByPlaceholder('Type to search').clear().type(worker.salary);
  cy.get('.rt-tbody').should('contain', worker.salary);
  cy.findByPlaceholder('Type to search').clear().type(worker.department);
  cy.get('.rt-tbody').should('contain', worker.department);
}
