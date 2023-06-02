/// <reference types='cypress' />

describe('Web Tables page', () => {
  const testData = {
    firstName: 'test_firstName',
    lastName: 'test_lastName',
    email: 'test_555@qa.team',
    age: '26',
    salary: '36000',
    department: 'Testing'
  };

  

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables/');
  });

  it('The pagination section is present on the Web Tables page', () => {
    cy.get('.-pagination').should('exist');
  });

  it('Select the number of rows per page', () => {
    cy.get('[aria-label="rows per page"]').select('5 rows');
  });

  it('It is possible to add a new record to the table', () => {
    cy.get('#addNewRecordButton').click();

    cy.get('.modal-content').should('exist');

    cy.get('#firstName').type(testData.firstName);
    cy.get('#lastName').type(testData.lastName);
    cy.get('#userEmail').type(testData.email);
    cy.get('#age').type(testData.age);
    cy.get('#salary').type(testData.salary);
    cy.get('#department').type(testData.department);

    cy.get('#submit').click();

    cy.get('.rt-tbody').should('contain', testData.firstName);
  });

  it('It is possible to delete a record from the table', () => {
    cy.get('.rt-tr-group').should('exist');

    cy.get('#delete-record-1').should('exist').click();

//As I understand, there is no "delete all records" button. So this test will fail as expected
    cy.get('#delete-all-records').should('exist');
  });

  it('It is possible to find a user through the Search field and edit his record', () => {

    cy.get('#searchBox').click().type('Alden');
    cy.get('#basic-addon2').click();
    cy.get('.rt-tbody > :nth-child(1) > .rt-tr > :nth-child(1)').should('contain', 'Alden');

    cy.get('#edit-record-2').click();
    cy.get('#firstName').type('_edited');
    cy.get('#submit').should('exist').click();

    cy.get('[role="row"]').should('contain', 'Alden_edited');
  });

  it.only('Search by all column values', () => {
    cy.get('#searchBox').clear().click().type('Cierra');
    cy.get('#basic-addon2').click();
    cy.get('[role="row"]').should('contain', 'Cierra');

    cy.get('#searchBox').clear().click().type('Vega');
    cy.get('#basic-addon2').click();
    cy.get('[role="row"]').should('contain', 'Vega');

    cy.get('#searchBox').clear().click().type('39');
    cy.get('#basic-addon2').click();
    cy.get('[role="row"]').should('contain', '39');

    cy.get('#searchBox').clear().click().type('cierra@example.com');
    cy.get('#basic-addon2').click();
    cy.get('[role="row"]').should('contain', 'cierra@example.com');

    cy.get('#searchBox').clear().click().type('10000');
    cy.get('#basic-addon2').click();
    cy.get('[role="row"]').should('contain', '10000');

    cy.get('#searchBox').clear().click().type('Insurance');
    cy.get('#basic-addon2').click();
    cy.get('[role="row"]').should('contain', 'Insurance');
  });
});
