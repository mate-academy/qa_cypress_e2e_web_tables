/// <reference types="cypress" />

describe('Web Tables page', () => {
  const newUser = {
    firstName: 'Meri',
    lastName: 'Tur',
    email: 'meritur2@mailinator.com',
    age: '29',
    salary: '800',
    department: 'QA'
  }

  beforeEach(() => {
    cy.visit('https://demoqa.com/webtables')
    });
  
  it('table should have pagination', () => {
    cy.get('.-pagination').should('contain', 'Previous')
      .and('contain', 'Next');
    cy.contains('.-pageInfo', 'Page').should('exist');
  });

  it('table should have row count selection', () => {
    cy.get('select').select('20 rows');
    cy.get(':nth-child(20)').should('exist');
  });

  it('should be able to add a new worker to the table and find him by searching all columns', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(newUser.firstName);
    cy.get('#lastName').type(newUser.lastName);
    cy.get('#userEmail').type(newUser.email);
    cy.get('#age').type(newUser.age);
    cy.get('#salary').type(newUser.salary);
    cy.get('#department').type(newUser.department);
    cy.get('#submit').click();
    cy.get('.rt-tbody').should('contain', newUser.firstName)
      .and('contain', newUser.lastName)
      .and('contain', newUser.email);
    cy.get('.rt-tbody').should('contain', newUser.age);
    cy.get('.rt-tbody').should('contain', newUser.salary);
    cy.get('.rt-tbody').should('contain', newUser.department);
    cy.get('#searchBox').clear().type(newUser.firstName);
    cy.get('.rt-tr-group').should('contain', newUser.firstName);
    cy.get('#searchBox').clear().type(newUser.lastName);
    cy.get('.rt-tr-group').should('contain', newUser.lastName);
    cy.get('#searchBox').clear().type(newUser.email);
    cy.get('.rt-tr-group').should('contain', newUser.email);
    cy.get('#searchBox').clear().type(newUser.age);
    cy.get('.rt-tr-group').should('contain', newUser.age);
    cy.get('#searchBox').clear().type(newUser.salary);
    cy.get('.rt-tr-group').should('contain', newUser.salary);
    cy.get('#searchBox').clear().type(newUser.department);
    cy.get('.rt-tr-group').should('contain', newUser.department);
  });

  it('should be able to delete a worker from the table', () => {
    cy.get('#delete-record-2').click();
    cy.get('.rt-tr-group').should('not.have.value', 'Aiden')
  });

  it('should be able to delete all workers from the table', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-1').should('not.exist');
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-2').should('not.exist');
    cy.get('#delete-record-3').click();
    cy.get('#delete-record-3').should('not.exist');
  });

  it.only('should be able to find worker in search field and edit it', () => {
    cy.get('#searchBox').type('Cierra');
    cy.get('#edit-record-1').click();
    cy.get('#lastName').clear().type(newUser.lastName);
    cy.get('#userEmail').clear().type(newUser.email);
    cy.get('#age').clear().type(newUser.age);
    cy.get('#salary').clear().type('2000');
    cy.get('#department').clear().type(newUser.department);
    cy.get('#submit').click();
    cy.get('.rt-tr-group').should('contain', newUser.lastName)
      .and('contain', newUser.email)
      .and('contain', newUser.age)
      .and('contain', '2000')
      .and('contain', newUser.department);
  });
});
