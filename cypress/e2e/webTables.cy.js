import faker from 'faker';
  import { generateUser } from '../support/commands';
  const firstnameChanged = faker.name.firstName();
  describe('Web Tables page', () => {
  const test = generateUser();

    beforeEach(() => {
      cy.visit(`https://demoqa.com/webtables`);
    });
  
    it('checking pagination functionality', () => {
      cy.get('[aria-label="rows per page"]').select('5');
  
      cy.createTestWorker(test);
      cy.createTestWorker(test);
      cy.createTestWorker(test);
  
      cy.contains('Next').click();
      cy.get('[aria-label="jump to page"]').should('have.value', '2');
      cy.contains('Previous').click();
      cy.get('[aria-label="jump to page"]').should('have.value', '1');
    });
  
    it('checking the ability to select rows count', () => {
      cy.get('[aria-label="rows per page"]').should('have.value', '10');
      cy.get('[aria-label="rows per page"]').select('25');
      cy.get('[aria-label="rows per page"]').should('have.value', '25');
    });
  
    it('Checking the functionality to add a new worker and validating data in worker row after creating', () => {
      cy.createTestWorker(test);
  
      cy.get(':nth-child(4) > .rt-tr')
        .should('contain.text', test.firstName)
        .and('contain.text', test.lastName)
        .and('contain.text', test.email)
        .and('contain.text', test.age)
        .and('contain.text', test.salary)
        .and('contain.text', test.department);
    });
  
    it('Checking the functionality to delete a single worker.', () => {
      cy.get(`#delete-record-1`).click();
  
      cy.get('.rt-tbody').should('not.contain.html', `#delete-record-1`);
    });
  
    it('Checking the functionality to delete all workers.', () => {
      for (let i = 1; i < 4; i++) {
        cy.get(`#delete-record-${i}`).click();
      }
  
      cy.get('.rt-td').should('not.have.text', '');
    });
  
    it('Checking the functionality to find worker in search field', () => {
      cy.createTestWorker(test);
  
      cy.searchTestWorker(test.firstName);
      cy.get('.rt-td')
        .should('not.contain.text', 'alden@example.com');
    });
  
    it('Checking the capability to edit the worker information.', () => {
      cy.createTestWorker(test);
  
      cy.get('#searchBox').type(test.firstName);
      cy.get('#edit-record-4').click();
      cy.get('#firstName').type(firstnameChanged);
      cy.get('#submit').click();
  
      cy.get('.rt-td').should('contain.text', test.firstName + firstnameChanged);
    });
  
    it('Checking the functionality to search for workers using all column values.', () => {
      cy.createTestWorker(test);
  
      cy.searchTestWorker(test.firstName);
      cy.searchTestWorker(test.lastName);
      cy.searchTestWorker(test.email);
      cy.searchTestWorker(test.age);
      cy.searchTestWorker(test.salary);
      cy.searchTestWorker(test.department);
    });
  });
