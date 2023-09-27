/// <reference types='cypress' />
let user;

describe('Web Tables page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.viewport(1920, 1080);
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });

  it('should check pagination exists', () => {
    cy.get('.-pagination').should('exist');
    cy.contains('.-previous > .-btn', 'Previous');
    cy.contains('.-next > .-btn', 'Next');
  });

  it('should check rows count selector', () => {
    cy.get('select').select('20 rows');
    cy.get('select').should('contain', '20 rows');
  });

  it('should provide an ability to add new worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstName);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();

    cy.get('.rt-td').should('contain', user.firstName);
  });

  it('should delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.col-md-6').should('not.contain', 'Cierra');
  });

  it('should delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.col-md-6').should('contain', 'No rows found');
  });

  it('should provide ability to find worker in search field and edit', () => {
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('Wow');
    cy.get('#lastName').clear();
    cy.get('#lastName').type('Chik');
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type('vovan333@gmail.com');
    cy.get('#age').clear();
    cy.get('#age').type('55');
    cy.get('#salary').clear();
    cy.get('#salary').type('11200');
    cy.get('#department').clear();
    cy.get('#department').type('ema333');
    cy.get('#submit').click();

    cy.get('.rt-tr').should('contain', 'Wow');
    cy.get('.rt-tr').should('contain', 'Chik');
    cy.get('.rt-tr').should('contain', 'vovan333@gmail.com');
    cy.get('.rt-tr').should('contain', 'ema333');
    cy.get('.rt-tr').should('contain', '11200');
    cy.get('.rt-tr').should('contain', '55');
  });

  it('Check search by all column values', () => {
    cy.get('#searchBox').click();
    cy.get('#searchBox').type('Cierra');
    cy.get('.col-md-6').should('contain', 'Cierra');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').click();
    cy.get('#searchBox').type('Vega');
    cy.get('.col-md-6').should('contain', 'Vega');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('39');
    cy.get('.col-md-6').should('contain', '39');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('10000');
    cy.get('.col-md-6').should('contain', '10000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Insurance');
    cy.get('.col-md-6').should('contain', 'Insurance');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('cierra@example.com');
    cy.get('.col-md-6').should('contain', 'cierra@example.com');
    cy.get('#searchBox').clear();
  });
});
