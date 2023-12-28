/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;

  beforeEach(() => {
    cy.task('generateUser').then((generatedUser) => {
      user = generatedUser;
    });
    cy.visit('https://demoqa.com/webtables');
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

  it('should cout rows', () => {
    cy.get('select').select('20');
    cy.get('.rt-tr-group').should('have.length', 20);
  });

  it('Should add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.userName);
    cy.get('#lastName').type(user.userSurname);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type('50');
    cy.get('#salary').type(user.number);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
    cy.contains(user.email).should('exist');
  });

  it.only('should delete worker', () => {
    cy.addNewWorker(user);
    cy.contains(user.email).parent('div.rt-tr')
      .find('.action-buttons [title="Delete"]').click();
    cy.contains(user.email).should('not.exist');
  });

  it('deletes all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');
  });

  it('should find and edit worker', () => {
    cy.addNewWorker(user);
    cy.get('input[id="searchBox"]').type(user.userName);
    cy.get('#edit-record-4').click();
    cy.get('#salary').clear();
    cy.get('#salary').type('70000');
    cy.get('#submit').click();
    cy.contains(70000).should('exist');
  });

  it('should check the search by all colun values', () => {
    cy.addNewWorker(user);
    cy.get('input[id="searchBox"]').type(user.userName);
    cy.contains('.rt-td', user.userName);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(user.userSurname);
    cy.contains('.rt-td', user.userSurname);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(user.email);
    cy.contains('.rt-td', user.email);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(user.number);
    cy.contains('.rt-td', user.number);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(user.department);
    cy.contains('.rt-td', user.department);
    cy.get('input[id="searchBox"]').clear();
    cy.get('input[id="searchBox"]').type(50);
    cy.contains('.rt-td', 50);
  });
});
