/// <reference types='cypress' />

describe('On web Tables page', () => {
  beforeEach(() => {
    cy.viewport(1280, 1280);
    cy.visit('/');
  });

  it('contains working pagination', () => {
    cy.get('.-pageInfo').should('exist');
    cy.get('[aria-label="rows per page"]').select('5');

    const count = 3;
    cy.addRundomUsersInTable(count);

    cy.clickBtnName('Next');
    cy.get('.-pageJump > input').should('have.value', '2');
    cy.clickBtnName('Previous');
    cy.get('.-pageJump > input').should('have.value', '1');
  });

  it('contains rows count selection', () => {
    cy.get('[aria-label="rows per page"]').should('exist');
    cy.get('[aria-label="rows per page"]').should('have.value', '10');
    cy.get('[aria-label="rows per page"]').select('20');
    cy.get('[aria-label="rows per page"]').should('have.value', '20');
  });

  it('can add a new worker', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('#firstName').type('NewUser');
    cy.get('#lastName').type('NewLastName');
    cy.get('#userEmail').type('NewUser@qwe.qwe');
    cy.get('#age').type('20');
    cy.get('#salary').type('777');
    cy.get('#department').type('UserDepartment');
    cy.get('#submit').click();
    cy.get('[role="row"]').eq(4).should('contain.text', 'NewUser');
  });

  it('can delete a worker', () => {
    cy.get('[role="row"]').eq(1).should('contain.text', 'Cierra');
    cy.get('#delete-record-1').should('exist').click();
    cy.get('[role="row"]').eq(1).should('not.contain.text', 'Cierra');
  });

  it('can delete all workers', () => {
    cy.get('[role="row"]').eq(1).should('contain.text', 'Cierra');
    for (let i = 1; i <= 3; i++) {
      cy.get(`#delete-record-${i}`).should('exist').click();
    };
    cy.get('.rt-noData').should('contain.text', 'No rows found');
  });

  it('can find a worker in the search field and edit it', () => {
    cy.get('#searchBox').type('Ald');
    cy.get('[role="row"]').eq(1).should('contain.text', 'Ald');
    cy.get('#edit-record-2').should('exist').click();

    cy.get('#firstName').type('{selectall}{del}1');
    cy.get('#lastName').type('{selectall}{del}2');
    cy.get('#userEmail').type('{selectall}{del}3@qwe.qwe');
    cy.get('#age').type('{selectall}{del}4');
    cy.get('#salary').type('{selectall}{del}5');
    cy.get('#department').type('{selectall}{del}6');
    cy.get('#submit').click();

    cy.get('#searchBox').type('{selectall}{del}3@qwe');
    cy.get('[role="row"]').eq(1).should('have.text', '1243@qwe.qwe56 ');
  });

  it('can search on all column values.', () => {
    cy.get('#searchBox').type('Ald');
    cy.get('[role="row"]').eq(1).should('contain.text', 'Ald');
    cy.get('#searchBox').type('{selectall}{del}Veg');
    cy.get('[role="row"]').eq(1).should('contain.text', 'Veg');
    cy.get('#searchBox').type('{selectall}{del}29');
    cy.get('[role="row"]').eq(1).should('contain.text', '29');
    cy.get('#searchBox').type('{selectall}{del}cierra@ex');
    cy.get('[role="row"]').eq(1).should('contain.text', 'cierra@ex');
    cy.get('#searchBox').type('{selectall}{del}1200');
    cy.get('[role="row"]').eq(1).should('contain.text', '1200');
    cy.get('#searchBox').type('{selectall}{del}Insur');
    cy.get('[role="row"]').eq(1).should('contain.text', 'Insur');
  });
});
