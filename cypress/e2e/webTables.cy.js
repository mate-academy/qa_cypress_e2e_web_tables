/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  beforeEach(() => {
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
    cy.visit('https://demoqa.com/webtables');
  });
  it('check the pagination', () => {
    cy.addNewWorker(user);
    cy.addNewWorker(user);
    cy.addNewWorker(user);
    cy.get('select').select('5');
    cy.get('div.-next').click();
    cy.get('input[aria-label="jump to page"][type="number"][value="2"]')
      .should('have.value', 2);
  });
  it('cout rows', () => {
    cy.get('select').select('20');
    cy.get('.rt-tr-group').should('have.length', 20);
  });
  it('add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.userName);
    cy.get('#lastName').type(user.userSurname);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type('50');
    cy.get('#salary').type(user.number);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
    cy.contains(user.userName).should('exist');
    cy.contains(user.userSurname).should('exist');
    cy.contains(user.email).should('exist');
  });
  it('delete worker', () => {
    cy.addNewWorker(user);
    cy.contains(user.email).parent('div.rt-tr')
      .find('.action-buttons [title="Delete"]').click();
  });
  it('delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').should('not.exist');
  });
  it('find and edit worker', () => {
    cy.addNewWorker(user);
    cy.get('input[id="searchBox"]').type(user.userName);
    cy.get('#edit-record-4').click();
    cy.get('#age').clear();
    cy.get('#age').type('42');
    cy.get('#submit').click();
    cy.contains(42).should('exist');
    cy.contains(user.userName).should('exist');
    cy.contains(user.userSurname).should('exist');
    cy.contains(user.email).should('exist');
  });
});
