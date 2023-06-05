import faker from 'faker';

export const generateUser = () => {
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    age: faker.random.number({ min: 18, max: 60 }),
    salary: faker.random.number({ min: 2000, max: 10000 }),
    department: faker.random.arrayElement(['IT', 'Sales', 'Marketing']),
  };
};

Cypress.Commands.add('createTestWorker', (test) => {
  cy.get('#addNewRecordButton').click();

  cy.get('#registration-form-modal').should('contain', 'Registration Form');
  cy.get('#firstName').type(test.firstName);
  cy.get('#lastName').type(test.lastName);
  cy.get('#userEmail').type(test.email);
  cy.get('#age').type(test.age);
  cy.get('#salary').type(test.salary);
  cy.get('#department').type(test.department);

  cy.get('#submit').click();
});

Cypress.Commands.add('searchTestWorker', (data) => {
    cy.get('#searchBox').clear().type(`${data}`);

    cy.get('.rt-td').should('contain.text', data);
  });