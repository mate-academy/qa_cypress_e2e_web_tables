import faker from 'faker';
import { generateUser } from '../support/commands';
const firstnameChanged = faker.name.firstName();

describe('Web Tables page', () => {
  const test = generateUser();

  beforeEach(() => {
    cy.visit('/');
  });

  it('should have working pagination', () => {
    cy.get('[aria-label="rows per page"]').select('5');

    cy.createTestWorker(test);
    cy.createTestWorker(test);
    cy.createTestWorker(test);

    cy.contains('Next').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '2');
    cy.contains('Previous').click();
    cy.get('[aria-label="jump to page"]').should('have.value', '1');
  });

  it('should provide the ability to select rows count', () => {
    cy.get('[aria-label="rows per page"]').should('have.value', '10');
    cy.get('[aria-label="rows per page"]').select('25');
    cy.get('[aria-label="rows per page"]').should('have.value', '25');
  });

  it('The test should include the capability to add a new worker and verify the accuracy of the entered workers data.', () => {
    cy.createTestWorker(test);

    cy.get(':nth-child(4) > .rt-tr')
      .should('contain.text', test.firstName)
      .and('contain.text', test.lastName)
      .and('contain.text', test.email)
      .and('contain.text', test.age)
      .and('contain.text', test.salary)
      .and('contain.text', test.department);
  });

  it('The test should include the functionality to delete a single worker.', () => {
    cy.get(`#delete-record-1`).click();

    cy.get('.rt-tbody').should('not.contain.html', `#delete-record-1`);
  });

  it('The test should include the functionality to delete all workers.', () => {
    for (let i = 1; i < 4; i++) {
      cy.get(`#delete-record-${i}`).click();
    }

    cy.get('.rt-td').should('not.have.text', '');
  });

  it('The test should include the functionality to find a specific user.', () => {
    cy.createTestWorker(test);

    cy.searchTestWorker(test.firstName);
    cy.get('.rt-td')
      .should('not.contain.text', 'cierra@example.com');
  });

  it('The test should include the capability to edit the users information.', () => {
    cy.createTestWorker(test);

    cy.get('#searchBox').type(test.firstName);
    cy.get('#edit-record-4').click();
    cy.get('#firstName').type(firstnameChanged);
    cy.get('#submit').click();

    cy.get('.rt-td').should('contain.text', test.firstName + firstnameChanged);
  });

  it('The test should include the functionality to search for users using all column values.', () => {
    cy.createTestWorker(test);

    cy.searchTestWorker(test.firstName);
    cy.searchTestWorker(test.lastName);
    cy.searchTestWorker(test.email);
    cy.searchTestWorker(test.age);
    cy.searchTestWorker(test.salary);
    cy.searchTestWorker(test.department);
  });
});
