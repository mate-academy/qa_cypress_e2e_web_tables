/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
    cy.visit('/');
  });
  it('should check the pagination', () => {
    cy.addNewWorker(user);
    cy.addNewWorker(user);
    cy.addNewWorker(user);
    cy.get('select').select('5');
    cy.get('div.-next').click();
    cy.get('input[aria-label="jump to page"][type="number"][value="2"]')
      .should('have.value', 2);
  });

  it('should count rows', () => {
    cy.get('select').select('100');
    cy.get('.rt-tr-group').should('have.length', 100);
  });

  it('Should add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.userName);
    cy.get('#lastName').type(user.userLastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
    cy.contains(user.email).should('exist');
  });

  it('should delete the new worker', () => {
    cy.addNewWorker(user);
    cy.contains(user.email).parent('div.rt-tr')
      .find('.action-buttons #delete-record-4').click();
    cy.contains(user.email).should('not.exist');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');
  });

  it('should find and edit worker to validate data in the worker row', () => {
    cy.addNewWorker(user);
    cy.get('input[id="searchBox"]').type(user.userName);
    cy.get('#edit-record-4').click();
    cy.get('#salary').clear();
    cy.get('#salary').type('22222');
    cy.get('#submit').click();
    cy.contains(22222).should('exist');
  });

  it('should check the search by all column values', () => {
    cy.addNewWorker(user);
    cy.get('input[id="searchBox"]').type(user.userName);
    cy.contains('.rt-td', user.userName);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(user.userLastName);
    cy.contains('.rt-td', user.userLastName);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(user.email);
    cy.contains('.rt-td', user.email);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(user.salary);
    cy.contains('.rt-td', user.salary);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(user.department);
    cy.contains('.rt-td', user.department);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(user.age);
    cy.contains('.rt-td', user.age);
  });
});
