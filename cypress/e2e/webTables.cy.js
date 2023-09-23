/// <reference types='cypress' />

describe('Web Tables page', () => {
  let user;
  beforeEach(() => {
    cy.visit('/');
    cy.task('generateWorker').then(generateWorker => {
      user = generateWorker;
    });
  });
  it('should check the pagination', () => {
    cy.get('.-pagination').should('exist');
    cy.contains('.-previous > .-btn', 'Previous');
    cy.contains('.-next > .-btn', 'Next');
  });

  it('should check the rows count selection', () => {
    cy.get('select').select('5 rows');
    cy.get('select').should('contain', '5 rows');
  });

  it('Should provide the ability to add worker', () => {
    cy.get('#addNewRecordButton').click();
    cy.get('#firstName').type(user.firstname);
    cy.get('#lastName').type(user.lastName);
    cy.get('#userEmail').type(user.email);
    cy.get('#age').type(user.age);
    cy.get('#salary').type(user.salary);
    cy.get('#department').type(user.department);
    cy.get('#submit').click();
  });

  it('should provide the ability to delete a worker', () => {
    cy.get('#delete-record-1').click();
    cy.get('.col-md-6').should('not.contain', 'Cierra');
  });
  it('should provide the ability to delete all workers', () => {
    cy.get('#delete-record-1').click();
    cy.get('#delete-record-2').click();
    cy.get('#delete-record-3').click();
    cy.get('.col-md-6').should('contain', 'No rows found');
  });
  it('shoul provide the ability to search worker', () => {
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
    cy.get('#searchBox').type('2000');
    cy.get('.col-md-6').should('contain', '2000');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('Legal');
    cy.get('.col-md-6').should('contain', 'Legal');
    cy.get('#searchBox').clear();
    cy.get('#searchBox').type('alden@example.com');
    cy.get('.col-md-6').should('contain', 'alden@example.com');
    cy.get('#searchBox').clear();
  });
  it.only('shlould provide the ability to edit worker', () => {
    cy.get('#edit-record-1').click();
    cy.get('#firstName').clear();
    cy.get('#firstName').type('ema');
    cy.get('#lastName').clear();
    cy.get('#lastName').type('ema1');
    cy.get('#userEmail').clear();
    cy.get('#userEmail').type('ema@gmail.com');
    cy.get('#age').clear();
    cy.get('#age').type('19');
    cy.get('#salary').clear();
    cy.get('#salary').type('1200');
    cy.get('#department').clear();
    cy.get('#department').type('ema2');
    cy.get('#submit').click();

    cy.get('.rt-tr').should('contain', 'ema');
    cy.get('.rt-tr').should('contain', 'ema1');
    cy.get('.rt-tr').should('contain', 'ema@gmail.com');
    cy.get('.rt-tr').should('contain', 'ema2');
    cy.get('.rt-tr').should('contain', '1200');
    cy.get('.rt-tr').should('contain', '19');
  });
});
 